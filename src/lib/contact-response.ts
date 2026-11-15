/**
 * Shared types and response mapping for the contact form.
 *
 * Keeping the API-response → UI decision in a pure module means every status
 * the route can return is unit-testable without a browser, and the component
 * stays a thin renderer.
 */

export interface ContactApiResponse {
  success?: boolean;
  error?: string;
  code?: string;
}

export const EMAIL_NOT_CONFIGURED = 'email_not_configured';
export const DELIVERY_FAILED = 'delivery_failed';
export const PAYLOAD_TOO_LARGE = 'payload_too_large';
export const UNSUPPORTED_MEDIA_TYPE = 'unsupported_media_type';
export const INVALID_JSON = 'invalid_json';

export type ContactErrorOutcome = {
  kind: 'error';
  /** Short, human-readable reason shown inside the error banner. */
  message: string;
  /** Whether to offer the mailto fallback button. */
  mailto: boolean;
  /** Whether to offer the copy-to-clipboard fallback. */
  copyable: boolean;
};

export type ContactOutcome = { kind: 'success' } | ContactErrorOutcome;

const errorOutcome = (message: string): ContactErrorOutcome => ({
  kind: 'error',
  message,
  mailto: true,
  copyable: true,
});

/**
 * Map an API response onto the state the form should render.
 *
 * Every failure path keeps the mailto and clipboard fallbacks — a visitor
 * must never lose their message because the server was misconfigured.
 */
export const resolveContactOutcome = (
  status: number,
  data: ContactApiResponse | null | undefined
): ContactOutcome => {
  const payload = data ?? {};

  if (status === 200 && payload.success === true) {
    return { kind: 'success' };
  }

  if (status === 503 || payload.code === EMAIL_NOT_CONFIGURED) {
    return errorOutcome('the form is not connected to an email service yet');
  }

  if (status === 429) {
    return errorOutcome('too many messages were sent from this connection');
  }

  if (status === 403) {
    return errorOutcome('this request was blocked');
  }

  if (status === 413 || payload.code === PAYLOAD_TOO_LARGE) {
    return errorOutcome('the message is too long');
  }

  if (status === 415 || payload.code === UNSUPPORTED_MEDIA_TYPE) {
    return errorOutcome('the request format was not supported');
  }

  if (status === 400 || payload.code === INVALID_JSON) {
    return errorOutcome(payload.error || 'please check the form and try again');
  }

  if (status === 502 || payload.code === DELIVERY_FAILED) {
    return errorOutcome('the message could not be delivered right now');
  }

  return errorOutcome(payload.error || 'delivery failed');
};

/** The request never reached the server (offline, DNS failure, CORS, timeout). */
export const contactNetworkFailure = (): ContactErrorOutcome =>
  errorOutcome('the request could not be completed');
