import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* Silence cross-origin dev asset warning from the preview proxy */
  allowedDevOrigins: ["https://preview-chat-8c35d47e-a435-4d22-8d32-e7240e42206f.space-z.ai"],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
