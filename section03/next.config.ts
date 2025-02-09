import type { NextConfig } from "next";

const NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net",
      },
    ],
  },
};

export default NextConfig;
