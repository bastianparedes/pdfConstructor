/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/pdf-constructor',
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
