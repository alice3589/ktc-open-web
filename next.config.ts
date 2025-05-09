import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  assetPrefix: "/ktc-open-web",
  basePath: "/ktc-open-web",
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
