/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export", // lightweight but no dynamic routes & api support
    // output: "standalone", // bulkier but supports dynamic routes & api
    experimental: { esmExternals: true },
    images: { unoptimized: true },
    trailingSlash: true,
    
  }
  
  module.exports = nextConfig