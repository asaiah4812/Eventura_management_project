/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "images.unsplash.com", "picsum.photos"],
  },
  experimental: {
    turbo: {
      rules: {
        // Option to enable/disable specific rules in Turbopack
      },
    },
  },
};

module.exports = nextConfig;
