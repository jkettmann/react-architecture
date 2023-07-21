/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
      {
        source: "/cdn/:path*",
        destination: "http://localhost:3001/cdn/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
