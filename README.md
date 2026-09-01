# EdTech Growth Platform

A production-grade, modular EdTech web application for lead generation, learner
engagement, conversion, attribution, campaign execution and reporting.

> **Status:** Foundation only. No product features are implemented yet.
> See [`docs/PROJECT_STATE.md`](./docs/PROJECT_STATE.md) for the current block and
> [`docs/ROADMAP.md`](./docs/ROADMAP.md) for what comes next.

## Stack

- Next.js 16 (App Router, React Server Components, Turbopack)
- TypeScript (strict, with additional safety flags)
- Tailwind CSS v4
- ESLint 9 (flat config) + Prettier
- Vitest + React Testing Library (unit/component)
- Playwright + axe-core (E2E + accessibility)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command                           | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `npm run dev`                     | Start the dev server                             |
| `npm run build`                   | Production build                                 |
| `npm run lint`                    | ESLint                                           |
| `npm run typecheck`               | `tsc --noEmit`                                   |
| `npm run format` / `format:check` | Prettier write / check                           |
| `npm run test` / `test:watch`     | Vitest                                           |
| `npm run test:e2e`                | Playwright (starts the dev server automatically) |
| `npm run verify`                  | lint + typecheck + format:check + test + build   |

## Working in this repository

This project is governed by a written contract. Before any change:

1. Read [`CLAUDE.md`](./CLAUDE.md) — the operating contract (authority, workflow,
   Definition of Done).
2. Read the applicable rules in [`.claude/rules/`](./.claude/rules/) — universal
   rules load always; path-scoped rules apply to matching files.
3. Follow the relevant procedure in
   [`.claude/skills/<skill>/SKILL.md`](./.claude/skills/).
4. Keep [`docs/`](./docs/) — architecture maps, contracts, ADRs — in sync with the
   code. Unbuilt design is labelled **Proposed**.

## Documentation

- Architecture: [`docs/architecture/`](./docs/architecture/)
- API & event contracts: [`docs/contracts/`](./docs/contracts/)
- Decisions (ADRs): [`docs/architecture/decisions/`](./docs/architecture/decisions/)
- Security threat model: [`docs/security/THREAT_MODEL.md`](./docs/security/THREAT_MODEL.md)
- Privacy data inventory: [`docs/privacy/DATA_INVENTORY.md`](./docs/privacy/DATA_INVENTORY.md)
- Runbooks: [`docs/runbooks/`](./docs/runbooks/)
