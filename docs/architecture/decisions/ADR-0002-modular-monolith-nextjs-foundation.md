# ADR-0002: Modular monolith on Next.js as the project foundation

- **Status:** Accepted
- **Date:** 2026-09-01
- **Deciders:** Product owner
- **Related:** `.claude/rules/architecture.md`, `docs/architecture/ARCHITECTURE_MAP.md`, `docs/ROADMAP.md`

## Context

The Foundation block must stand up a production-grade base without building product
features. The master contract mandates: TypeScript strict, Next.js App Router, RSC
by default, `src/` directory, `@/*` alias, ESLint, Tailwind, Turbopack, npm. It also
describes a future `apps/*` + `packages/*` layout and "modular monolith first;
extract services only when measurement proves a boundary is needed."

## Options considered

1. **Single Next.js app in `src/` now; monorepo split Proposed.** Matches the
   mandated `create-next-app` options exactly; lowest ceremony; modules are bounded
   folders inside `src/`. Extract to `apps/*`/`packages/*` when measurement
   justifies it.
2. **Set up the `apps/*` + `packages/*` npm-workspace monorepo now.** Closer to the
   long-term target, but adds tooling and indirection before any module exists and
   diverges from a plain `create-next-app` layout.
3. **A different framework / meta-framework.** Contradicts the master contract.

## Decision

Adopt **option 1**. Initialize a single Next.js 16 application in the current
folder via `create-next-app` with: TypeScript (strict + `noUncheckedIndexedAccess`,
`noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`,
`forceConsistentCasingInFileNames`), ESLint 9 flat config, Tailwind v4, App Router,
`src/` directory, Turbopack, npm, `@/*` → `./src/*`.

The `apps/*` + `packages/*` monorepo split remains **Proposed** in
`ARCHITECTURE_MAP.md`; moving to it will be its own ADR, triggered by a measured
need (independent deploy cadence, scaling, security or ownership boundary).

### Dev toolchain added in this block (product-owner approved)

| Dependency                                                                    | Why it is not "unnecessary"                                                                                                                        |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prettier`, `prettier-plugin-tailwindcss`, `eslint-config-prettier`           | Deterministic formatting is a CI gate in `.claude/rules/devops.md`; the plugin orders Tailwind classes; the config stops ESLint/Prettier fighting. |
| `vitest`, `@vitejs/plugin-react`, `jsdom`                                     | Unit/component test layer required by `.claude/rules/testing.md`.                                                                                  |
| `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom` | Outcome-focused component testing (RTL) per `.claude/rules/testing.md`.                                                                            |
| `@playwright/test`, `@axe-core/playwright`                                    | E2E + automated accessibility layer required by `.claude/rules/testing.md` and `.claude/rules/accessibility.md`.                                   |

Deliberately **not** added now: Husky/lint-staged, CI YAML, visual-regression
tooling, `@mermaid-js/mermaid-cli`, any database/ORM/auth/cloud SDK — all tracked
as Proposed in `docs/ROADMAP.md`.

## Consequences

- Positive: matches the mandated setup; fast to build on; modules stay simple;
  one build, one deploy target.
- Negative: a future monorepo migration will require moving code and wiring
  workspaces — cost is moderate and bounded because module boundaries are enforced
  from day one via `MODULE_DEPENDENCY_MAP.md`.
- One-way door? No. The boundary rules make the split mechanical later.
- `next.config.ts` pins `turbopack.root` to the project dir to avoid a stray
  parent-directory lockfile being picked up.

## Compliance

`npm run verify` + `npm run test:e2e` are green. `ARCHITECTURE_MAP.md` shows the
current single-app topology as Implemented and the split as Proposed. Any code that
reaches across a module boundary fails `.claude/skills/code-review/SKILL.md`.
