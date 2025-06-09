import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "letsenhance.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "blog.daraz.com.np",
        port: "",
      },
    ],
  },
};

export default nextConfig;
