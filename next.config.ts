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
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
