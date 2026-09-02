# Homepage requirements & traceability

- **Status:** Proposed (approved for wireframing; not yet approved for
  high-fidelity design or code)
- **Owner:** Product owner (parikshe_support@parikshe.in)
- **Source:** `docs/assets/reference/PARIKSHE WEBSITE — HOMEPAGE RESTRUCTURING & CONTENT UPDATE.pdf`
  (14 pages) + product-owner decisions recorded in chat on 2026-09-01 + live
  inspection of `parikshe.in` and `vedantu.com` (see `docs/REFERENCE_LIBRARY.md`).
- **Scope:** Homepage only. Category/SEO landing pages, checkout, auth, CRM and
  any backend are explicitly out of scope for this block.

Every requirement below carries an ID (`HP-xxx`) referenced from Figma frame
annotations and, later, from implementation tickets. **Unverified** = factual
claim not yet confirmed by the product owner; must not be presented as final
in any design or copy.

## 1. Sections (approved order)

| ID     | Section                                      | Notes                                                                                                                                    |
| ------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| HP-010 | Header & responsive navigation               | Retain existing structure per PDF §3.1; no major nav changes proposed                                                                    |
| HP-020 | Hero banner carousel                         | New — current site has a static hero, no carousel (confirmed live)                                                                       |
| HP-030 | Introduction + category chips + App CTA      | Chips only, **not** full cards — see HP-031                                                                                              |
| HP-040 | Why Choose Parikshe                          | Refinement of 6 existing feature cards (confirmed live), new icon/ribbon treatment                                                       |
| HP-050 | Exam/Category Discovery (full cards)         | Canonical, single place for full category browsing — see HP-031                                                                          |
| HP-060 | Parikshe at Scale                            | Stats-on-imagery; maps to existing "Trusted By Students" section, restyled                                                               |
| HP-070 | Parikshe App                                 | Existing design largely retained per PDF §3.7/3.10                                                                                       |
| HP-080 | Study Resources (Guidebook / YouTube / Paid) | New section                                                                                                                              |
| HP-090 | Free YouTube vs Paid Parikshe                | **One reusable component, shown once** — see HP-091                                                                                      |
| HP-100 | Category-wise Results                        | Rotating, manual override; PDF's "Our Students' Achievements" exists today but detail not confirmed live                                 |
| HP-110 | Student Stories / Testimonials               | Build uses synthetic/auto-generated multi-category placeholder stories; product owner supplies the real cross-category content pre-hi-fi |
| HP-120 | FAQ                                          | Existing 6 Q&A confirmed live — refine, do not invent from nothing                                                                       |
| HP-130 | Contact & footer                             | See HP-200s for contact-detail requirements                                                                                              |
| HP-140 | 5-second promotional popup                   | Cross-cutting, not a page section — see HP-300s                                                                                          |
| HP-150 | Lead-capture entry points                    | Cross-cutting — see HP-400s                                                                                                              |

### Key decisions

- **HP-031** — Introduction (HP-030) uses lightweight category **chips** only.
  Exam/Category Discovery (HP-050) is the **one** canonical place with full
  cards (description + Explore Now). Do not duplicate full category cards in
  both sections. _(Product-owner decision, 2026-09-01.)_
- **HP-091** — Free-vs-Paid comparison (PDF §3.2 and §3.9 were near-duplicate
  content) is **one reusable component**, rendered once on the homepage.
  "Doubt Solving" row under Free YouTube reads **"Limited"**, not "No".
  _(Product-owner decision, 2026-09-01.)_
- **HP-032** — Categories (final, extensible list): SSLC, PU1 Science,
  PU2 Science, PU1 Commerce, PU2 Commerce, KCET, NEET, CA Foundation.
  **Note:** the live site currently shows only "PUC Science" / "PUC Commerce"
  (not split by year) — the PU1/PU2 split is a genuine expansion beyond
  today's site, confirmed intentional by the product owner. Components must
  be built generically so a 9th category can be added without redesign.

## 2. Contact & footer requirements — all Pending unless marked

