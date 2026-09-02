import type { NextConfig } from "next";

// GitHub Pages serves a project site from a sub-path (…/​<repo>/). The deploy
// workflow sets NEXT_PUBLIC_BASE_PATH to that sub-path; local dev/build leave it
// empty and serve from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack does not walk up to the home directory
  // when it finds a stray lockfile there.
  turbopack: {
    root: import.meta.dirname,
  },
  // Fully static homepage → export to plain HTML/CSS/JS for GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
