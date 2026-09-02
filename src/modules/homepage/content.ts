/**
 * Homepage placeholder content — low-fidelity build.
 *
 * Every value here is PROVISIONAL and grayscale-stage. Requirement IDs (HP-xxx)
 * trace to `docs/requirements/HOMEPAGE_REQUIREMENTS.md`. Nothing in this file is
 * approved copy, verified data, or a final link target.
 *
 * - Metrics are marked "Unverified" (HP-301..HP-305).
 * - Phone / WhatsApp destinations are "Pending Product-Owner Verification"
 *   (HP-202, HP-203) — no number, form or URL is invented.
 * - Category / banner / result / testimonial content is bracketed placeholder.
 *
 * A later CMS/admin block (roadmap stage 5) owns this as structured, versioned,
 * admin-editable configuration — see `docs/modules/homepage/CONTRACT.md`.
 */

export type CategoryId =
  | "sslc"
  | "pu1-science"
  | "pu2-science"
  | "pu1-commerce"
  | "pu2-commerce"
  | "kcet"
  | "neet"
  | "ca-foundation";

export interface Category {
  id: CategoryId;
  label: string;
  /**
   * Real destination on parikshe.in. Pattern `/purchase/<slug>` confirmed by
   * the product owner for sslc / pu-science / pu-commerce (2026-09-02); the
   * remaining slugs follow the same pattern and are **pending confirmation**.
   */
  href: string;
  description: string;
}

const PURCHASE = "https://www.parikshe.in/purchase";
/** studio.parikshe.in category (class) listing pages — product-owner links. */
const STUDIO_CLASS = "https://studio.parikshe.in/products?&cat=";

/**
 * HP-032 — approved 8-category list; component must not assume exactly 8.
 * Real class listings on studio.parikshe.in (product-owner links, 2026-09-02);
 * KCET and NEET intentionally still route to the PU Science purchase page.
 */
export const CATEGORIES: readonly Category[] = [
  {
    id: "sslc",
    label: "SSLC",
    href: `${STUDIO_CLASS}561581`,
    description:
      "Class 10 Karnataka board — Maths, Science, Social Science and languages.",
  },
  {
    id: "pu1-science",
    label: "PU1 Science",
    href: `${STUDIO_CLASS}1311098`,
    description: "First-year PUC Science with early KCET and NEET foundations.",
  },
  {
    id: "pu2-science",
    label: "PU2 Science",
    href: `${STUDIO_CLASS}1311099`,
    description: "Board plus KCET / NEET integrated prep for the final year.",
  },
  {
    id: "pu1-commerce",
    label: "PU1 Commerce",
    href: `${STUDIO_CLASS}1311101`,
    description: "Accountancy, Economics and Business Studies from the basics.",
  },
  {
    id: "pu2-commerce",
    label: "PU2 Commerce",
    href: `${STUDIO_CLASS}1311102`,
    description: "Final-year Commerce with board focus and concept mastery.",
  },
  {
    id: "kcet",
    label: "KCET",
    href: `${PURCHASE}/pu-science`,
    description: "Karnataka CET coaching — PYQs, mock tests and rank strategy.",
  },
  {
    id: "neet",
    label: "NEET",
    href: `${PURCHASE}/pu-science`,
    description: "Full NEET syllabus — Physics, Chemistry, Botany and Zoology.",
  },
  {
    id: "ca-foundation",
    label: "CA Foundation",
    href: `${STUDIO_CLASS}4125644`,
    description: "Structured CA Foundation preparation for the next attempt.",
  },
] as const;

/**
 * Exam shortcuts shown as pill buttons under the intro paragraph. Each links
 * straight to that exam's courses.
 */
