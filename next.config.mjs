/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    dirs: ["app", "components", "lib"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
