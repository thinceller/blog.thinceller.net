/**@see https://zenn.dev/catnose99/scraps/661d77118aa2af */
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

module.exports = withBundleAnalyzer(nextConfig);