export const INTRO_EXAM_LINKS: readonly {
  id: string;
  label: string;
  href: string;
}[] = [
  { id: "sslc", label: "SSLC", href: `${STUDIO_CLASS}561581` },
  { id: "puc", label: "PUC", href: `${PURCHASE}/pu-science` },
  { id: "kcet", label: "KCET", href: `${PURCHASE}/pu-science` },
  { id: "neet", label: "NEET", href: `${PURCHASE}/pu-science` },
  {
    id: "ca-foundation",
    label: "CA Foundation",
    href: `${STUDIO_CLASS}4125644`,
  },
] as const;

/**
 * "Classes" tiles shown in the card that overlaps the hero banner
 * (Vedantu-style). These are classes, not individual products. KCET/NEET are
 * intentionally not here. Redirections are provisional — the product owner is
 * supplying the final per-class links.
 */
export type CourseTint =
  "violet" | "amber" | "emerald" | "pink" | "orange" | "sky";
export type CourseIconName = "book" | "science" | "commerce" | "calculator";

export interface ClassTile {
  id: string;
  label: string;
  href: string;
  tint: CourseTint;
  icon: CourseIconName;
}

export const CLASSES: readonly ClassTile[] = [
  { id: "sslc", label: "SSLC", href: `${STUDIO_CLASS}561581`, tint: "violet", icon: "book" }, // prettier-ignore
  { id: "pu1-science", label: "PU 1 Science", href: `${STUDIO_CLASS}1311098`, tint: "amber", icon: "science" }, // prettier-ignore
  { id: "pu2-science", label: "PU 2 Science", href: `${STUDIO_CLASS}1311099`, tint: "emerald", icon: "science" }, // prettier-ignore
  { id: "pu1-commerce", label: "PU 1 Commerce", href: `${STUDIO_CLASS}1311101`, tint: "pink", icon: "commerce" }, // prettier-ignore
  { id: "pu2-commerce", label: "PU 2 Commerce", href: `${STUDIO_CLASS}1311102`, tint: "orange", icon: "commerce" }, // prettier-ignore
  { id: "ca-foundation", label: "CA Foundation", href: `${STUDIO_CLASS}4125644`, tint: "sky", icon: "calculator" }, // prettier-ignore
] as const;

/** studio.parikshe.in product / book detail pages. */
const STUDIO = "https://studio.parikshe.in/details";

export interface CourseLink {
  /** Full product name — used in the Courses nav mega-menu. */
  label: string;
  /** Compact name — used in the width-constrained "Explore courses" row. */
  short?: string;
  href: string;
}

/**
 * HP-012 — "Find popular books": guide books shown both inside the Courses
 * mega-menu and under the dedicated "Books" nav item.
 */
export const GUIDE_BOOKS: readonly CourseLink[] = [
  {
    label: "SSLC Power Guide Combo – English Medium",
    href: `${STUDIO}?cat=561581&nid=4785371&origin=parikshe.in`,
  },
  {
    label: "SSLC Power Guide Combo – Kannada Medium",
    href: `${STUDIO}?nid=4785406&origin=parikshe.in`,
  },
] as const;

export interface ClassCourseGroup {
  id: string;
  /** Class name shown as the card title. */
  label: string;
  /** Small kicker above the title. */
  kicker: string;
  tint: CourseTint;
  /** studio.parikshe.in class listing — the "Explore courses" button. */
  exploreHref: string;
  courses: readonly CourseLink[];
}

/**
 * HP-011 / HP-013 — single source for both the "Courses" nav mega-menu and the
 * "Explore courses by class" section. `label` is the full product name (menu);
 * `short` is the compact name for the width-constrained Explore row. Product
 * URLs are `studio.parikshe.in/details?nid=<nid>` (product-owner list,
 * 2026-09-02).
 */
