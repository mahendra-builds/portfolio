import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import { GET, POST } from '../src/app/api/contact/route';

/**
 * Contact API tests.
 *
 * `globalThis.fetch` is stubbed, so NO network request is ever made and NO
 * email can be sent from this suite. The real route handler is imported and
 * exercised directly.
 */

const VALID = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Hello, I would like to discuss a Drupal project.',
};

interface CapturedCall {
  url: string;
  method?: string;
  headers: Record<string, string>;
  body: string;
}

const realFetch = globalThis.fetch;
const realConsoleLog = console.log;
const realConsoleError = console.error;

let calls: CapturedCall[] = [];
let respond: () => Response;
let ipCounter = 0;
let logLines: string[] = [];

const nextIp = () => `203.0.113.${++ipCounter}`;

const configure = (overrides: Record<string, string | undefined> = {}): void => {
  process.env.RESEND_API_KEY = 're_test_key_do_not_use';
  process.env.RECIPIENT_EMAIL = 'ma02raj@gmail.com';
  process.env.CONTACT_FROM = 'Mahendra Rajput <hello@mahiweb.in>';
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
};

const buildRequest = (
  body: unknown,
  options: { ip?: string; origin?: string | null; headers?: Record<string, string> } = {}
): Request => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Host: 'mahiweb.in',
    'x-forwarded-for': options.ip ?? nextIp(),
    ...(options.headers ?? {}),
  };

  const origin = options.origin === undefined ? 'https://mahiweb.in' : options.origin;
  if (origin !== null) headers.Origin = origin;

  return new Request('https://mahiweb.in/api/contact', {
    method: 'POST',
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
};

const jsonResponse = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

beforeEach(() => {
  calls = [];
  logLines = [];
  respond = () => jsonResponse(200, { id: 'email_test_123' });

  globalThis.fetch = (async (input: unknown, init: RequestInit = {}) => {
    calls.push({
      url: String(input),
      method: init.method,
      headers: Object.fromEntries(new Headers(init.headers).entries()),
      body: typeof init.body === 'string' ? init.body : '',
    });
    return respond();
  }) as typeof fetch;

  console.log = (...args: unknown[]) => {
    logLines.push(args.map(String).join(' '));
  };
  console.error = (...args: unknown[]) => {
    logLines.push(args.map(String).join(' '));
  };
});

afterEach(() => {
  globalThis.fetch = realFetch;
  console.log = realConsoleLog;
  console.error = realConsoleError;
  delete process.env.RESEND_API_KEY;
  delete process.env.RECIPIENT_EMAIL;
  delete process.env.CONTACT_FROM;
});

describe('successful delivery', () => {
  test('returns success and sends the right payload to Resend', async () => {
    configure();

    const res = await POST(buildRequest(VALID));
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.deepEqual(body, { success: true });
    assert.equal(calls.length, 1);

    const call = calls[0];
    assert.equal(call.url, 'https://api.resend.com/emails');
    assert.equal(call.method, 'POST');
    assert.equal(call.headers.authorization, 'Bearer re_test_key_do_not_use');

    const payload = JSON.parse(call.body);
    assert.equal(payload.from, 'Mahendra Rajput <hello@mahiweb.in>');
    assert.deepEqual(payload.to, ['ma02raj@gmail.com']);
    assert.equal(payload.reply_to, 'jane@example.com');
    assert.equal(payload.subject, 'New Portfolio Inquiry from Jane Doe');
    assert.match(payload.text, /Jane Doe/);
    assert.match(payload.text, /jane@example\.com/);
  });

  test('sends an Idempotency-Key so a retry cannot deliver twice', async () => {
    configure();

    const submissionId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    await POST(buildRequest({ ...VALID, submissionId }));

    assert.ok(calls[0].headers['idempotency-key']);
    assert.match(
      calls[0].headers['idempotency-key'],
      /^contact-a1b2c3d4-e5f6-7890-abcd-ef1234567890-[0-9a-f]{16}$/
    );
  });

  test('an edited message gets a different idempotency key', async () => {
    configure();
    const submissionId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

    await POST(buildRequest({ ...VALID, submissionId }));
    await POST(buildRequest({ ...VALID, submissionId, message: 'Different message.' }));

    assert.notEqual(calls[0].headers['idempotency-key'], calls[1].headers['idempotency-key']);
  });

  test('honours RECIPIENT_EMAIL over the default', async () => {
    configure({ RECIPIENT_EMAIL: 'someone-else@example.com' });

    await POST(buildRequest(VALID));

    assert.deepEqual(JSON.parse(calls[0].body).to, ['someone-else@example.com']);
  });
});

describe('validation', () => {
  test('rejects an empty name', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, name: '' }));

    assert.equal(res.status, 400);
    assert.equal(calls.length, 0, 'no request must be sent for invalid input');
  });

  test('rejects an empty email', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, email: '' }));

    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  test('rejects an empty message', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, message: '' }));

    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  test('rejects a malformed email', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, email: 'not-an-email' }));

    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  test('rejects an over-long name', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, name: 'x'.repeat(101) }));

    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  test('rejects an over-long message', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, message: 'x'.repeat(5001) }));

    assert.equal(res.status, 400);
    assert.equal(calls.length, 0);
  });

  test('rejects a malformed JSON body with 400 instead of 500', async () => {
    configure();
    const res = await POST(buildRequest('{"name": "broken"'));

    assert.equal(res.status, 400);
    assert.equal((await res.json()).code, 'invalid_json');
    assert.equal(calls.length, 0);
  });

  test('rejects a body larger than the limit with 413', async () => {
    configure();
    const res = await POST(buildRequest({ ...VALID, message: 'x'.repeat(20000) }));

    assert.equal(res.status, 413);
    assert.equal((await res.json()).code, 'payload_too_large');
    assert.equal(calls.length, 0);
  });

  test('rejects a non-JSON content type with 415', async () => {
    configure();
    const res = await POST(buildRequest(VALID, { headers: { 'Content-Type': 'text/plain' } }));

    assert.equal(res.status, 415);
    assert.equal(calls.length, 0);
  });
});

