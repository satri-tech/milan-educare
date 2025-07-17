import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // or 'export' depending on your setup
  images: {
    domains: ["milaaneducare.edu.np"],
  },
};

export default nextConfig;
