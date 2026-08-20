import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@transactions/shared'],
};

export default nextConfig;
