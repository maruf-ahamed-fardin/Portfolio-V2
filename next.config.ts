import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    // tree-shake the barrel packages so only the icons/primitives we use ship
    optimizePackageImports: ['radix-ui', 'lucide-react'],
  },
};

export default nextConfig;
