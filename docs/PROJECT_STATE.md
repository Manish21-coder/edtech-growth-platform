# Project state

_Concise, always-current. Update at the end of every block. Do not rely on chat
memory for anything here._

Last updated: 2026-09-01

## Current block

| Field  | Value                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Block  | **Homepage v1** — requirements + IA/user-flow docs + homepage **built in code** (Next.js, mobile-first); now in the colour pass |
| Status | `IN_PROGRESS` — colour design applied; awaiting product-owner review + brand-asset confirmation                                 |
| Owner  | Product owner (parikshe_support@parikshe.in)                                                                                    |

Scope: homepage route (`/`) only. Backend / API / CRM / DB / analytics vendor,
auth, and new dependencies remain out of scope; lead submission is a
client-side simulated stub. Product owner authorised skipping Figma wireframes,
building directly in code, then (2026-09-01) moving to a **full-colour design**
and supplying real hero-banner creatives. See
`docs/requirements/HOMEPAGE_REQUIREMENTS.md` and
`docs/modules/homepage/CONTRACT.md`.

**Design pass (2026-09-02):** rebuilt to a **clean white + slate + single gold
accent** system (parikshe.in gold `#ffcc5b`; slate neutrals; `--brand-ink`
= slate-900 `#0f172a`). Predominantly white with generous whitespace; ONE dark
section ("Parikshe at scale") and a dark footer. **Poppins throughout** (800
headings, tight tracking) — Josefin dropped. Light header with a `PARiKSHE`
wordmark (logo PNG on the dark footer). Cards: `rounded-2xl`, layered soft
shadow, hover lift. Section eyebrows = gold bar + uppercase label. Bigger
type scale. **Free-vs-Paid is now a two-column card layout** (Free vs Paid,
"Recommended" badge on Paid) — still one component, HP-091. Favicon replaced;
Play Store link + app mockup + rating wired in; metrics `Unverified`-noted
once per section.

**Carousels (2026-09-02):** hero is now **banner-only** (no overlaid text,
`h1` is `sr-only`), ~82% viewport width, self-contained clickable creatives.
"Category-wise results" and "Students love Parikshe" are **infinite
auto-scrolling strips** (`Marquee` component + CSS in `globals.css`) — pause
on hover/focus, degrade to a scroll row under reduced-motion; loop copies are
`inert` + `aria-hidden` so AT/keyboard see each item once.

**Light-theme + production polish (2026-09-02):** removed the dark-mode media
override — **light theme only**, no dark sections. Intro: exam categories are
**inline gold buttons** in the sentence (separate chip row gone) + a clickable
promo banner on the right. "Why choose" is a **zigzag problem→solution**
layout. Category / hero-banner / intro links → **`parikshe.in/purchase/<slug>`**
(HP-602). Promo popup **re-shows every 10 minutes** (HP-321/322 superseded —
flagged for the anti-dark-pattern review). **Type pairing:** Bricolage
Grotesque (display) + Poppins (body) — no longer "same font everywhere".
**All dev/traceability text removed from the rendered page** (Unverified tags,
"placeholder" notes, popup rule text, demo-build hints, `[Result image]`
boxes). WhatsApp wired to `wa.me/916366548224` (approved number). "Doubt
solving" paid value shortened to "Dedicated 1-on-1".

**Blocked:** `studio.parikshe.in` (asked as the banner/redirect source) is a
login-protected bookings app — not readable, and no browser/OTP access. Real
banner files + their URLs still needed from the product owner; the 8
transcribed banners + fallback remain in place.

**Intro-section fix (2026-09-02):** right column is an **auto-rotating promo
carousel** (`SidePromoCarousel`, 4s crossfade, pause on hover/focus,
reduced-motion aware); grid is `lg:items-stretch` so the carousel fills the
column height, left column stats pinned to the bottom (`lg:mt-auto`). Section
vertical padding tightened site-wide.

**Nav + links (2026-09-02):** top nav trimmed to just **"Home"** (product-owner
decision) → jumps to `#top` (the hero) from anywhere; hamburger removed.
**KCET and NEET now redirect to `/purchase/pu-science`** (product-owner
decision) — categories, intro buttons and the NEET hero banner updated. 8 hero banners
transcribed into `HERO_BANNERS`; **image files still pending** in
`public/banners/` — hero shows a branded gradient fallback per missing file.

**Vedantu-style navbar (2026-09-02):** header rebuilt to wordmark + **Courses**
mega-menu + **Books** menu + **"Talk to our expert"** (opens the shared lead
form) + Login / Register. The Courses menu is "Find courses by class" — the 6
classes (SSLC, PU 1/2 Science, PU 1/2 Commerce, CA Foundation), each expanding
on hover/click to its products, plus a "Find popular books" block; the Books
menu shows the same guide books. Product/book links go to
`studio.parikshe.in/details?nid=…` and the guide-book combos (`COURSE_CLASSES`,
`GUIDE_BOOKS` in `content.ts`). Menus: open on hover + click, close on Escape /
outside-click / mouse-leave, one at a time, `hidden` when closed. `NAV_LINKS`
("Home") is now only used by the footer.

