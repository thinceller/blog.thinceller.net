import type { NextConfig } from 'next';

/**@see https://zenn.dev/catnose99/scraps/661d77118aa2af */
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  experimental: {
    disableOptimizedLoading: true,
  },
};

export default withBundleAnalyzer(nextConfig);

// see: https://opennext.js.org/cloudflare/get-started#11-develop-locally
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
