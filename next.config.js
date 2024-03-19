/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.basePath ?? '',
  eslint: {
    dirs: ['.']
  },
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
