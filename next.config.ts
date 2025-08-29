import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
