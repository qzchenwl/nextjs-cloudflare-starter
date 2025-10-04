import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV !== "production") {
  await initOpenNextCloudflareForDev();
}

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true
};

export default nextConfig;
