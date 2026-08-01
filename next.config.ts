import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Sanity Studio to bundle correctly with all its server-side packages
  serverExternalPackages: ['styled-components'],

  // Allow Sanity CDN images and other external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
