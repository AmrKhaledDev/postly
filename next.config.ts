import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  reactCompiler: true,

  experimental: {
    proxyClientMaxBodySize: "50mb",
  },
};

export default nextConfig;