# Runbook: local development

- **Status:** Active
- **Owner:** Product owner

## Prerequisites

- Node.js 20.11+ (repo developed on v24). npm 10+.
- No database, cloud account or secrets are needed yet.

## Setup

```bash
npm install
npx playwright install chromium   # one-time, for E2E/a11y tests
```

## Everyday commands

```bash
npm run dev            # http://localhost:3000 (Turbopack)
npm run lint           # ESLint (flat config)
npm run typecheck      # tsc --noEmit (strict + extra safety flags)
npm run format         # Prettier write
npm run format:check   # Prettier check (CI-style)
npm run test           # Vitest unit/component
npm run test:watch     # Vitest watch mode
npm run test:e2e       # Playwright + axe (auto-starts dev server)
npm run build          # production build
npm run verify         # lint + typecheck + format:check + test + build
```

## Environment variables

None required. Copy `.env.example` to `.env.local` when a module introduces one.
`.env`, `.env.local` and `.env.*` are git-ignored — never commit real values.

## Before opening a PR

1. `npm run verify` is green.
2. `npm run test:e2e` is green (or note if the browser could not be installed).
3. Affected `docs/` maps updated; unbuilt design marked `Proposed`.
4. `docs/PROJECT_STATE.md` updated.
5. Self-review with `.claude/skills/code-review/SKILL.md`.

## Troubleshooting

| Symptom                                                   | Fix                                                                                                                                                         |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next build` warns about a lockfile in the home directory | `next.config.ts` already pins `turbopack.root`; ensure you run commands from the project root.                                                              |
| Playwright cannot download Chromium                       | Re-run `npx playwright install chromium`; if offline, E2E can't run — say so, don't mark verified.                                                          |
| Prettier check fails in CI but not locally                | Run `npm run format` and commit; ensure editor isn't reformatting on save with different settings (`.editorconfig` + `.prettierrc.json` are authoritative). |
