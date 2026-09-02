# Reference library

External sites and documents used as design/content inspiration or source material.
Not authoritative for facts about Parikshe unless explicitly marked verified —
cross-reference `docs/requirements/HOMEPAGE_REQUIREMENTS.md` for traceability.

## Live websites

### Parikshe (existing site) — source of current brand/content context

- **URL:** <https://www.parikshe.in/>
- **Purpose:** current production site being restructured. Source for existing
  copy, contact details, categories, metrics claims — **not automatically
  authoritative**; every fact taken from it is marked "Observed on current
  website — verification required" until the product owner confirms it.
- **Accessed:** 2026-09-01 (live fetch, this session; a prior attempt the same
  day was blocked by a temporary sandbox network outage).
- **Access method:** automated fetch (page converted to text; no visual/CSS
  inspection, no JS-rendered-only content guaranteed captured).
- **Key observations (see requirements doc for full detail and requirement IDs):**
  header/nav, static single-hero (no existing carousel), 6 "Why Choose Parikshe"
  cards, existing 6-item FAQ, app-promotion section, 3 SSLC-only testimonials,
  footer contact block (email, phone, address, social links), WhatsApp icon
  linking to a Google Form.
- **Limitations:** single automated fetch of rendered text; did not exercise
  interactive elements (menus, forms, popups); mobile rendering not inspected
  separately; content may have changed since access date.

### Vedantu — design/UX reference only

- **URL:** <https://www.vedantu.com/>
- **Purpose:** inspiration for information hierarchy, category discovery
  patterns, responsive behaviour, conversion mechanics. **Not a content or
  brand source.** Do not copy copyrighted text, imagery, branding or exact
  visual composition — see `.claude/rules/authority-and-workflow.md` §1 and the
  product owner's explicit instruction.
- **Accessed:** 2026-09-01 (live fetch, this session).
- **Access method:** automated fetch (page converted to text).
- **Key patterns observed:** chip/tab-based category discovery with cards
  underneath, persistent header phone CTA, price-anchored course tiers
  (out of scope for Parikshe v1), large SEO resource footer, no popups/sticky
  bars detected in this fetch (inconclusive — JS-rendered elements may not
  appear in a static-text fetch).
- **Limitations:** same as above; additionally, dynamic/JS-only UI (modals,
  popups, carousels) is unlikely to be fully represented in an automated
  text fetch — treat absence-of-evidence claims about Vedantu as inconclusive,
  not confirmed.

## Source documents

### Homepage restructuring brief (PDF)

- **Path:** `docs/assets/reference/PARIKSHE WEBSITE — HOMEPAGE RESTRUCTURING & CONTENT UPDATE.pdf`
- **Purpose:** primary requirements source for the Homepage Design block.
- **Status:** product-owner-authored input document; content treated as
  **Proposed** until confirmed (per product-owner instruction), except where
  cross-checked against the live site or explicitly approved in chat.
- **Traceability:** every section maps to one or more requirement IDs in
  `docs/requirements/HOMEPAGE_REQUIREMENTS.md`.

## Change process

Add an entry here whenever a new external reference (site, document, dataset)
is used as input to a design or content decision. Record access date, method,
purpose and limitations — never treat an unverified external source as fact
without a corresponding requirement-doc note.
