/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lens.infura-ipfs.io",
      "icon-library.com",
    ]
  },
}

module.exports = nextConfig
