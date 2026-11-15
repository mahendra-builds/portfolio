import { NextResponse } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { SITE_URL } from '@/lib/site';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

/** Hard cap on the raw request body. The largest legitimate payload is a
 *  5000-character message plus a short name/email — ~5.5 KB — so 16 KB is
 *  generous while still rejecting oversized bodies before they are parsed. */
const MAX_BODY_BYTES = 16 * 1024;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

/** A single transient upstream failure is retried; a 4xx never is. */
const RESEND_MAX_ATTEMPTS = 2;
const RESEND_RETRY_DELAY_MS = 600;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Client-supplied submission id. Used to build a stable idempotency key so
 *  a double-click or a retry cannot send the same message twice. */
const SUBMISSION_ID_REGEX = /^[A-Za-z0-9_-]{8,64}$/;

const getResendKey = () => process.env.RESEND_API_KEY?.trim() || '';

/** Inbox that receives contact form submissions. */
const getRecipient = () => process.env.RECIPIENT_EMAIL?.trim() || 'ma02raj@gmail.com';

/**
 * Verified sender, e.g. "Mahendra Rajput <hello@mahiweb.in>".
 *
 * There is deliberately NO default: Resend only allows `onboarding@resend.dev`
 * to deliver to the account owner's own inbox, and any unverified domain is
 * rejected with a 403. Failing closed with an explicit error beats shipping a
 * form that silently answers 403 for every visitor.
 */
const getSender = () => process.env.CONTACT_FROM?.trim() || '';

/** Pull the bare address out of a `Name <user@host>` sender string. */
const extractEmailAddress = (value: string): string => {
  const angled = value.match(/<([^>]+)>/);
  return (angled ? angled[1] : value).trim();
};

const isValidSender = (sender: string): boolean =>
  sender.length > 0 && EMAIL_REGEX.test(extractEmailAddress(sender));

/** Strip anything that looks like a Resend key before it reaches the logs. */
const redact = (value: string): string => value.replace(/re_[A-Za-z0-9_-]+/g, 're_***');

/** Never log a visitor's full address. */
const maskEmail = (email: string): string => {
  const at = email.indexOf('@');
  if (at <= 0) return '***';
  return `${email.slice(0, 2)}***${email.slice(at)}`;
};

const getClientIp = (req: Request): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
};

const isAllowedOrigin = (req: Request): boolean => {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  // Same-origin requests (including local dev and preview deployments) are always allowed.
  const requestHost = req.headers.get('host');
  if (requestHost && originHost === requestHost) return true;

  try {
    return originHost === new URL(SITE_URL).host;
  } catch {
    return false;
  }
};

const rateLimitHits = new Map<string, number[]>();
let lastPruneAt = 0;

/** Drop expired buckets so the map cannot grow without bound. */
const pruneRateLimit = (now: number): void => {
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  rateLimitHits.forEach((hits, key) => {
    const recent = hits.filter((timestamp: number) => timestamp > windowStart);
    if (recent.length === 0) rateLimitHits.delete(key);
    else rateLimitHits.set(key, recent);
  });
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();

  if (now - lastPruneAt > RATE_LIMIT_WINDOW_MS) {
    lastPruneAt = now;
    pruneRateLimit(now);
  }

  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (rateLimitHits.get(ip) || []).filter((timestamp) => timestamp > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitHits.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitHits.set(ip, recent);
  return false;
};

type BodyResult =
  { ok: true; value: unknown } | { ok: false; status: number; code: string; error: string };

/**
 * Read the request body with a hard byte ceiling. The stream is cancelled as
 * soon as the cap is exceeded so an oversized upload is never fully buffered.
 */
const readBodyWithLimit = async (
  req: Request
): Promise<{ ok: true; text: string } | { ok: false; reason: 'too_large' | 'read_error' }> => {
  const body = req.body;
  if (!body) return { ok: true, text: '' };

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, reason: 'too_large' };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: 'read_error' };
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { ok: true, text: new TextDecoder().decode(merged) };
};

