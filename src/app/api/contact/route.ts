import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getResendKey = () => process.env.RESEND_API_KEY?.trim() || '';
const getAccessKey = () => process.env.WEB3FORMS_ACCESS_KEY?.trim() || '';
const getRecipient = () => process.env.RECIPIENT_EMAIL?.trim() || 'ma02raj@gmail.com';
const getSender = () =>
  process.env.CONTACT_FROM?.trim() || 'Mahendra Portfolio <onboarding@resend.dev>';

let senderWarningLogged = false;

/**
 * `onboarding@resend.dev` (the fallback sender) can only deliver to the
 * Resend account owner's own inbox — a very common cause of a 403 in
 * production. Warn loudly so the misconfiguration is visible in the logs.
 */
const warnIfSenderNotConfigured = () => {
  if (senderWarningLogged) return;
  if (process.env.CONTACT_FROM?.trim()) return;
  senderWarningLogged = true;
  console.warn(
    '[Contact API] CONTACT_FROM is not set — falling back to "onboarding@resend.dev". ' +
      "Resend only allows that address to deliver to the account owner's own inbox; " +
      'set CONTACT_FROM to a verified sender (e.g. "Mahendra Rajput <hello@mahiweb.in>").'
  );
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

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
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

const sendViaResend = async (
  name: string,
  email: string,
  message: string
): Promise<{ ok: boolean; reason?: string }> => {
  const resendKey = getResendKey();
  if (!resendKey) return { ok: false, reason: 'RESEND_API_KEY is not configured' };

  warnIfSenderNotConfigured();

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: getSender(),
      to: [getRecipient()],
      reply_to: email,
      subject: `New Portfolio Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return { ok: false, reason: data?.message || `HTTP ${response.status}` };
  }

  return { ok: true };
};

const sendViaWeb3Forms = async (
  name: string,
  email: string,
  message: string
): Promise<{ ok: boolean; reason?: string }> => {
  const accessKey = getAccessKey();
  if (!accessKey) return { ok: false, reason: 'WEB3FORMS_ACCESS_KEY is not configured' };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      replyto: email,
      message,
      subject: `New Portfolio Inquiry from ${name}`,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    return { ok: false, reason: data?.body?.message || data?.message || `HTTP ${response.status}` };
  }

  return { ok: true };
};

/**
 * Health probe — reports whether email delivery is actually configured on this
 * deployment. Booleans only, no secrets, never cached.
 *
 *   curl https://mahiweb.in/api/contact
 *   → { "providers": { "resend": true, "web3forms": true }, ... }
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      providers: {
        resend: Boolean(getResendKey()),
        web3forms: Boolean(getAccessKey()),
      },
      recipientConfigured: Boolean(process.env.RECIPIENT_EMAIL?.trim()),
      senderConfigured: Boolean(process.env.CONTACT_FROM?.trim()),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(req: Request) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    }

    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot: real visitors never fill this in, bots usually do.
    if (typeof body.company === 'string' && body.company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields (name, email, message) are required.' },
        { status: 400 }
      );
    }

    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: 'Name is too long.' }, { status: 400 });
    }

    if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
    }

    const resend = await sendViaResend(name, email, message);
    if (resend.ok) {
      return NextResponse.json({ success: true });
    }

    const web3forms = await sendViaWeb3Forms(name, email, message);
    if (web3forms.ok) {
      return NextResponse.json({ success: true });
    }

    console.error(
      '[Contact API] Delivery failed. Resend:',
      resend.reason,
      '| Web3Forms:',
      web3forms.reason
    );

    // Distinguish "the server was never configured" from "the provider
    // rejected the message" — the first one is an infrastructure problem that
    // needs a Vercel environment variable, the second is a transient failure.
    const providerConfigured = Boolean(getResendKey() || getAccessKey());

    if (!providerConfigured) {
      return NextResponse.json(
        {
          error:
            'Direct email delivery is not configured on the server yet. Please email me directly.',
          code: 'email_not_configured',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'The message could not be delivered right now. Please email me directly.',
        code: 'delivery_failed',
      },
      { status: 502 }
    );
  } catch (err: unknown) {
    console.error('[Contact API] Submission error:', err);
    return NextResponse.json(
      { error: 'Failed to process message submission. Please try again.' },
      { status: 500 }
    );
  }
}
