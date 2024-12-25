/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === "production" ? "my-ec-service" : ""
}

module.exports = nextConfig
