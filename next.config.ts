import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  output: 'export',
  basePath: "/maza-albums",
};

export default nextConfig;