**Mobile header (`<lg`, 2026-09-02):** hamburger + wordmark + call-icon +
"Login"; the hamburger opens a drawer with the same Courses accordion, popular
books, "Talk to our expert" + phone (shared `ClassAccordion` component). "Talk
to our expert" + full number show inline only on `lg+`. The "Our Classes" tiles
become a horizontal snap-scroll row below `sm`.

**Hero + banners (2026-09-02):** hero size is **fixed — `aspect-16/10` mobile /
`aspect-8/3` desktop, `w-[95%] max-w-[1700px]`** (do not change; product-owner
supplies crops to fit). Banners are fitted with `object-cover`. `Slide` uses a
`<picture>` — `image` (desktop, ~2400×900) always, `imageMobile` (~1200×750)
optional for `<640px` (undefined for now → desktop image used everywhere).
Auto-advances (5s, pauses on hover/focus/hidden tab, off under reduced-motion),
whole banner clickable (no text overlaid), pagination dots overlaid slim near
the bottom, hover arrows. The **product owner supplied both crops per banner** —
`public/banners/<name>.png` (desktop 8:3, 2400×900) + `<name>-mobile.png`
(mobile 16:10, 1200×750); `Slide` uses a `<picture>` (desktop above 640px,
mobile below) and checks `img.complete` on mount. Filenames + nids in the
`public/banners/README.md` table and `HERO_BANNERS` (`image` + `imageMobile`).
Banner click-throughs → `studio.parikshe.in/details?nid=…`. The promo popup
shows the **image only** + a Close control, click-through
`…/details?nid=4785371&origin=parikshe.in` (`PROMO_POPUP`, image at
`public/promo/sslc-power-guides.png`).

**Intro section rework (2026-09-02):** `IntroAndChips` is a custom two-column
band (eyebrow + title + copy + a gold/secondary action pair + one trust line on
the left; the `SidePromoCarousel` on the right). The redundant 3-metric block
was removed (the full set lives in the "Parikshe at scale" section).
`SidePromoCarousel` now renders each banner's **16:10 mobile crop** with
`object-cover` in a 16:10 card — a clean fit (no crop, no letterbox) that sits
level with the copy. Gold glow border kept.

**Explore courses section (`ExploreCourses.tsx`, 2026-09-02):** new section
right below the hero/callback strip — one card per class (SSLC, PU 1/2 Science,
PU 1/2 Commerce, CA Foundation) with a coloured pill per product linking to
`studio.parikshe.in/details?nid=<nid>` and an "Explore courses" button to the
class listing. Data + nids in `CLASS_COURSES` (`content.ts`, product-owner list
2026-09-02).

A white **"Our Classes"** card (`ClassesStrip.tsx`) sits just below the hero
with **6 class tiles** (SSLC, PU 1/2 Science, PU 1/2 Commerce, CA Foundation —
`CLASSES`) in **rich jewel-tone gradients** (a solid dark `bg-*` for axe
contrast, with a gradient over it; white ink, dark on the gold tile), glass
icon wells, soft hover glow, icons that idle-float, staggered rise-in; compact
height, horizontal snap-scroll below `sm`. Class tiles and the "Choose your
exam or class" cards link to the studio.parikshe.in class listing pages
(`studio.parikshe.in/products?&cat=…`, supplied 2026-09-02); KCET/NEET keep
`parikshe.in/purchase/pu-science`. Free-vs-paid "Doubt solving" paid value is
"Doubt Support". The Introduction's inline category-button row was removed (now
redundant with the Classes card); its right-column `SidePromoCarousel` stays.
`@axe-core/playwright` WCAG 2.2 AA passes; `npm run verify` green.

**Delivered this block (uncommitted working tree):**

- Docs: `docs/REFERENCE_LIBRARY.md`, `docs/requirements/HOMEPAGE_REQUIREMENTS.md`,
  `docs/modules/homepage/CONTRACT.md` (new); `USER_FLOW_MAP.md`,
  `EVENT_CATALOG.md` (7 new Proposed `homepage.*` events), this file (updated).
- Code: `src/modules/homepage/**` (18 files), plus `src/app/page.tsx`,
  `page.test.tsx`, `globals.css` (Parikshe colour tokens), `vitest.setup.ts`,
  `e2e/home.spec.ts` and `public/banners/` (README + drop-in image slots). All
  14 approved sections, auto-scrolling hero carousel with the 8 supplied
  banners, chips + cards, Free-vs-Paid table (rendered once, "Limited"),
  rotating results, video-testimonial buttons, `<details>` FAQ, shared lead
  form with all 8 states, 5-second popup with the approved frequency-capping
  (`promoStorage.ts`, HP-320..HP-327), contact block with phone rendered and
  WhatsApp held pending.
- Verification: `npm run verify` passes (lint, typecheck, format, 12 unit
  tests, build → `/` prerendered static). `npm run test:e2e` passes (3 tests
  incl. `@axe-core/playwright` WCAG 2.2 AA on the full page).
