import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack does not walk up to the home directory
  // when it finds a stray lockfile there.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
