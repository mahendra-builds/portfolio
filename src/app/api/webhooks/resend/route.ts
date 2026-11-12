import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Resend (Svix) webhook receiver — delivery status for contact-form mail.
 *
 * Resend signs every event with an HMAC-SHA256 signature over
 * `${svix_id}.${svix_timestamp}.${body}` and sends it in the `svix-signature`
 * header as `v1,<base64>` (or `t=<ts>,v1=<base64>`). Verification is done
 * here with Node's crypto — no extra dependency — and compared in constant
 * time. Timestamps older than the tolerance window are rejected so a captured
 * request cannot be replayed.
 *
 * Setup: Resend dashboard → Webhooks → add https://<domain>/api/webhooks/resend
 * with the events email.sent / email.delivered / email.bounced / email.complained,
 * then put the signing secret in Vercel as RESEND_WEBHOOK_SECRET.
 */

/** Replay window: signatures older than this are refused. */
const TOLERANCE_SECONDS = 300;

/** How many recent events to keep for the status endpoint. */
const MAX_REMEMBERED_EVENTS = 25;

interface WebhookEvent {
  type: string;
  receivedAt: string;
  emailId?: string;
  to?: string;
  reason?: string;
}

const recentEvents: WebhookEvent[] = [];

const getSecret = () => process.env.RESEND_WEBHOOK_SECRET?.trim() || '';

/** Pull every `v1` signature out of the header (supports both header shapes). */
const extractSignatures = (header: string): string[] => {
  const signatures: string[] = [];

  for (const chunk of header.split(/\s+/)) {
    if (!chunk) continue;

    const parts = chunk.split(',');

    // Shape B: "t=<timestamp>,v1=<base64>"
    const inline = parts.filter((part) => part.startsWith('v1=')).map((part) => part.slice(3));
    if (inline.length > 0) {
      signatures.push(...inline);
      continue;
    }

    // Shape A: "v1,<base64>"
    if (parts.length === 2 && parts[0].trim() === 'v1') {
      signatures.push(parts[1]);
    }
  }

  return signatures;
};

/** The timestamp can arrive in its own header or inside the signature header. */
const extractTimestamp = (header: string, signatureHeader: string): number | null => {
  const raw = header || signatureHeader.match(/t=(\d+)/)?.[1] || '';
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const safeEqual = (a: string, b: string): boolean => {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
};

/**
 * Verify the Svix signature.
 * Returns a discriminated result so the route can answer precisely.
 */
const verifySignature = (
  secret: string,
  svixId: string,
  svixTimestamp: string,
  signatureHeader: string,
  rawBody: string
): { ok: true } | { ok: false; reason: string; status: number } => {
  const signatures = extractSignatures(signatureHeader);
  if (signatures.length === 0) {
    return {
      ok: false,
      reason: 'no v1 signature in the svix-signature header',
      status: 401,
    };
  }

  const timestamp = extractTimestamp(svixTimestamp, signatureHeader);
  if (!timestamp) {
    return {
      ok: false,
      reason: 'missing or invalid svix-timestamp header',
      status: 401,
    };
  }

  // Replay protection: reject signatures outside the tolerance window.
  const ageSeconds = Math.abs(Date.now() / 1000 - timestamp);
  if (ageSeconds > TOLERANCE_SECONDS) {
    return {
      ok: false,
      reason: `timestamp outside the ${TOLERANCE_SECONDS}s tolerance window`,
      status: 403,
    };
  }

  const expected = createHmac('sha256', secret)
    .update(`${svixId}.${svixTimestamp}.${rawBody}`)
    .digest('base64');

  const matched = signatures.some((signature) => safeEqual(signature, expected));
  if (!matched) {
    return { ok: false, reason: 'signature mismatch', status: 401 };
  }

  return { ok: true };
};

const rememberEvent = (event: WebhookEvent) => {
  recentEvents.unshift(event);
  if (recentEvents.length > MAX_REMEMBERED_EVENTS) {
    recentEvents.length = MAX_REMEMBERED_EVENTS;
  }
};

/** Status endpoint — lets you confirm the secret is present and see recent events. */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      configured: Boolean(getSecret()),
      recentEvents,
      note: 'recentEvents is per-instance and best-effort; the durable record is the Vercel log.',
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(req: Request) {
  const secret = getSecret();

  if (!secret) {
    console.error(
      '[Resend Webhook] RESEND_WEBHOOK_SECRET is not set — webhook events are being dropped.'
    );
    return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 503 });
  }

  // The raw body is required — re-serialising the parsed JSON would change
  // the bytes and break the signature.
  const rawBody = await req.text();

  const svixId = req.headers.get('svix-id') || '';
  const svixTimestamp = req.headers.get('svix-timestamp') || '';
  const signatureHeader = req.headers.get('svix-signature') || '';

  if (!svixId || !svixTimestamp || !signatureHeader) {
    return NextResponse.json(
      { error: 'Missing svix-id, svix-timestamp or svix-signature header.' },
      { status: 401 }
    );
  }

  const verification = verifySignature(secret, svixId, svixTimestamp, signatureHeader, rawBody);

  if (!verification.ok) {
    console.warn('[Resend Webhook] Rejected event:', verification.reason);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: verification.status });
  }

  let payload: {
    type?: string;
    created_at?: string;
    data?: { email_id?: string; to?: string[]; reason?: string };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Malformed JSON body.' }, { status: 400 });
  }

  const type = payload.type || 'unknown';
  const event: WebhookEvent = {
    type,
    receivedAt: new Date().toISOString(),
    emailId: payload.data?.email_id,
    to: payload.data?.to?.[0],
    reason: payload.data?.reason,
  };

  rememberEvent(event);

  console.log('[Resend Webhook]', JSON.stringify(event));

  // Unknown event types are acknowledged so Resend does not retry them.
  return NextResponse.json({ received: true, type });
}
