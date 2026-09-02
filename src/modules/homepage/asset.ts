/**
 * Prefix a `/public` asset path with the deploy base path.
 *
 * `next/image` and `next/link` apply `basePath` automatically; raw `<img>` /
 * `<source>` tags do not, so `/banners/foo.png` would 404 on a GitHub Pages
 * project site (served from `/<repo>/`). Wrap those paths with `asset()`.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
