import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // أي دومين
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;