export const CLASS_COURSES: readonly ClassCourseGroup[] = [
  {
    id: "sslc",
    label: "SSLC",
    kicker: "Class 10",
    tint: "violet",
    exploreHref: `${STUDIO_CLASS}561581`,
    courses: [
      { label: "PARIKSHE PRATHAMA Core", short: "PRATHAMA Core", href: `${STUDIO}?nid=3396397` }, // prettier-ignore
      { label: "PARIKSHE PRATHAMA Core Plus", short: "PRATHAMA Core Plus", href: `${STUDIO}?nid=3397261` }, // prettier-ignore
      { label: "SSLC Power Guide Combo – English Medium", short: "Power Guide – English", href: `${STUDIO}?nid=4785371&origin=parikshe.in` }, // prettier-ignore
      { label: "SSLC Power Guide Combo – Kannada Medium", short: "Power Guide – Kannada", href: `${STUDIO}?nid=4785406&origin=parikshe.in` }, // prettier-ignore
    ],
  },
  {
    id: "pu1-science",
    label: "PU 1 Science",
    kicker: "1st PUC",
    tint: "amber",
    exploreHref: `${STUDIO_CLASS}1311098`,
    courses: [
      { label: "Aarambha KCET Integrated – 1 Year Plan", short: "Aarambha KCET – 1 Yr", href: `${STUDIO}?nid=3626753` }, // prettier-ignore
      { label: "Aarambha KCET Integrated – 2 Year Plan", short: "Aarambha KCET – 2 Yr", href: `${STUDIO}?nid=3963882` }, // prettier-ignore
      { label: "Aarambha NEET Integrated – 1 Year Plan", short: "Aarambha NEET – 1 Yr", href: `${STUDIO}?nid=3626939` }, // prettier-ignore
      { label: "Aarambha NEET Integrated – 2 Year Plan", short: "Aarambha NEET – 2 Yr", href: `${STUDIO}?nid=3963910` }, // prettier-ignore
    ],
  },
  {
    id: "pu2-science",
    label: "PU 2 Science",
    kicker: "2nd PUC",
    tint: "emerald",
    exploreHref: `${STUDIO_CLASS}1311099`,
    courses: [
      { label: "Vijeta 360 KCET Integrated", short: "Vijeta 360 KCET", href: `${STUDIO}?nid=4316473` }, // prettier-ignore
      { label: "Vijeta 360 KCET Integrated – Pro", short: "Vijeta 360 – Pro", href: `${STUDIO}?nid=4317487` }, // prettier-ignore
      { label: "Vijeta 360 KCET Integrated – NEET Plus", short: "Vijeta 360 – NEET Plus", href: `${STUDIO}?nid=4317634` }, // prettier-ignore
    ],
  },
  {
    id: "pu1-commerce",
    label: "PU 1 Commerce",
    kicker: "1st PUC",
    tint: "pink",
    exploreHref: `${STUDIO_CLASS}1311101`,
    courses: [
      { label: "Sankalpa Core – 1st PUC Commerce", short: "Sankalpa Core", href: `${STUDIO}?nid=4571049` }, // prettier-ignore
      { label: "Sankalpa Core Plus – 1st PUC Commerce", short: "Sankalpa Core Plus", href: `${STUDIO}?nid=4571068` }, // prettier-ignore
    ],
  },
  {
    id: "pu2-commerce",
    label: "PU 2 Commerce",
    kicker: "2nd PUC",
    tint: "orange",
    exploreHref: `${STUDIO_CLASS}1311102`,
    courses: [
      { label: "Sadhaka Pro – 2nd PUC Commerce", short: "Sadhaka Pro", href: `${STUDIO}?nid=3585596` }, // prettier-ignore
      { label: "Sadhaka Pro Plus – 2nd PUC Commerce", short: "Sadhaka Pro Plus", href: `${STUDIO}?nid=4221121` }, // prettier-ignore
    ],
  },
  {
    id: "ca-foundation",
    label: "CA Foundation",
    kicker: "CA",
    tint: "sky",
    exploreHref: `${STUDIO_CLASS}4125644`,
    courses: [
      { label: "Nischaya Pro – Sep'26 & Jan'27", short: "Nischaya Pro", href: `${STUDIO}?nid=4131156` }, // prettier-ignore
      { label: "Nischaya Pro Plus – Sep'26 & Jan'27", short: "Nischaya Pro Plus", href: `${STUDIO}?nid=4131167` }, // prettier-ignore
    ],
  },
] as const;

