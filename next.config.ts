import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // Add any old URL redirects here
      // Example: { source: "/old-path", destination: "/new-path", permanent: true },
    ];
  },
};

export default nextConfig;
