import type { NextConfig } from "next";
const publicHost = process.env.AWS_S3_PUBLIC_BASE_URL ? new URL(process.env.AWS_S3_PUBLIC_BASE_URL).hostname : undefined;
const nextConfig: NextConfig = { images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }, { protocol: "https", hostname: "placehold.co" }, ...(publicHost ? [{ protocol: "https" as const, hostname: publicHost }] : [])] }, poweredByHeader: false, reactStrictMode: true };
export default nextConfig;
