/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.APACHE_DEPLOY === '1' ? 'standalone' : undefined,
};

module.exports = nextConfig;
