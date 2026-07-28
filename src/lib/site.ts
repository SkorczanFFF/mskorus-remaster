/**
 * Single source of truth for domain and business identity.
 *
 * Before this existed the domain was spelled three different ways across the
 * codebase — the env var, a hardcoded fallback, and a third one baked into the
 * cookie policy prose. Everything that needs the domain, the company name or
 * the contact details reads it from here.
 */

/** Normalised — never carries a trailing slash, so `${SITE_URL}${path}` is safe. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl'
).replace(/\/+$/, '');

/** Bare host, for prose and table cells. */
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '');

export const COMPANY_NAME = 'SKOFTWARE Maciej Skorus';
export const COMPANY_SHORT_NAME = 'SKOFTWARE';
export const COMPANY_FOUNDER = 'Maciej Skorus';

/** NIP 6252501911, in the EU-prefixed form schema.org expects. */
export const VAT_ID = 'PL6252501911';

// TODO(C7): flip to kontakt@skoftware.pl once the mailbox exists. Changing it
// here updates the footer, the schema and the legal pages in one go.
export const CONTACT_EMAIL = 'skorusmaciej94@gmail.com';

/** E.164, for `tel:` links and structured data. */
export const CONTACT_PHONE = '+48668366648';

export const SOCIAL_LINKS = [
  'https://github.com/SkorczanFFF',
  'https://www.linkedin.com/in/mskorus/',
] as const;
