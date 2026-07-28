/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'gsap'],
  reactStrictMode: true,

  /**
   * Locale lives in the URL, not in client state — Polish is the primary
   * market, so `/` serves PL and `/en/*` serves EN. Detection is off on
   * purpose: predictable URLs for crawlers, no surprise redirects.
   */
  i18n: {
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    localeDetection: false,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/i,
      type: 'asset/source',
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },

  turbopack: {},
};

module.exports = nextConfig;
