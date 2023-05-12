/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "gitcg-img-resources.s3.us-west-2.amazonaws.com",
    //     port: "",
    //     pathname: "/*",
    //   },
    // ],
    domains: ["gitcg-img-resources.s3.us-west-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
