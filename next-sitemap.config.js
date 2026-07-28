// Kept in sync with src/lib/site.ts by hand — this file is CommonJS and runs
// outside the TS build, so it cannot import from it.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl'
).replace(/\/+$/, '');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  alternateRefs: [
    { href: siteUrl, hreflang: 'pl' },
    { href: `${siteUrl}/en`, hreflang: 'en' },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
