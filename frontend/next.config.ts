import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flare.network',
        pathname: '/api/media/file/**',
      },
    ],
  },
};

export default nextConfig;
