import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // Match requests ที่ขึ้นต้นด้วย /api
  //       destination: "https://localhost:3001/api/:path*", // Proxy ไปยัง backend (HTTPS)
  //     },
  //   ];
  // },
};

export default nextConfig;
