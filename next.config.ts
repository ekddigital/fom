import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Enable linting during builds to catch errors before deployment
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