describe('honeypot', () => {
  test('a filled honeypot returns success without sending anything', async () => {
    configure();

    const res = await POST(buildRequest({ ...VALID, company: 'Acme Corp' }));

    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { success: true });
    assert.equal(calls.length, 0, 'no email may be sent for a honeypot hit');
  });
});

describe('origin protection', () => {
  test('rejects a cross-origin request without sending anything', async () => {
    configure();

    const res = await POST(buildRequest(VALID, { origin: 'https://evil.example.com' }));

    assert.equal(res.status, 403);
    assert.equal(calls.length, 0);
  });

  test('accepts the production origin', async () => {
    configure();

    const res = await POST(buildRequest(VALID, { origin: 'https://mahiweb.in' }));

    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
  });
});

describe('rate limiting', () => {
  test('allows five requests then rejects the sixth', async () => {
    configure();
    const ip = '198.51.100.7';

    for (let i = 0; i < 5; i += 1) {
      const res = await POST(buildRequest(VALID, { ip }));
      assert.equal(res.status, 200, `request ${i + 1} should succeed`);
    }

    const blocked = await POST(buildRequest(VALID, { ip }));
    assert.equal(blocked.status, 429);
    assert.equal(calls.length, 5, 'the blocked request must not be forwarded');
  });
});

describe('missing configuration', () => {
  test('reports 503 when RESEND_API_KEY is absent', async () => {
    configure({ RESEND_API_KEY: undefined });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 503);
    assert.equal((await res.json()).code, 'email_not_configured');
    assert.equal(calls.length, 0);
  });

  test('reports 503 when CONTACT_FROM is absent', async () => {
    configure({ CONTACT_FROM: undefined });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 503);
    assert.equal((await res.json()).code, 'email_not_configured');
    assert.equal(calls.length, 0);
  });

  test('reports 503 when CONTACT_FROM is not a valid address', async () => {
    configure({ CONTACT_FROM: 'Mahendra Portfolio' });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 503);
    assert.equal(calls.length, 0);
  });

  test('reports 503 when RECIPIENT_EMAIL is malformed', async () => {
    configure({ RECIPIENT_EMAIL: 'not-an-email' });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 503);
    assert.equal(calls.length, 0);
  });
});

describe('provider failures', () => {
  test('maps a 401 from Resend to 502 delivery_failed', async () => {
    configure();
    respond = () => jsonResponse(401, { name: 'validation_error', message: 'API key is invalid' });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 502);
    assert.equal((await res.json()).code, 'delivery_failed');
    assert.equal(calls.length, 1, 'a 4xx must not be retried');
  });

  test('maps a 403 from Resend to 502 delivery_failed', async () => {
    configure();
    respond = () => jsonResponse(403, { name: 'validation_error', message: 'domain not verified' });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 502);
    assert.equal(calls.length, 1);
  });

  test('maps a 429 from Resend to 502 delivery_failed', async () => {
    configure();
    respond = () =>
      jsonResponse(429, { name: 'rate_limit_exceeded', message: 'Too many requests' });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 502);
    assert.equal(calls.length, 1);
  });

  test('retries a 500 from Resend once, then returns 502', async () => {
    configure();
    respond = () =>
      jsonResponse(500, { name: 'application_error', message: 'Something went wrong' });

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 502);
    assert.equal(calls.length, 2, 'a 5xx must be retried exactly once');
  });

  test('retries a network error once, then returns 502', async () => {
    configure();
    respond = () => {
      throw new Error('ECONNREFUSED');
    };

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 502);
    assert.equal(calls.length, 2);
  });

  test('treats a 200 without an email id as a failure', async () => {
    configure();
    respond = () => jsonResponse(200, {});

    const res = await POST(buildRequest(VALID));

    assert.equal(res.status, 502);
  });
});

describe('health probe', () => {
  test('reports readiness without exposing the API key', async () => {
    configure();

    const res = await GET();
    const raw = await res.text();
    const body = JSON.parse(raw);

    assert.equal(res.status, 200);
    assert.equal(body.provider, 'resend');
    assert.equal(body.deliveryReady, true);
    assert.equal(body.configured.resend, true);
    assert.equal(body.configured.sender, true);
    assert.ok(!raw.includes('re_test_key_do_not_use'), 'the key must never be exposed');
  });

  test('reports not-ready when the sender is missing', async () => {
    configure({ CONTACT_FROM: undefined });

    const body = JSON.parse(await (await GET()).text());

    assert.equal(body.configured.sender, false);
    assert.equal(body.deliveryReady, false);
  });
});

describe('logging', () => {
  test("never logs the API key or the visitor's full email address", async () => {
    configure();
    respond = () =>
      jsonResponse(403, { name: 'validation_error', message: 'domain is not verified' });

    await POST(buildRequest(VALID));

    const output = logLines.join('\n');
    assert.ok(output.length > 0, 'a failure must be logged');
    assert.ok(!output.includes('re_test_key_do_not_use'), 'the API key must never be logged');
    assert.ok(!output.includes('jane@example.com'), 'the visitor email must be masked');
    assert.match(output, /ja\*\*\*@example\.com/);
  });

  test('logs a successful delivery with the Resend email id', async () => {
    configure();

    await POST(buildRequest(VALID));

    const output = logLines.join('\n');
    assert.match(output, /delivery=ok/);
    assert.match(output, /email_test_123/);
  });
});