export interface NavLink {
  label: string;
  href: string;
}

/**
 * HP-010 — nav. Trimmed to just "Home" by product-owner decision (2026-09-02);
 * "Home" jumps back to the hero from anywhere on the page.
 */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "#top" },
] as const;

export interface HeroBanner {
  id: string;
  /** HP-401..HP-406 banner types. */
  type: "product" | "offering" | "app" | "student" | "free_vs_paid" | "festive";
  /**
   * Desktop creative (8:3, ≈2400×900) in `public/banners/hero/`. If the file is
   * missing the carousel shows a branded fallback (fail-safe, HP-020).
   */
  image: string;
  /**
   * Mobile crop (`<640px`, 16:10, ≈1200×750) in `public/banners/hero/`. If
   * omitted, `image` is used at both sizes with `object-cover`.
   */
  imageMobile?: string;
  /** Accessible description of the creative (HP-020 alt-text requirement). */
  alt: string;
  headline: string;
  supportingText: string;
  ctaLabel: string;
  /**
   * Destination for the CTA and the whole slide. Placeholder anchors for now —
   * the real course/checkout URLs come from admin config (HP-4xx).
   */
  ctaHref: string;
}

/**
 * HP-020 — configurable promotional hero carousel.
 * Content transcribed from the product-owner-supplied banner creatives
 * (2026-09-01). Prices/dates are as printed on the creatives and are treated as
 * campaign copy owned by the eventual admin/CMS, not verified platform facts.
 */