| ID     | Field                | Value                                                                                                                                | Status                                                                                                                 |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| HP-201 | Support email        | `contactus@parikshe.in`                                                                                                              | **Approved** (matches live site)                                                                                       |
| HP-202 | Support phone        | `6366548224`                                                                                                                         | **APPROVED** by product owner 2026-09-01 (PDF's `9686390808` rejected). Rendered as a `tel:` link.                     |
| HP-203 | WhatsApp destination | Live site links to a Google Form flagged as broken. Included on the homepage by product-owner decision, destination not yet supplied | **Pending Product-Owner Verification** — labelled placeholder, no URL invented. When supplied, set `CONTACT.whatsapp`. |
| HP-204 | Instagram            | `https://www.instagram.com/sslc_parikshe/` (verified live 2026-09-01)                                                                | **APPROVED** for the homepage footer (product owner: "Instagram/YouTube/WhatsApp only")                                |
| HP-205 | YouTube              | `https://www.youtube.com/@SSLCPARIKSHE` (verified live 2026-09-01)                                                                   | **APPROVED** for the homepage footer                                                                                   |
| HP-206 | Facebook             | Live: `facebook.com/people/Parikshe/61551451795629/`                                                                                 | **Excluded from the v1 homepage** (product-owner decision 2026-09-01)                                                  |
| HP-207 | LinkedIn             | Live: `linkedin.com/company/parikshe`                                                                                                | **Excluded from the v1 homepage** (product-owner decision 2026-09-01)                                                  |
| HP-208 | Physical address     | Live: "Ground Floor, A Wing, Indiqube Alpha, Kadubeesanahalli, Bengaluru 560103"                                                     | **Approved for removal from homepage** (PDF §3.12, confirmed present live)                                             |

## 3. Metrics & claims — all Unverified

Per product-owner decision, current-site values may be used in wireframes for
**realistic placeholder length only**, always labelled, never presented as
approved:

| ID     | Metric (as observed live, 2026-09-01)                                                                        | Status                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| HP-301 | "3.5M+ Students"                                                                                             | Observed on current website — verification required                             |
| HP-302 | App downloads — label standardised to **"1L+"** (product-owner decision 2026-09-01; "100K+" wording dropped) | Value still Observed on current website — verification required; label resolved |
| HP-303 | "5549+ Lectures"                                                                                             | Observed on current website — verification required                             |
| HP-304 | "4.8/5" Play Store rating, "1.44K Reviews"                                                                   | Observed on current website — verification required                             |
| HP-305 | Category-wise results (SSLC / PUC Science / PUC Commerce, per PDF §3.10)                                     | No data supplied — placeholder only                                             |

## 4. Banner requirements (PDF §3.2–3.3)

| ID     | Banner type               | Creative status                       |
| ------ | ------------------------- | ------------------------------------- |
| HP-401 | Product banner            | Need Creative (per PDF)               |
| HP-402 | Offering/ecosystem banner | Need Creative                         |
| HP-403 | App banner                | Need Creative                         |
| HP-404 | Student/scale banner      | Need Creative                         |
| HP-405 | Free vs Paid banner       | Need Creative (uses HP-091 component) |
| HP-406 | Festive/offer banner      | Need Creative                         |

Every banner type carries the configurable field set from the approved
product-owner brief: desktop/mobile creative, headline/support text, CTA
label + target URL, category/product association, campaign + UTM metadata,
start/end date, priority/order, active flag. Wireframes use grey, clearly
labelled placeholders — **no creative is invented.**

## 5. Popup requirements (product-owner decision, 2026-09-01)

| ID     | Rule                                                                                                                                                                                                                                                                                                            |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HP-320 | Eligible after 5 seconds on the homepage                                                                                                                                                                                                                                                                        |
| HP-321 | ~~Maximum once per browsing session~~ — **SUPERSEDED 2026-09-02:** product owner requires the popup to **re-show every 10 minutes** while the visitor is on the site. Flag for the anti-dark-pattern review (`lead-conversion.md`) — mitigations kept: obvious labelled close, Esc, focus return, no countdown. |
| HP-322 | ~~24 hours~~ — **SUPERSEDED 2026-09-02:** hidden for **10 minutes** after a dismissal (matches the repeat cadence).                                                                                                                                                                                             |
| HP-323 | If a lead is successfully submitted, suppress lead-gen popups for 30 days on that browser                                                                                                                                                                                                                       |
| HP-324 | A banner click alone does **not** count as a completed conversion                                                                                                                                                                                                                                               |
| HP-325 | Purchase-based suppression — **Proposed for later**; blocked on auth/purchase-state integration not yet selected                                                                                                                                                                                                |
| HP-326 | All values above must be admin-configurable in the eventual implementation                                                                                                                                                                                                                                      |
| HP-327 | Escape-key dismissal, focus trap + return, visible close (icon + label), mobile = bottom sheet / desktop = centered modal, never covers primary nav, lazy-loaded creative, fails safe (no render) if config/image fails                                                                                         |

## 6. Lead-capture requirements (v1 scope only)

| ID     | Entry point                                          |
| ------ | ---------------------------------------------------- |
| HP-410 | Request a Callback / Course Counselling              |
| HP-411 | Course-interest enquiry                              |
| HP-412 | WhatsApp/contact CTA (destination = HP-203, Pending) |

**HP-413** — these three may share **one configurable lead form**.
**HP-414** — gated downloads / resource-download forms are **explicitly out of
scope** for this block (product-owner decision).

Required wireframe states for the shared lead form: default, focused,
validation-error, submitting, success, failure, duplicate-submission,
consent/privacy-notice (per `.claude/rules/lead-conversion.md` and
`.claude/rules/design-ux.md`).

## 7. FAQ (v1 scope)

**HP-120** — concise homepage FAQ, addressing real student/parent objections
(pricing structure, free-vs-paid rationale, live class access, refund/trial
policy) and supporting SEO intent without keyword stuffing. The live site's
existing 6 Q&A pairs are a starting point for content refinement, not final
copy — final questions/answers are Proposed pending product-owner content
review.

## 8. Non-functional requirements (carried from `.claude/rules/`)

| ID     | Requirement                                                                                                                       | Source                                          |
| ------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| HP-500 | Mobile-first; one primary CTA per decision area                                                                                   | `design-ux.md`                                  |
| HP-501 | WCAG 2.2 AA — semantic structure, keyboard operation, visible focus not obscured by sticky surfaces, non-colour status indicators | `accessibility.md`                              |
| HP-502 | LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (p75); no lazy-loaded LCP image; reserved banner/carousel dimensions                           | `performance.md`                                |
| HP-503 | Progressive lead form, normalized dedupe, first/latest/conversion-touch attribution, raw UTM preserved                            | `lead-conversion.md`                            |
| HP-504 | No dark patterns, fake urgency, pre-checked consent or misleading close controls (popup, banners)                                 | `lead-conversion.md`, product-owner instruction |
| HP-505 | Versioned analytics events per `docs/contracts/EVENT_CATALOG.md`; analytics failure never blocks the primary action               | `events.md`                                     |

## Resolved by product owner — 2026-09-01

1. **Footer social links:** Instagram + YouTube only. Facebook and LinkedIn
   excluded from the v1 homepage. (HP-204/205 approved, HP-206/207 excluded.)
2. **Support phone (HP-202):** `6366548224` — approved.
3. **App-downloads metric label (HP-302):** standardise on **"1L+"**.
4. **Cross-category testimonials (HP-110):** the product owner has the real
   stories; the build now uses clearly-labelled **synthetic / auto-generated**
   placeholder testimonials spanning SSLC / PU2 Science / NEET / PU2 Commerce /
   CA Foundation until the real content is supplied.

## Colour pass — brand assets (HP-600s)

| ID     | Item                                            | Status                                                                                                                                                                                                                                                   |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HP-600 | 8 hero banner image files                       | Content transcribed into `HERO_BANNERS`; **image files still pending** — drop into `public/banners/` (see README); branded fallback shown meanwhile                                                                                                      |
| HP-601 | Brand colours / logo / typeface                 | **From parikshe.in:** gold `#ffcc5b`, gold-text `#8a5a00`, ink text `#0f172a` (slate); **Poppins** throughout; favicon replaced. Light theme only (no dark mode). Header/footer use a `PARiKSHE` wordmark. Confirm canonical.                            |
| HP-602 | Banner CTA + category destinations              | **Confirmed 2026-09-02:** `parikshe.in/purchase/<slug>` — sslc / pu-science / pu-commerce given by product owner; kcet / neet / ca-foundation follow the pattern, **pending confirmation**. Hero banners + intro buttons + category cards all link here. |
| HP-603 | Dedicated 5-second-popup creative + destination | **Pending** — popup currently reuses the first hero banner                                                                                                                                                                                               |
| HP-604 | App-store links + app rating + screenshot       | Play Store URL, rating (4.8/5, 1.44K reviews) and phone mockup taken from parikshe.in; **iOS App Store link not on the current site — pending**                                                                                                          |

## Open items still requiring product-owner input

1. **WhatsApp destination (HP-203)** — still not supplied. Placeholder shown on
   the homepage; provide the number/URL (likely a `https://wa.me/…` link).
2. Real testimonial content + consent to publish (HP-110); verified metric
   values (HP-301..HP-305); category page URLs; guidebook links.
3. FAQ answers (HP-120) — final objection/SEO copy for review.
4. Brand assets — see HP-600s above.

## Change process

Add a new `HP-xxx` row whenever a new fact, decision or open question surfaces.
Never delete a row — mark it Superseded with a date and link to the decision
that replaced it. Cross-reference from Figma frame annotations using the ID.
