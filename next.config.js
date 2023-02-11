/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "evergreen-media.s3.us-west-1.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
