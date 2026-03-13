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
    middlewareClientMaxBodySize: "50mb",
  },
};

export default nextConfig;