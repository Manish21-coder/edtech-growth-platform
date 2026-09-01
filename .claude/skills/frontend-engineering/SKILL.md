---
name: frontend-engineering
description: Build App Router UI — RSC-first, performant, correct state, resilient to failure and slow networks.
---

# Frontend engineering

Operationalizes the **Frontend engineer** lens, `.claude/rules/design-ux.md`,
`.claude/rules/performance.md` and `.claude/rules/accessibility.md`.

## Applicability & trigger conditions

Use when building or changing anything under `src/app/**`, `src/components/**` or
`packages/ui/**`: pages, layouts, route handlers that render UI, client components,
data fetching, forms, loading/error boundaries.

## Decision framework

1. **Server Component by default.** Add `"use client"` only for a concrete reason:
   local interactive state, browser APIs, event handlers, effects. Push client
   boundaries as far down the tree as possible.
2. **Data fetching** happens on the server (RSC / route handler). Never expose
   provider credentials or DB access to the client (`.claude/rules/architecture.md`).
3. **Every async surface has four states** designed, not improvised: loading
   (skeleton matching final geometry), empty, success, error (actionable +
   retry). Plus offline / unauthorized / rate-limited where reachable.
4. **The LCP element ships in initial HTML** and its image is never lazy-loaded
   (`.claude/rules/performance.md`).
5. **Forms preserve input** across validation errors and recoverable navigation;
   labels are persistent; errors are associated and summarised.
6. **Reserve space** for images, embeds, banners and ads to keep CLS ≤ 0.1.

## Implementation standards

- Semantic HTML, logical heading order, keyboard operable, visible focus not
  obscured by sticky surfaces.
- Consume design tokens (`.claude/rules/design-ux.md`) — no scattered hex/spacing
  literals.
- `next/image` with explicit `width`/`height` or `fill` + sized container;
  `priority` only on the LCP image.
- Defer non-critical scripts; respect consent state before loading analytics/marketing
  tags (`.claude/rules/observability.md`).
- `prefers-reduced-motion` respected; no shimmer on low-power devices.
- Client bundles stay within the route's JS budget; a new dependency needs a
  bundle-impact note.
- Type everything; no `any` on props or API responses.

## Common failure & abuse cases

- `"use client"` at the top of a route → whole subtree shipped to the browser.
- Fetching in a client `useEffect` what could be fetched on the server → waterfalls,
  flash of empty state.
- Endless spinner with no error/retry path.
- Layout shift from late-loading hero image or un-sized embed.
- Form wipes the user's input on a server validation error.
- Modal/pop-up on first paint before the visitor understands the page.
- Focus trap missing in dialogs; focus lost after route change.

## Review checklist

- [ ] Client boundary justified and minimal.
- [ ] No credentials/DB access reachable from client code.
- [ ] Loading/empty/success/error (+ offline/unauth/rate-limited) states present.
- [ ] LCP element in initial HTML; LCP image not lazy; images sized.
- [ ] Tokens used; reduced-motion respected.
- [ ] Forms: persistent labels, inline + summary errors, input preserved.
- [ ] Keyboard path + visible focus verified; dialogs trap and restore focus.
- [ ] Route JS/CSS within budget; new deps justified.

## Required tests

- Component tests (Vitest + RTL) for interaction and each state.
- Accessibility assertions in component tests + the Playwright axe check per
  new template/route.
- E2E for any critical journey touched (form submit, navigation).
- Visual regression for design-system primitives / critical templates (Proposed
  tooling — add with the block that needs it).

## Documentation requirements

- Update `docs/architecture/USER_FLOW_MAP.md` if a journey/route changed.
- Note new routes in the module `CONTRACT.md` (UI entry points & states).
- Record any new client dependency + bundle impact.

## Definition of done

- RSC-first, states complete, budgets met, a11y verified (automated + manual
  keyboard/screen-reader smoke), USER_FLOW_MAP matches the implementation.
