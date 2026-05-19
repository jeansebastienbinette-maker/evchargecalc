import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using SSR on Vercel — generateStaticParams still pre-renders pages at build time
  // without hitting static export memory limits for 2550+ pages
};

export default nextConfig;