export const HERO_BANNERS: readonly HeroBanner[] = [
  {
    id: "puc-kcet",
    type: "product",
    image: "/banners/hero/aarambha-kcet.png",
    imageMobile: "/banners/hero/aarambha-kcet-mobile.png",
    alt: "1st PUC Aarambha — KCET Integrated 2026-27. Crack KCET with expert guidance. 200+ daily live classes, 50+ practice tests, PYQ solutions. ₹3,499.",
    headline: "1st PUC Aarambha — KCET Integrated 2026–27",
    supportingText:
      "Complete 1st PUC Science (Karnataka board) + KCET strategy. 200+ daily live classes, 50+ practice tests, PYQ solutions.",
    ctaLabel: "Buy now",
    ctaHref: `${STUDIO}?nid=3626753`,
  },
  {
    id: "puc-neet",
    type: "product",
    image: "/banners/hero/aarambha-neet.png",
    imageMobile: "/banners/hero/aarambha-neet-mobile.png",
    alt: "1st PUC Aarambha — NEET Integrated 2026-27. Crack NEET with expert guidance. ₹4,499.",
    headline: "1st PUC Aarambha — NEET Integrated 2026–27",
    supportingText:
      "1st PUC Science + full NEET syllabus coverage — Physics, Chemistry, Botany, Zoology, plus KCET maths.",
    ctaLabel: "Buy now",
    ctaHref: `${STUDIO}?nid=3626939`,
  },
  {
    id: "ca-foundation-nischaya",
    type: "product",
    image: "/banners/hero/nischaya-2-tires.png",
    imageMobile: "/banners/hero/nischaya-2-tires-mobile.png",
    alt: "CA Foundation Nischaya. Nischaya Pro ₹5,999, Nischaya Pro+ ₹8,999. January attempt.",
    headline: "CA Foundation Nischaya",
    supportingText:
      "Structured preparation for the January attempt — Nischaya Pro and Pro+ plans.",
    ctaLabel: "Enrol now",
    ctaHref: `${STUDIO}?nid=4131156`,
  },
  {
    id: "prathama-core-plus",
    type: "product",
    image: "/banners/hero/prathama-plus.png",
    imageMobile: "/banners/hero/prathama-plus-mobile.png",
    alt: "Parikshe Prathama Core Plus for SSLC batch of 2027. Maths, Science, Social Science, English and Kannada (1st & 2nd language). ₹2,499 for the full year.",
    headline: "Parikshe Prathama Core Plus — SSLC 2027",
    supportingText:
      "Maths, Science, Social Science, English and Kannada (1st & 2nd language). Daily live classes with recordings.",
    ctaLabel: "Enrol now",
    ctaHref: `${STUDIO}?nid=3397261`,
  },
  {
    id: "prathama-core",
    type: "product",
    image: "/banners/hero/prathama.png",
    imageMobile: "/banners/hero/prathama-mobile.png",
    alt: "Parikshe Prathama Core for SSLC batch of 2027. Maths, Science, Social Science. ₹2,199 for the full year.",
    headline: "Parikshe Prathama Core — SSLC 2027",
    supportingText:
      "Maths, Science and Social Science. Daily live classes, full syllabus coverage, solved sample papers.",
    ctaLabel: "Enrol now",
    ctaHref: `${STUDIO}?nid=3396397`,
  },
  {
    id: "sadhaka-pro-commerce",
    type: "product",
    image: "/banners/hero/sadhaka.png",
    imageMobile: "/banners/hero/sadhaka-mobile.png",
    alt: "Sadhaka Pro — 2nd PUC Commerce 2026-27. Trusted by 30,000+ students. Live classes and recordings, solved question bank, practice tests. ₹3,499.",
    headline: "Sadhaka Pro — 2nd PUC Commerce 2026–27",
    supportingText:
      "Live classes and recordings, solved question bank, sample papers, doubt-solving and exam support.",
    ctaLabel: "Buy now",
    ctaHref: `${STUDIO}?nid=3585596`,
  },
  {
    id: "sankalpa-core-commerce",
    type: "product",
    image: "/banners/hero/sankalpa-core.png",
    imageMobile: "/banners/hero/sankalpa-core-mobile.png",
    alt: "Sankalpa Core — 1st PUC Commerce 2026-2027. Solved question bank, PYQs with solutions, mind maps, sample question paper.",
    headline: "Sankalpa Core — 1st PUC Commerce 2026–27",
    supportingText:
      "Solved question bank, PYQs with solutions, mind maps and sample question papers.",
    ctaLabel: "Buy now",
    ctaHref: `${STUDIO}?nid=4571049`,
  },
  {
    id: "vijeta-360",
    type: "product",
    image: "/banners/hero/vijeta.png",
    imageMobile: "/banners/hero/vijeta-mobile.png",
    alt: "2nd PUC Vijeta 360 — KCET Integrated. 06 April 2026 to 31 December 2026. Daily lives, practice tests, PYQ solutions. ₹3,999.",
    headline: "2nd PUC Vijeta 360 — KCET Integrated",
    supportingText:
      "Complete 2nd PUC Science (Karnataka board) + KCET strategy, now in Kannada and English. Notes, PYQs, test papers.",
    ctaLabel: "Buy now",
    ctaHref: `${STUDIO}?nid=4316473`,
  },
] as const;

/**
 * HP-140 / HP-326 — promotional popup. Product-owner decision (2026-09-02):
 * the popup shows the creative ONLY (no headline / body / button); the image
 * itself is the click target. Creative lives in `public/banners/popup/`.
 */
export const PROMO_POPUP = {
  image: "/banners/popup/sslc-power-guides.png",
  alt: "Parikshe SSLC Power Guides — Mathematics, Science and Social Science. Your all-in-one Karnataka SSLC exam prep.",
  href: "https://studio.parikshe.in/details?nid=4785371&origin=parikshe.in",
} as const;

export interface IntroBanner {
  id: string;
  /** 16:10 creative (~1200×750) in `public/banners/intro/`. */
  image: string;
  alt: string;
  href: string;
}

/**
 * Auto-rotating promo carousel in the "Learn · Prepare · Achieve" intro section.
 * Its own creative set (separate from the hero) — drop files in
 * `public/banners/intro/`, one row here. Missing file → branded fallback.
 */
