/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mskorus.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
