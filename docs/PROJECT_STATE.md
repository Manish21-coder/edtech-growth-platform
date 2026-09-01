# Project state

_Concise, always-current. Update at the end of every block. Do not rely on chat
memory for anything here._

Last updated: 2026-09-01

## Current block

| Field  | Value                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| Block  | **Foundation** — repository foundation, tooling, instruction/rules/skills restructure, documentation baseline |
| Status | `DONE`                                                                                                        |
| Owner  | Product owner (parikshe_support@parikshe.in)                                                                  |

No block is currently `IN_PROGRESS`. The next block must be proposed using the
template in `.claude/rules/authority-and-workflow.md`.

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

Propose **delivery stage 1 — Discovery**: domain glossary, success metrics, and the
first module family to target (candidate: SEO/campaign landing pages + a lead-form
vertical slice). Use `.claude/skills/product-strategy/SKILL.md`.
