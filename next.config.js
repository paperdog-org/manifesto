/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export", // lightweight but no dynamic routes & api support
    // output: "standalone", // bulkier but supports dynamic routes & api
    experimental: { esmExternals: true },
    trailingSlash: true,
  }
  
  const removeImports = require('next-remove-imports')()
  module.exports = removeImports(nextConfig)