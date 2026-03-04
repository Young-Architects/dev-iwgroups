/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/wp-api/:path*',
        destination: 'https://api.innerworkgroups.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig

 