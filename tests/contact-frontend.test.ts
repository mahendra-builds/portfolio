import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
  contactNetworkFailure,
  resolveContactOutcome,
  type ContactApiResponse,
} from '../src/lib/contact-response';

/**
 * The contact form must handle every response the API can produce. These tests
 * cover the mapping that drives the loading, success and error states.
 */

describe('resolveContactOutcome', () => {
  test('a 200 with success:true is a success', () => {
    const outcome = resolveContactOutcome(200, { success: true });

    assert.equal(outcome.kind, 'success');
  });

  test('a 200 without success:true is an error', () => {
    const outcome = resolveContactOutcome(200, { error: 'nope' });

    assert.equal(outcome.kind, 'error');
  });

  test('a 503 with email_not_configured explains the setup gap', () => {
    const outcome = resolveContactOutcome(503, {
      error: 'Direct email delivery is not configured on the server yet.',
      code: 'email_not_configured',
    });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /not connected to an email service/);
      assert.equal(outcome.mailto, true);
      assert.equal(outcome.copyable, true);
    }
  });

  test('a 502 with delivery_failed is an error with a fallback', () => {
    const outcome = resolveContactOutcome(502, {
      error: 'The message could not be delivered right now.',
      code: 'delivery_failed',
    });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /could not be delivered/);
      assert.equal(outcome.mailto, true);
      assert.equal(outcome.copyable, true);
    }
  });

  test('a 400 surfaces the server validation message', () => {
    const outcome = resolveContactOutcome(400, { error: 'Name is too long.' });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.equal(outcome.message, 'Name is too long.');
    }
  });

  test('a 429 is reported as a rate limit', () => {
    const outcome = resolveContactOutcome(429, { error: 'Too many messages sent.' });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /too many messages/);
      assert.equal(outcome.mailto, true);
    }
  });

  test('a 403 is reported as a blocked request', () => {
    const outcome = resolveContactOutcome(403, { error: 'Request origin is not allowed.' });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /blocked/);
    }
  });

  test('a 413 is reported as too long', () => {
    const outcome = resolveContactOutcome(413, { code: 'payload_too_large' });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /too long/);
    }
  });

  test('a 415 is reported as an unsupported format', () => {
    const outcome = resolveContactOutcome(415, { code: 'unsupported_media_type' });

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /not supported/);
    }
  });

  test('an unknown status still produces a usable error', () => {
    const outcome = resolveContactOutcome(500, {});

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.ok(outcome.message.length > 0);
      assert.equal(outcome.mailto, true);
      assert.equal(outcome.copyable, true);
    }
  });

  test('a null body still produces a usable error', () => {
    const outcome = resolveContactOutcome(500, null);

    assert.equal(outcome.kind, 'error');
  });

  test('every error path keeps both fallbacks', () => {
    const statuses = [400, 403, 413, 415, 429, 500, 502, 503];

    for (const status of statuses) {
      const outcome = resolveContactOutcome(status, {} as ContactApiResponse);
      assert.equal(outcome.kind, 'error', `status ${status} must be an error`);
      if (outcome.kind === 'error') {
        assert.equal(outcome.mailto, true, `status ${status} must offer the mailto fallback`);
        assert.equal(outcome.copyable, true, `status ${status} must offer the clipboard fallback`);
      }
    }
  });
});

describe('contactNetworkFailure', () => {
  test('keeps both fallbacks when the request never reached the server', () => {
    const outcome = contactNetworkFailure();

    assert.equal(outcome.kind, 'error');
    if (outcome.kind === 'error') {
      assert.match(outcome.message, /could not be completed/);
      assert.equal(outcome.mailto, true);
      assert.equal(outcome.copyable, true);
    }
  });
});
