# DevOps & environments

Consolidates original master `CLAUDE.md` section **§15**.

## Requirements

- Infrastructure and policy changes are version controlled and reviewed.
- CI stages: install integrity, secret scan, lint, typecheck, unit, contract,
  build, dependency / security scan, integration, accessibility, E2E and deployment
  checks as applicable.
- Use ephemeral **preview environments** for pull requests where affordable.
- Production deployment requires **immutable artifacts** and environment-specific
  configuration.
- Database migrations are **backward-compatible**, reviewed and separately
  observable.
- Use rolling, blue/green or canary releases according to risk.
- Feature flags default safely and have owners and expiry dates.
- Automatic rollback triggers must be defined for critical error / latency changes.
- Maintain release notes, auditability and a tested rollback command / runbook.
- Set cost budgets and alerts; tag resources by product, environment and owner.

**Never run destructive production operations** without an explicit approved plan,
verified target, backup / rollback path and recorded authorization.

## Scope note (current)

No CI pipeline, IaC, hosting target or cloud account is configured yet — all are
**Proposed** in `docs/ROADMAP.md`. Local workflow and future deploy steps live in
`docs/runbooks/`. Procedure: `.claude/skills/devops-and-sre/SKILL.md`.
