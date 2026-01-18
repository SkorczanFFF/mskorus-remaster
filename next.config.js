/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'gsap'],
  reactStrictMode: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR - Webpack config for SVG handling
  // Note: Next.js 16 uses Turbopack by default, but webpack is still supported
  webpack(config) {
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

  // Add empty turbopack config to silence warning
  // SVGR webpack config will still work when using --webpack flag
  turbopack: {},
};

module.exports = nextConfig;
