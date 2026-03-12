import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/wp-api/:path*",
        destination: "https://api.innerworkgroups.com/:path*",
      },
    ];
  },
};

export default nextConfig;
