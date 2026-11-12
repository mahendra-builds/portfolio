/**
 * @sentry/nextjs client initialization — deferred.
 *
 * `sentry.client.config.ts` is evaluated as part of the main entry chunk, so an
 * eager `Sentry.init()` used to pay SDK evaluation + instrumentation cost on
 * every page load, even when NEXT_PUBLIC_SENTRY_DSN is not configured (the
 * current default). Errors during the first load window are still caught by
 * the SSR/edge pipelines via @sentry/nextjs; only this client bucket moves out
 * of the critical path.
 */
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || '';

if (dsn) {
  const init = () => {
    void import('@sentry/nextjs').then((Sentry) => {
      Sentry.init({
        dsn,
        tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
        environment: process.env.NODE_ENV,
        sendDefaultPii: false,
      });
    });
  };

  if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
      (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(init);
    } else {
      window.addEventListener('load', () => {
        (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(init);
      });
    }
  }
}
