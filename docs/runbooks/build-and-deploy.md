# Runbook: build & deploy

- **Status:** Proposed — no hosting target, CI pipeline or IaC is configured.
- **Owner:** Product owner

> Status: **Proposed — not yet implemented.** This runbook describes the intended
> shape per `.claude/rules/devops.md`; fill in concrete commands when a hosting
> target is chosen (needs an ADR).

## Build

```bash
npm ci            # install from lockfile (integrity)
npm run verify    # lint + typecheck + format:check + test + build
npm run test:e2e  # E2E + accessibility
```

`npm run build` produces the Next.js production output. The intent is a single
**immutable artifact** promoted unchanged across environments, with configuration
and secrets injected per environment.

## CI gate order (Proposed)

install integrity → secret scan → lint → typecheck → unit → contract → build →
dependency/security scan → integration → accessibility → E2E → deploy checks.
A red gate blocks merge.

## Deploy (Proposed)

1. Build the immutable artifact from a tagged commit.
2. Run outstanding **backward-compatible** migrations as a separate, observable
   step (expand→contract; never destructive mid-rollout).
3. Promote via rolling / blue-green / canary per risk.
4. Watch error-rate and latency; automatic rollback triggers on regression.
5. Publish release notes.

## Rollback (Proposed)

- One command to re-promote the previous artifact (must be rehearsed —
  `.claude/skills/devops-and-sre/SKILL.md`).
- If a migration is involved, use the forward-fix or documented down-migration.
- Retain the previous deploy until the new one is confirmed healthy.

## Open decisions (see `docs/ROADMAP.md`)

- Hosting target (AWS / Cloudflare / other) + IaC tool — needs an ADR.
- CI provider and pipeline definition.
- Secret store and per-environment configuration mechanism.
- Migration tooling (with the first persistent module).
