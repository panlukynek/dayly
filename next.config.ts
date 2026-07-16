import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // First-party View Transitions integration (React <ViewTransition/>).
    viewTransition: true,
  },
};

export default nextConfig;
