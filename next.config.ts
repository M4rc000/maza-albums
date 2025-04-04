import type { NextConfig } from "next";

const nextConfig: NextConfig = {
basePath: '/maza-albums',
  assetPrefix: '/maza-albums',
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  output: 'export',
};

export default nextConfig;