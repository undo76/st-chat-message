/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/component/st_chat_message.st_chat_message",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "streamlit-component-lib-react-hooks",
    "streamlit-component-lib",
  ],
};

module.exports = nextConfig;
