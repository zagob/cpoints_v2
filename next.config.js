/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://github.com/"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
