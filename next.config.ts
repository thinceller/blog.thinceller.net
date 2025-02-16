import type { NextConfig } from 'next';

/**@see https://zenn.dev/catnose99/scraps/661d77118aa2af */
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config: NextConfig) => config;

const nextConfig: NextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