export const INTRO_BANNERS: readonly IntroBanner[] = [
  {
    id: "slide-1",
    image: "/banners/intro/slide-1.png",
    alt: "1st PUC Aarambha — KCET Integrated 2026–27.",
    href: `${STUDIO}?nid=3626753`,
  },
  {
    id: "slide-2",
    image: "/banners/intro/slide-2.png",
    alt: "Sadhaka Pro — 2nd PUC Commerce.",
    href: `${STUDIO}?nid=3585596`,
  },
  {
    id: "slide-3",
    image: "/banners/intro/slide-3.png",
    alt: "Vijeta 360 — 2nd PUC KCET Integrated.",
    href: `${STUDIO}?nid=4316473`,
  },
  {
    id: "slide-4",
    image: "/banners/intro/slide-4.png",
    alt: "Parikshe Prathama Core Plus — SSLC.",
    href: `${STUDIO}?nid=3397261`,
  },
] as const;

export interface Metric {
  id: string;
  value: string;
  label: string;
}

/**
 * HP-301..HP-304 — "Observed on current website — verification required".
 * Rendered with an explicit "Unverified" affordance; never presented as fact.
 */
export const SCALE_METRICS: readonly Metric[] = [
  { id: "students", value: "3.5M+", label: "Students" },
  { id: "downloads", value: "1L+", label: "App downloads" },
  { id: "lectures", value: "5549+", label: "Lectures" },
  { id: "rating", value: "4.8/5", label: "App rating" },
] as const;

export type WhyChooseIcon =
  "teacher" | "book" | "target" | "chat" | "globe" | "device";

export interface WhyChooseItem {
  id: string;
  icon: WhyChooseIcon;
  title: string;
  /** The student's real problem this addresses. */
  problem: string;
  /** How Parikshe solves it. */
  body: string;
}

/**
 * HP-040 — "the student's journey": each item pairs a real problem with how
 * Parikshe resolves it. Copy is provisional (mirrors the current site's
 * benefit wording).
 */
export const WHY_CHOOSE: readonly WhyChooseItem[] = [
  {
    id: "expert",
    icon: "teacher",
    title: "Expert teachers for every subject",
    problem: "Hard to find good teachers for every subject in one place.",
    body: "Learn from experienced educators across SSLC, PUC, KCET, NEET and CA Foundation — all under one roof.",
  },
  {
    id: "material",
    icon: "book",
    title: "One organised place for study material",
    problem: "Notes are scattered and there is no proper question bank.",
    body: "Chapter-wise notes, previous-year questions, question banks and full-length practice tests, ready to use.",
  },
  {
    id: "exam-focused",
    icon: "target",
    title: "Preparation matched to your exam",
    problem: "Generic content that doesn't match the Karnataka exam pattern.",
    body: "Every course is built around the Karnataka board exams, KCET, NEET and CA Foundation blueprints.",
  },
  {
    id: "doubt",
    icon: "chat",
    title: "Doubts cleared, not piled up",
    problem: "Doubts build up with no one to ask at the right time.",
    body: "Ask in class or on the app and get answers from the teaching team, so nothing stays unclear.",
  },
  {
    id: "multilang",
    icon: "globe",
    title: "Learn in your language",
    problem: "English-only lessons are hard to follow for many students.",
    body: "Study in Kannada or English — pick the medium you understand best.",
  },
  {
    id: "anytime",
    icon: "device",
    title: "Study around your schedule",
    problem: "Fixed class timings clash with school and coaching.",
    body: "Attend live or watch recordings later — classes, notes and tests on the app, on any device.",
  },
] as const;

export interface ComparisonRow {
  parameter: string;
  free: string;
  paid: string;
}

/**
 * HP-090 / HP-091 — ONE reusable Free-vs-Paid comparison, rendered ONCE.
 * "Doubt Solving" under free = "Limited" (product-owner decision 2026-09-01).
 */
