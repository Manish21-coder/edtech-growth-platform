---
paths:
  - "src/**/cms/**"
  - "src/**/admin/**"
  - "src/**/content/**"
  - "src/**/campaign/**"
  - "src/**/campaigns/**"
  - "src/**/publishing/**"
---

# Configurable content & campaign system

Consolidates original master `CLAUDE.md` section **§7** (admin capabilities, content
model principles, publishing pipeline). Applies to CMS, admin and campaign code.

## Admin capabilities (role-gated)

Page create / edit / duplicate / archive; structured section editor with reorder and
preview; SEO title, meta description, canonical, robots, schema and social preview;
reusable content blocks, templates and brand tokens; images, videos, FAQs,
testimonials and CTAs; top bars, hero banners, side banners, modals, exit-intent
prompts and sticky mobile CTAs; category / page / cohort / device / source / UTM
targeting; start/end schedule, timezone, priority and frequency caps; draft, review,
approval, scheduled publish and rollback; audit history showing actor, time and
before/after values; preview URLs that are unindexed and access controlled; bulk
actions across hundreds of pages with a dry-run impact summary.

## Content model principles

- Store **structured content, not arbitrary executable code**.
- Validate every block against a **versioned schema**.
- **Sanitize rich text**; restrict embeds to an allowlist.
- Separate global defaults, brand / category defaults and page overrides.
- Resolve configuration **deterministically** and show the effective configuration
  in admin.
- Protect fixed / required sections with explicit controls, not hidden conventions.
- Media records require alt text, dimensions, focal point, ownership / source and
  optimisation status.

## Publishing pipeline (safe and observable)

1. Validate content, links, media, SEO fields and permissions.
2. Create an **immutable revision**.
3. Generate a preview / diff.
4. Require approval when policy demands it.
5. Build / revalidate only affected pages when feasible.
6. Run smoke and accessibility checks.
7. Promote **atomically**.
8. Purge only affected cache keys.
9. Emit `content.published.v1` and record the audit event.
10. Retain the previous deploy for **one-click rollback**.

**Never allow partially published multi-page campaigns.** Use a release identifier
and an atomic activation time.

Related: `security.md` (untrusted admin HTML, uploads), `accessibility.md`,
`technical-seo` skill. Procedure: `.claude/skills/cms-and-admin-systems/SKILL.md`.
