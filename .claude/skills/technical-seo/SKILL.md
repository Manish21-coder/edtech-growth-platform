---
name: technical-seo
description: Make campaign/SEO pages crawlable and indexable — server HTML, canonical, metadata, structured data, sitemaps.
---

# Technical SEO

Operationalizes `.claude/rules/content-campaign.md` (SEO fields in the publishing
pipeline) and `.claude/rules/performance.md` (CWV is a ranking input).

## Applicability & trigger conditions

Use when: building public landing/course/SEO pages; changing routing, URLs or
pagination; adding the CMS SEO editor; setting robots/canonical/hreflang; or
generating sitemaps and structured data.

## Decision framework

1. **Core content in server HTML.** Anything that must be indexed is
   server-rendered or static — not injected by client JS
   (`.claude/rules/architecture.md`).
2. **One canonical URL per page.** Decide trailing slash, casing, and parameter
   handling once; redirect variants with 301; set `<link rel="canonical">`.
3. **Index vs noindex** deliberately: preview URLs, faceted duplicates, thin
   campaign variants and internal admin are `noindex` and access-controlled.
4. **Metadata is data**, edited in the CMS with validation: title, meta
   description, canonical, robots, Open Graph/Twitter, and JSON-LD schema type.
5. **URLs are stable contracts.** Changing a public URL requires a 301 and a note;
   never silently break inbound links.
6. **Internationalization** (if in scope): `hreflang` reciprocity, locale-specific
   canonicals.

## Implementation standards

- Use the framework metadata API for title/description/canonical/OG per route;
  no duplicate or missing `<title>`.
- `robots.txt` and XML sitemaps generated from the published set; sitemaps exclude
  noindex/preview URLs and update on publish.
- JSON-LD (`Course`, `FAQPage`, `BreadcrumbList`, `Organization`) matches visible
  content; validate against schema.org.
- Semantic headings (one `h1`), descriptive link text, `alt` on meaningful images.
- Pagination uses crawlable links; infinite scroll has a paginated fallback.
- 404 returns 404, 410 for removed; soft-404s avoided.
- Performance budgets met (`.claude/skills/web-performance/SKILL.md`).

## Common failure & abuse cases

- Landing page content rendered client-side → indexed as near-empty.
- Every UTM/campaign variant indexable → duplicate-content dilution.
- Canonical pointing to the wrong or a redirecting URL.
- Preview/staging URLs indexed and access-open.
- Structured data claiming ratings/prices not shown on the page (spam risk).
- URL slug changed on republish with no redirect → 404s + lost rankings.
- Sitemap lists noindex or 404 URLs.

## Review checklist

- [ ] Indexable content present in server HTML.
- [ ] Exactly one self-referencing canonical; variants 301'd.
- [ ] robots/noindex correct for preview, facets, thin variants, admin.
- [ ] Title/description/OG/Twitter present, unique, CMS-validated.
- [ ] JSON-LD matches visible content and validates.
- [ ] Sitemaps + robots.txt regenerate on publish and exclude noindex.
- [ ] URL changes carry 301s; 404/410 correct.
- [ ] CWV budgets pass.

## Required tests

- Rendered-HTML test: key content + metadata present without JS.
- Canonical/robots assertions per template.
- Structured-data validation in CI (Proposed — add with the SEO block).
- Redirect tests for changed URLs (301, single hop).
- Sitemap generation test (excludes noindex/preview).

## Documentation requirements

- SEO field schema documented in the content module `CONTRACT.md`.
- Redirect map maintained in `docs/` (or config) with reasons.
- `docs/architecture/USER_FLOW_MAP.md` reflects public entry routes.

## Definition of done

- Indexable pages are server-rendered with unique validated metadata and one
  canonical; non-indexable surfaces are noindex + protected; sitemaps/robots are
  publish-driven; URL changes are redirected; CWV budgets pass.