const readJsonBody = async (req: Request): Promise<BodyResult> => {
  const raw = await readBodyWithLimit(req);

  if (!raw.ok) {
    return raw.reason === 'too_large'
      ? { ok: false, status: 413, code: 'payload_too_large', error: 'Message is too large.' }
      : { ok: false, status: 400, code: 'invalid_json', error: 'Malformed request body.' };
  }

  try {
    return { ok: true, value: JSON.parse(raw.text) };
  } catch {
    return { ok: false, status: 400, code: 'invalid_json', error: 'Malformed request body.' };
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ResendErrorBody {
  name?: string;
  message?: string;
}

/** Turn a Resend error body into a short, loggable reason. */
const describeResendError = (status: number, data: unknown): string => {
  const body = (data ?? null) as ResendErrorBody | null;
  const name = typeof body?.name === 'string' ? body.name : '';
  const message = typeof body?.message === 'string' ? body.message : '';
  const detail = message || name || `HTTP ${status}`;
  return name ? `${status} ${name}: ${detail}` : `${status}: ${detail}`;
};

interface SendResult {
  ok: boolean;
  emailId?: string;
  reason?: string;
}

/**
 * Deliver one message through Resend.
 *
 * The Idempotency-Key makes retries safe: Resend returns the original email id
 * instead of sending a second copy.
 */
const sendViaResend = async (
  name: string,
  email: string,
  message: string,
  idempotencyKey: string
): Promise<SendResult> => {
  const resendKey = getResendKey();
  if (!resendKey) return { ok: false, reason: 'RESEND_API_KEY is not configured' };

  const payload = {
    from: getSender(),
    to: [getRecipient()],
    reply_to: email,
    subject: `New Portfolio Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  let lastReason = 'unknown error';

  for (let attempt = 1; attempt <= RESEND_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        const emailId =
          typeof (data as { id?: unknown } | null)?.id === 'string'
            ? (data as { id: string }).id
            : undefined;
        if (!emailId) {
          return { ok: false, reason: 'Resend returned a success response without an email id' };
        }
        return { ok: true, emailId };
      }

      lastReason = describeResendError(response.status, data);

      // 5xx is transient — retry once. 4xx needs an operator, so surface it now.
      if (response.status >= 500 && attempt < RESEND_MAX_ATTEMPTS) {
        await delay(RESEND_RETRY_DELAY_MS);
        continue;
      }

      return { ok: false, reason: lastReason };
    } catch (error) {
      lastReason = error instanceof Error ? error.message : 'network error';
      if (attempt < RESEND_MAX_ATTEMPTS) {
        await delay(RESEND_RETRY_DELAY_MS);
        continue;
      }
      return { ok: false, reason: `network error: ${lastReason}` };
    }
  }

  return { ok: false, reason: lastReason };
};

/**
 * Health probe — reports whether email delivery is actually configured on this
 * deployment. Booleans only, no secrets, never cached.
 *
 *   curl https://mahiweb.in/api/contact
 *   → { "provider": "resend", "deliveryReady": true, ... }
 */
export async function GET() {
  const sender = getSender();
  const recipient = getRecipient();

  const resendConfigured = Boolean(getResendKey());
  const recipientConfigured = EMAIL_REGEX.test(recipient);
  const senderConfigured = isValidSender(sender);

  return NextResponse.json(
    {
      status: 'ok',
      provider: 'resend',
      configured: {
        resend: resendConfigured,
        recipient: recipientConfigured,
        sender: senderConfigured,
      },
      deliveryReady: resendConfigured && recipientConfigured && senderConfigured,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(req: Request) {
  const requestId = randomUUID();

  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    }

    const contentType = req.headers.get('content-type');
    if (contentType && !contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json.', code: 'unsupported_media_type' },
        { status: 415 }
      );
    }

    const declaredLength = Number(req.headers.get('content-length') ?? '');
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Message is too large.', code: 'payload_too_large' },
        { status: 413 }
      );
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = await readJsonBody(req);
    if (!body.ok) {
      return NextResponse.json({ error: body.error, code: body.code }, { status: body.status });
    }

    const data = (body.value ?? {}) as Record<string, unknown>;

    // Honeypot: real visitors never fill this in, bots usually do.
    const company = typeof data.company === 'string' ? data.company.trim() : '';
    if (company.length > 0) {
      return NextResponse.json({ success: true });
    }

    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const message = typeof data.message === 'string' ? data.message.trim() : '';
    const submissionId = typeof data.submissionId === 'string' ? data.submissionId.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, message) are required.', code: 'missing_fields' },
        { status: 400 }
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: 'Name is too long.', code: 'name_too_long' },
        { status: 400 }
      );
    }

    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.', code: 'invalid_email' },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: 'Message is too long.', code: 'message_too_long' },
        { status: 400 }
      );
    }

    const sender = getSender();
    const recipient = getRecipient();

    const missing = !getResendKey()
      ? 'RESEND_API_KEY'
      : !EMAIL_REGEX.test(recipient)
        ? 'RECIPIENT_EMAIL'
        : !isValidSender(sender)
          ? 'CONTACT_FROM'
          : null;

    if (missing) {
      console.error(
        `[Contact API] requestId=${requestId} delivery=not_configured missing=${missing}`
      );
      return NextResponse.json(
        {
          error:
            'Direct email delivery is not configured on the server yet. Please email me directly.',
          code: 'email_not_configured',
        },
        { status: 503 }
      );
    }

    // The key ties a submission to its content: an identical retry reuses it
    // (no duplicate mail), while an edited message gets a fresh one.
    const contentHash = createHash('sha256')
      .update(`${name} ${email} ${message}`)
      .digest('hex')
      .slice(0, 16);

    const idempotencyKey = SUBMISSION_ID_REGEX.test(submissionId)
      ? `contact-${submissionId.slice(0, 40)}-${contentHash}`
      : `contact-${contentHash}-${randomUUID()}`;

    const result = await sendViaResend(name, email, message, idempotencyKey);

    if (result.ok) {
      console.log(
        `[Contact API] requestId=${requestId} delivery=ok provider=resend emailId=${result.emailId} replyTo=${maskEmail(email)}`
      );
      return NextResponse.json({ success: true });
    }

    console.error(
      `[Contact API] requestId=${requestId} delivery=failed provider=resend reason=${redact(result.reason ?? 'unknown')} replyTo=${maskEmail(email)}`
    );

    return NextResponse.json(
      {
        error: 'The message could not be delivered right now. Please email me directly.',
        code: 'delivery_failed',
      },
      { status: 502 }
    );
  } catch (err: unknown) {
    console.error(
      `[Contact API] requestId=${requestId} error=${redact(err instanceof Error ? err.message : 'unknown')}`
    );
    return NextResponse.json(
      { error: 'Failed to process message submission. Please try again.' },
      { status: 500 }
    );
  }
}
