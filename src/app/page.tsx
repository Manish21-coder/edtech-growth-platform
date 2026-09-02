import type { Metadata } from "next";
import { Homepage } from "@/modules/homepage/Homepage";

/**
 * `/` — Parikshe homepage (low-fidelity, grayscale build).
 * Core content is server-rendered for SEO (`.claude/rules/architecture.md`,
 * `technical-seo` skill). Metadata below is placeholder pending approved copy.
 */
export const metadata: Metadata = {
  title: "Parikshe — Learn. Prepare. Achieve.",
  description:
    "[Placeholder meta description] Parikshe: online courses, study material and exam preparation for SSLC, PUC, KCET, NEET and CA Foundation students.",
};

export default function Page() {
  return <Homepage />;
}