export const FREE_VS_PAID: readonly ComparisonRow[] = [
  {
    parameter: "Structured learning",
    free: "Self-managed",
    paid: "Structured plan aligned with the syllabus",
  },
  {
    parameter: "Live classes",
    free: "Limited",
    paid: "Live classes on the Parikshe app",
  },
  {
    parameter: "Doubt solving",
    free: "Limited",
    paid: "Doubt Support",
  },
  {
    parameter: "Study material",
    free: "Not included",
    paid: "Curated notes, previous-year papers & mock tests",
  },
  {
    parameter: "Practice & assessment",
    free: "Self-managed",
    paid: "Integrated tests & practice",
  },
  {
    parameter: "Revision support",
    free: "Self-managed",
    paid: "Planned revision & exam preparation",
  },
  {
    parameter: "Guidance & progress",
    free: "No personalised guidance",
    paid: "Guided preparation with progress tracking",
  },
] as const;

export type StudyResourceIcon = "book" | "youtube" | "sparkle";

export interface StudyResource {
  id: string;
  icon: StudyResourceIcon;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/** HP-080 — provisional demo copy. */
export const STUDY_RESOURCES: readonly StudyResource[] = [
  {
    id: "guidebook",
    icon: "book",
    title: "Guidebooks",
    body: "Chapter-wise printed guides mapped to the Karnataka syllabus, with solved examples.",
    ctaLabel: "View guidebooks",
    ctaHref: "#",
  },
  {
    id: "youtube",
    icon: "youtube",
    title: "Free YouTube lessons",
    body: "Thousands of free topic lessons on the Parikshe YouTube channel.",
    ctaLabel: "Watch on YouTube",
    ctaHref: "https://www.youtube.com/@SSLCPARIKSHE",
  },
  {
    id: "paid",
    icon: "sparkle",
    title: "Paid learning products",
    body: "Structured courses with live classes, tests, doubt support and mentor guidance.",
    ctaLabel: "Explore courses",
    ctaHref: "#explore-courses",
  },
] as const;

export interface CategoryResult {
  categoryId: CategoryId;
  categoryLabel: string;
  highlight: string;
}

/**
 * HP-100 — no real results data supplied. Highlights below are placeholder
 * shapes only, shown with an "Unverified" marker; rotates + manual override.
 */
export const CATEGORY_RESULTS: readonly CategoryResult[] = [
  {
    categoryId: "sslc",
    categoryLabel: "SSLC",
    highlight: "Awaiting verified result data",
  },
  {
    categoryId: "pu2-science",
    categoryLabel: "PU2 Science",
    highlight: "Awaiting verified result data",
  },
  {
    categoryId: "pu2-commerce",
    categoryLabel: "PU2 Commerce",
    highlight: "Awaiting verified result data",
  },
  {
    categoryId: "kcet",
    categoryLabel: "KCET",
    highlight: "Awaiting verified result data",
  },
  {
    categoryId: "neet",
    categoryLabel: "NEET",
    highlight: "Awaiting verified result data",
  },
  {
    categoryId: "ca-foundation",
    categoryLabel: "CA Foundation",
    highlight: "Awaiting verified result data",
  },
] as const;

export interface StudentStory {
  id: string;
  name: string;
  category: string;
  quote: string;
  achievement: string;
  hasVideo: boolean;
}

/**
 * HP-110 — student stories.
 * The content below is SYNTHETIC / AUTO-GENERATED placeholder spanning multiple
 * categories, used only to make the low-fidelity layout realistic. The product
 * owner has the real cross-category stories; they replace these before
 * high-fidelity. Names are invented — not real students (privacy.md: synthetic
 * data in non-production).
 */
export const STUDENT_STORIES: readonly StudentStory[] = [
  {
    id: "s1",
    name: "Ananya R.",
    category: "SSLC",
    quote:
      "“The chapter-wise videos and notes made revision so much easier. I finally understood the topics I used to skip.”",
    achievement: "Scored 94% in the board exam",
    hasVideo: true,
  },
  {
    id: "s2",
    name: "Rahul M.",
    category: "PU2 Science",
    quote:
      "“Live doubt-solving sessions kept me on track through the year. The mock tests felt just like the real paper.”",
    achievement: "Cleared KCET with a strong rank",
    hasVideo: true,
  },
  {
    id: "s3",
    name: "Sneha K.",
    category: "NEET",
    quote:
      "“Structured weekly plans took the guesswork out of preparation. I always knew what to study next.”",
    achievement: "Qualified NEET on the first attempt",
    hasVideo: false,
  },
  {
    id: "s4",
    name: "Karthik S.",
    category: "PU2 Commerce",
    quote:
      "“The previous-year paper walkthroughs and accountancy practice sets were exactly what I needed.”",
    achievement: "Scored 92% in PU2",
    hasVideo: true,
  },
  {
    id: "s5",
    name: "Divya P.",
    category: "CA Foundation",
    quote:
      "“Concept videos plus 1-on-1 support helped me build confidence in the tougher subjects.”",
    achievement: "Passed CA Foundation",
    hasVideo: false,
  },
] as const;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * HP-120 — objection- and SEO-oriented, no keyword stuffing. Final copy is
 * Proposed pending product-owner content review; refined from the live site's
 * existing 6 Q&A.
 */
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "f1",
    question: "Which classes and exams does Parikshe cover?",
    answer:
      "SSLC, 1st and 2nd PUC (Science and Commerce), KCET, NEET and CA Foundation — all aligned to the Karnataka syllabus.",
  },
  {
    id: "f2",
    question: "Are classes live or recorded?",
    answer:
      "Both. You can attend daily live classes or watch the recordings anytime on the Parikshe app.",
  },
  {
    id: "f3",
    question: "In which languages are classes taught?",
    answer:
      "Kannada and English, so you can learn in the medium you are most comfortable with.",
  },
  {
    id: "f4",
    question: "What study material is included?",
    answer:
      "Chapter-wise notes, previous-year questions, question banks and full-length practice tests.",
  },
  {
    id: "f5",
    question: "How does doubt-solving work?",
    answer:
      "Ask questions during class or through the app and get answers from the teaching team.",
  },
  {
    id: "f6",
    question: "How do I get started?",
    answer:
      "Pick your exam category above, choose a course, or request a callback and a counsellor will guide you.",
  },
] as const;
// NOTE: HP-120 — wording mirrors the current site; final SEO/objection copy is
// pending product-owner content review before FAQ structured data is emitted.

