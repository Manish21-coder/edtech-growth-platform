---
name: web-performance
description: Hit Core Web Vitals budgets on mid-range mobile — LCP in HTML, no CLS, bounded JS, deferred third parties.
---

# Web performance

Operationalizes the **Frontend engineer** lens and `.claude/rules/performance.md`.
Targets at p75: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**.

## Applicability & trigger conditions

Use when: building a public page/template; adding an image/video/embed/third-party
script; adding a client dependency; a route's bundle grows; or field/lab metrics
regress.

## Decision framework

1. **Budget the route first.** Set JS, CSS, image and third-party byte budgets for
   the route in CI before adding to it.
2. **LCP path:** the hero/first meaningful section renders from server HTML; its
   image is sized and `priority`, never lazy. Preload the LCP resource if it's
   discovered late.
3. **CLS:** reserve exact dimensions for every image, ad, banner, embed and
   font-swap area. Skeletons match final geometry.
4. **INP:** keep the main thread free — minimal client JS, break up long tasks,
   avoid heavy hydration; prefer server components and CSS over JS.
5. **Third parties are opt-in and deferred**, gated on consent state; measure each
   one's cost and assign an owner.
6. **Ship less:** code-split by route, tree-shake, avoid large date/util/icon libs,
   prefer platform APIs.

## Implementation standards

- `next/image` with explicit dimensions; modern formats; responsive `sizes`.
- Fonts: `font-display: swap` with a matched fallback metric to avoid shift;
  self-host or use `next/font`.
- Defer non-critical scripts (`next/script` `lazyOnload`/`worker` where suitable);
  no render-blocking third-party JS.
- Prefetch only high-probability navigations.
- Immutable assets: long cache + content hash.
- Client component boundaries pushed down; no "use client" at route root.

## Common failure & abuse cases

- LCP image lazy-loaded or injected by client JS → LCP > 4 s on 4G.
- Marketing tag manager loaded eagerly in `<head>` → INP and TBT blow up.
- Un-sized embed/ad slot → CLS spike when it loads.
- Importing a 100 KB library for one helper.
- Skeleton geometry differs from content → shift when content arrives.
- Font swap with mismatched fallback metrics → visible reflow.
- Prefetching every link on the page → wasted bandwidth on mobile.

## Review checklist

- [ ] Route byte budgets defined and enforced in CI.
- [ ] LCP element in server HTML; LCP image sized + priority + not lazy.
- [ ] All media/embeds/ads have reserved dimensions.
- [ ] Client JS minimal; no root `"use client"`; long tasks split.
- [ ] Third-party scripts deferred + consent-gated + owned + measured.
- [ ] Fonts use swap + matched fallback.
- [ ] New dependency has a bundle-impact note and owner.

## Required tests

- Lighthouse (mobile preset) on the route in CI against the budget (Proposed CI —
  wire with the performance block; run locally meanwhile).
- Bundle-size check per route (fail on budget breach).
- CLS assertion in a Playwright test for key templates.
- Field monitoring (RUM) once analytics exists — track p75 LCP/INP/CLS.

## Documentation requirements

- Record route budgets in `docs/` (or CI config) and reference them in the module
  `CONTRACT.md`.
- Note any third-party script added, its purpose, cost and owner.
- `docs/PROJECT_STATE.md`: current p75 metrics once measurable.

## Definition of done

- The route meets the p75 budgets in lab (and field once available); LCP/CLS/INP
  hazards above are addressed; budgets are codified; new third parties are
  justified, deferred and owned.