- Visual check: rendered at 390px and 1440px — coherent colour layout.
- Product-owner content decisions applied (2026-09-01): phone `6366548224`
  approved and rendered; footer socials = Instagram + YouTube only (verified
  live URLs), Facebook/LinkedIn excluded; app-downloads label = "1L+";
  testimonials now synthetic/auto-generated multi-category placeholders (real
  content still to come). WhatsApp destination remains the one open contact
  item.

**Not done / deliberately deferred:** brand/hi-fi design, real lead pipeline
(idempotency, dedupe, attribution, consent records, server validation — lead
module, roadmap stage 8), analytics vendor (stage 7), FAQ structured data
(withheld until answers are approved), tablet-specific 768px tuning beyond the
responsive `sm:` breakpoint, `docs/architecture/EVENT_FLOW_MAP.md` /
`ARCHITECTURE_MAP.md` homepage nodes.

### Superseded — Figma wireframe attempt (2026-09-01)

Earlier the same day, native Figma wireframes were started in file
`i2B6xtBrfqtQGjtLtSDiGT`: 3 pages set up and a full reusable low-fi component
library built and verified, before the **Figma Starter plan's 20-MCP-calls-per-
month cap** was exhausted mid-build (popup/lead-form states and the breakpoint
frames were never built). The product owner then chose to build in code
instead, so the Figma file is **not** the source of truth for this block. If
Figma wireframes are wanted later, the plan must be upgraded (Professional +
Full/Dev seat) or the monthly cap left to reset.

**Tooling state (2026-09-01):** Figma MCP connected and verified — `whoami`
confirms account `parikshe_support@parikshe.in`; read (`get_metadata`) and
write access to the design file (fileKey `i2B6xtBrfqtQGjtLtSDiGT`) both
confirmed via a non-destructive create/delete probe. Live reference sites
(`parikshe.in`, `vedantu.com`) inspected — see `docs/REFERENCE_LIBRARY.md`.

## Completed blocks

1. **Foundation** (2026-09-01)
   - Next.js 16 (App Router, RSC, Turbopack) scaffolded in `src/` with strict
     TypeScript, ESLint 9, Tailwind v4, `@/*` alias, npm.
   - Toolchain: Prettier, Vitest + React Testing Library, Playwright +
     `@axe-core/playwright`. Sample unit + E2E/a11y tests pass.
   - Original master `CLAUDE.md` preserved verbatim at
     `docs/_archive/CLAUDE.original.md`; restructured into a ~140-line root
     `CLAUDE.md` + `.claude/rules/` (17 files) + `.claude/skills/` (25 files).
     Traceability: `docs/_archive/RESTRUCTURE_MAP.md`.
   - Mandatory `docs/` structure created; all unbuilt architecture marked
     **Proposed**.
   - Git initialized locally (branch `main`, no remote, no push).

## Decisions & assumptions

- Start as a single Next.js **modular monolith** in `src/`; `apps/*` + `packages/*`
  split is **Proposed** — see `docs/architecture/decisions/ADR-0002-*`.
- No database, auth, AWS, Cloudflare, CI, IaC or production credentials configured
  yet (deliberate — see `docs/ROADMAP.md`).
- ADRs: `ADR-0001` (record architecture decisions) accepted;
  `ADR-0002` (modular monolith + Next.js foundation) accepted.

## Active interfaces & schema versions

- HTTP API: none yet. Contract skeleton at `docs/contracts/openapi.yaml`
  (OpenAPI 3.1, no paths).
- Events: none emitted yet. Catalog seeded at `docs/contracts/EVENT_CATALOG.md`
  (all entries **Proposed**).
- Modules: none. Template at `docs/modules/_TEMPLATE/CONTRACT.md`.

## Open risks / blockers

- None blocking. Legal review of privacy design is required before any learner
  personal data is collected (tracked in `docs/ROADMAP.md`).

## Verification commands (this repo, now)

```bash
npm install
npm run lint          # ESLint (flat config)
npm run typecheck     # tsc --noEmit (strict + extra safety flags)
npm run format:check  # Prettier
npm run test          # Vitest (unit/component)
npm run test:e2e      # Playwright + axe (starts dev server)
npm run build         # next build (production)
npm run dev           # dev server on http://localhost:3000
```

`npm run verify` runs lint + typecheck + format:check + test + build.

## Next recommended action

Product owner to: (1) drop the 8 hero banner image files into `public/banners/`
per its README; (2) confirm brand assets — exact colour hex, logo SVG, typeface
(HP-601); (3) supply the WhatsApp destination (HP-203) and the remaining
pending content in `docs/requirements/HOMEPAGE_REQUIREMENTS.md` "Open items";
(4) review the colour build (`npm run dev` → <http://localhost:3000>).

On sign-off: a small implementation-hardening block for the real lead pipeline
(idempotency, dedupe, consent records, server-side validation — lead module,
roadmap stage 8) and the analytics wiring (stage 7). Do **not** start those
until the low-fi build is signed off.