/**
 * HP-604 — Parikshe app. Play Store URL taken from parikshe.in (2026-09-01).
 * iOS App Store link not found on the current site — pending.
 */
export const APP_STORE = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.tribyte.parikshe&hl=en_IN",
  appStore: null as string | null,
  /** Observed on the current website — verification required. */
  rating: "4.8/5",
  reviews: "1.44K",
} as const;

/** HP-201..HP-208 — contact block. */
export const CONTACT = {
  /** HP-201 — approved. */
  email: "contactus@parikshe.in",
  /** HP-202 — APPROVED by the product owner (2026-09-01). */
  phone: "6366548224" as string | null,
  /**
   * HP-203 — WhatsApp click-to-chat on the approved number (HP-202). Swap for a
   * dedicated business number if the product owner supplies one.
   */
  whatsapp: "https://wa.me/916366548224" as string | null,
  /**
   * HP-204/205 — verified live destinations (2026-09-01). Product owner chose to
   * keep Instagram + YouTube on the homepage. HP-206/207 (Facebook, LinkedIn)
   * are intentionally excluded.
   */
  social: {
    instagram: "https://www.instagram.com/sslc_parikshe/" as string | null,
    youtube: "https://www.youtube.com/@SSLCPARIKSHE" as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
  },
  /** HP-208 — approved for removal from the homepage. */
  showAddress: false,
} as const;
