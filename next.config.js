/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    unoptimized: true, // Required for static export
  },
  output: "export", // Enable static export
  trailingSlash: true, // Required for GitHub Pages
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "", // Replace YOUR_REPO_NAME with your actual repo name
}

module.exports = nextConfig
