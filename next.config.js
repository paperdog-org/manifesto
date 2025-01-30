/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export", // lightweight but no dynamic routes & api support
    //output: "standalone", // bulkier but supports dynamic routes & api
    //experimental: { esmExternals: true },
    images: { unoptimized: true },
    trailingSlash: true,
    transpilePackages: ['three'],
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ? `/${process.env.NEXT_PUBLIC_BASE_PATH}` : '',
    webpack: (config, { isServer }) => {
      // Add resolve fallback for "canvas"
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          canvas: false,
        };
      }
      return config;
    },
  }
  
  module.exports = nextConfig