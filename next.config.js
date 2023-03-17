/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_PROJECT_ID: "kaiju-dex"
},
distDir: "./.next"
}

module.exports = nextConfig
