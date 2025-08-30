import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "http:localhost:3000",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "housing-in-ghana.fra1.cdn.digitaloceanspaces.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
