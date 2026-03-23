/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', 'gsap'],
  reactStrictMode: true,

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
