# Module contract: homepage

- **Status:** Proposed
- **Owner:** Product owner (parikshe_support@parikshe.in)
- **Created:** 2026-09-01 · **Last verified against commit:** 6766fc3
- **Related:** `docs/requirements/HOMEPAGE_REQUIREMENTS.md`,
  `docs/architecture/USER_FLOW_MAP.md` (Homepage discovery journeys),
  `docs/contracts/EVENT_CATALOG.md` (`page.viewed`, `cta.clicked`,
  `campaign.*`, `lead.*` rows), roadmap stage 9 (configurable campaign
  surfaces)

## 1. Purpose

Own the public homepage: a configurable, responsive landing experience that
explains what Parikshe offers, routes visitors to the right exam/category,
surfaces trust signals, and captures leads — without coupling to any single
campaign, product or category. Built as reusable sections/components so
category and SEO landing pages (a later module) can reuse them.

## 2. Public interfaces

Low-fidelity implementation lives in `src/modules/homepage/`. The route `/`
renders `Homepage`. Component surface: `SiteHeader`, `HeroCarousel`,
`IntroAndChips`, `WhyChoose`, `CategoryDiscovery`, `ScaleStats`, `AppPromo`,
`StudyResources`, `FreeVsPaid`, `ResultsCarousel`, `StudentStories`,
`HomepageFaq`, `SiteFooter`, `LeadCaptureForm` / `LeadCaptureCta` (shared
across the three v1 entry points), `PromoPopup`. Content is a flat
`content.ts` module today; a later CMS/admin block owns it as structured,
versioned, admin-editable config. Components are grayscale and
content-driven — designed for reuse on future category/SEO pages.

## 3. Configuration schema and defaults

Proposed, not yet implemented. Config surfaces: banner set (type, creative
refs, headline/support text, CTA label + URL, category/product association,
UTM metadata, start/end date, priority, active flag — see
`docs/requirements/HOMEPAGE_REQUIREMENTS.md` §4); popup rules (dwell time,
session/dismissal/conversion suppression windows — §5, all admin-configurable
per HP-326); category list (extensible, not hardcoded to 8 — HP-032); FAQ
entries; results per category. Resolution order and admin surface: Proposed,
deferred to the implementation block.

## 4. Roles and permissions

Proposed. Anonymous visitors: read-only + lead submission. Admin (future):
configure banners/popup/categories/FAQ/results — deny-by-default, per
`.claude/rules/security.md`. No auth provider selected yet (roadmap stage 4).

## 5. Data owned and data read

- **Owns (exclusive, once built):** homepage-specific config (banner set,
  popup rules, FAQ content, results snapshots) — content records, not raw
  learner PII.
- **Reads (via interface/events):** lead-capture submissions go through the
  lead module's interface (not yet built) rather than this module writing
  lead data directly; category/course metadata read from the future
  course-discovery module, not duplicated here.

## 6. Events produced and consumed

| Direction | Event                                                                               | Version            | Notes                                                                  |
| --------- | ----------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------- |
| produces  | `page.viewed`                                                                       | v1                 | homepage as `page_id`                                                  |
| produces  | `cta.clicked`                                                                       | v1                 | hero, category, app, guidebook, WhatsApp CTAs — `cta_id` distinguishes |
| produces  | `campaign.impression_recorded`                                                      | v1                 | hero banner viewed                                                     |
| produces  | `campaign.clicked`                                                                  | v1                 | hero banner clicked                                                    |
| produces  | `homepage.category_selected.v1`                                                     | v1 (new, Proposed) | category chip/card interaction                                         |
| produces  | `homepage.popup_eligible.v1` / `.viewed` / `.clicked` / `.dismissed` / `.converted` | v1 (new, Proposed) | 5-second popup lifecycle, HP-140/HP-320–327                            |
| produces  | `homepage.testimonial_video_played.v1`                                              | v1 (new, Proposed) |                                                                        |
| consumes  | `lead.submitted`                                                                    | v1                 | to suppress lead-gen popups for 30 days post-submission (HP-323)       |

Cross-reference `docs/contracts/EVENT_CATALOG.md`. New event rows are
**Proposed** — not implemented, not yet schema-validated.

## 7. Synchronous APIs used / exposed

None yet. Lead form submission will call the (not-yet-built) lead module's
API per `docs/contracts/openapi.yaml` — Proposed.

## 8. UI entry points and states

Route: `/` (public homepage). Implemented states: lead form — default,
focused, validation-error (with focus-managed summary), submitting, success,
failure, duplicate-submission, consent/privacy-notice
(`LeadCaptureForm.tsx`). Popup — suppressed/hidden, visible (desktop modal /
mobile bottom sheet), dismissed, converted-suppressed (`PromoPopup.tsx`,
`promoStorage.ts`). Carousels — reduced-motion (no autoplay), manual
navigation. Deferred: offline, rate-limited (need the real lead pipeline).
Journey diagram: `docs/architecture/USER_FLOW_MAP.md`.

## 9. Dependencies and integration adapters

None selected yet. Future: CRM adapter (lead sync — vendor TBD, needs an ADR and
a DPA before any data flows, per `.claude/rules/privacy.md`); app-store deep
links (Play Store / App Store — URLs Pending per requirements HP-070).

## 10. Idempotency and retry behaviour

Lead form submission: Proposed to use an idempotency key per
`.claude/rules/lead-conversion.md` — deferred to the implementation block.

## 11. Monitoring and alerts

Proposed: Core Web Vitals per route (`.claude/rules/performance.md`), banner
carousel render/fallback rate, popup eligibility/conversion funnel, lead-form
submission success/failure rate. No telemetry backend configured yet
(`.claude/rules/observability.md` scope note).

## 12. Tests and acceptance criteria

Deferred to the implementation block's test plan
(`.claude/rules/testing.md`). Acceptance criteria for the **design** phase are
in `docs/requirements/HOMEPAGE_REQUIREMENTS.md` and the wireframe review
checklist recorded in `docs/PROJECT_STATE.md`.

## 13. Rollout, migration and rollback plan

Not applicable yet — no implementation exists. Will be defined in the
implementation block per `.claude/rules/devops.md`.

## 14. Privacy

Lead-capture fields (HP-410–413) are minimal-necessary and not yet finalized
(product-owner instruction: do not finalize fields, consent language, CRM
integrations, APIs or storage until approved). Once fields are drafted, add
them to `docs/privacy/DATA_INVENTORY.md` with purpose, legal basis, retention
and deletion method before implementation. Marketing consent must be captured
separately from the enquiry itself (`.claude/rules/privacy.md`,
`lead-conversion.md`). No minors-specific profiling/targeting is in scope for
this block.
