import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce memory usage during build
  swcMinify: true,
  
  // Optimize build output
  output: 'standalone',
  
  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // Memory optimization
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Disable source maps in production to save memory
  productionBrowserSourceMaps: false,
};

export default nextConfig;
