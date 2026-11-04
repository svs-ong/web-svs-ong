import type { NextConfig } from "next";

const API_URL = process.env.CATS_API_URL ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // This folder is the project root, even when other package-lock.json files exist higher up
  turbopack: { root: __dirname },
  // Cat pictures live in homework/server; /images/luna.jpg is passed through to it
  rewrites: async () => [{ source: "/images/:path*", destination: `${API_URL}/images/:path*` }],
};

export default nextConfig;
