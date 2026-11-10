/**
 * Canonical public URL of the site. Used for metadata, sitemap, JSON-LD and
 * for validating the Origin header on server-side form submissions.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mahiweb.in').replace(
  /\/$/,
  ''
);
