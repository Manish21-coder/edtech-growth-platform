# Testing strategy

Consolidates original master `CLAUDE.md` section **§14** (test layers, test quality
rules). Every feature must have tests proportionate to its risk.

## Test layers

- **Unit** — domain rules, targeting, validation and transformations.
- **Component** — interaction, responsive states and accessibility.
- **API contract & integration** — using isolated dependencies.
- **Event** — schema, compatibility, idempotency and replay.
- **End-to-end** — critical journeys: lead submission, consent, campaign click,
  publish/rollback, checkout handoff and admin permissions.
- **Visual regression** — design-system primitives and critical templates.
- **Accessibility** — automation plus manual keyboard / screen-reader checks.
- **Performance** — budgets and Lighthouse / field monitoring.
- **Security** — authorization, injection, XSS, CSRF, SSRF, rate limits and webhook
  replay.
- **Operational** — migration, backup-restore and rollback rehearsals.

## Test quality rules

- Test **outcomes, not private implementation details**.
- No flaky retry-as-a-fix — identify and remove the cause.
- Use deterministic factories and clocks.
- Never use production PII in fixtures.
- Critical bug fixes require a regression test.
- A block is incomplete if required tests are skipped without an approved issue,
  owner and deadline.

## Tooling in this repository

- **Vitest** + React Testing Library — unit / component (`src/**/*.{test,spec}.tsx`).
- **Playwright** + `@axe-core/playwright` — E2E + accessibility (`e2e/**`).
- Commands: `npm run test`, `npm run test:e2e`, `npm run verify`.
- Visual regression, contract testing and load testing are **Proposed** (see
  `docs/ROADMAP.md`); add them with the blocks that need them.

Procedure: `.claude/skills/quality-engineering/SKILL.md`.
