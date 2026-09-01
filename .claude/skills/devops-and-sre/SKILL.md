---
name: devops-and-sre
description: Ship via reviewed IaC and CI gates; immutable artifacts, safe migrations, progressive delivery, tested rollback.
---

# DevOps & SRE

Operationalizes the **SRE / DevOps engineer** lens and `.claude/rules/devops.md`.

> Status: Proposed — no CI, IaC, hosting target or cloud account is configured
> yet. Apply this skill from the block that introduces each capability. Do not add
> production credentials or provider config without an approved plan.

## Applicability & trigger conditions

Use when: setting up CI/CD; choosing/hosting infrastructure; adding a migration to
the deploy path; introducing feature flags, environments, or release strategy;
defining SLOs, budgets or rollback automation.

## Decision framework

1. **Everything as code, reviewed.** Pipelines, infra, policies, dashboards,
   alerts — in the repo, changed via PR.
2. **CI is the quality gate**, ordered: install integrity → secret scan → lint →
   typecheck → unit → contract → build → dependency/security scan → integration →
   accessibility → E2E → deploy checks. A red gate blocks merge.
3. **Immutable artifacts + external config.** Build once, promote the same artifact
   through envs; configuration and secrets come from the environment.
4. **Migrations are backward-compatible** and run as an observable, separate step
   (expand→contract; never a destructive change mid-rollout).
5. **Progressive delivery** by risk: rolling → blue/green → canary. Define
   automatic rollback triggers on error-rate/latency regression.
6. **Separate accounts** for dev/staging/prod, with distinct credentials and cost
   tags (product/env/owner).

## Implementation standards

- Preview environment per PR where affordable; teardown on merge/close.
- Release notes + a tagged, reproducible artifact + a tested one-command rollback
  runbook per deploy.
- Feature flags default safe, have an owner and an expiry, and are removed after
  rollout (`.claude/skills/growth-experimentation/SKILL.md`).
- Secret scanning in CI and pre-commit; secrets only in the managed store.
- Backups automated with **tested** restoration; documented RPO/RTO.
- Cost budgets + alerts; resources tagged.
- **Never** run destructive production operations without an approved plan,
  verified target, backup/rollback path and recorded authorization.

## Common failure & abuse cases

- Config baked into the image → separate build per environment, drift.
- Migration drops a column in the same release the code stops using it → errors on
  old instances during rollout.
- No rollback rehearsal → "rollback" fails during a real incident.
- CI without a secret scan → key leaked to registry/logs.
- Canary with no automatic abort → bad release rides to 100%.
- Shared prod/staging account → test job mutates prod data.
- Feature flags accumulate; no one knows which are load-bearing.
- Backups exist but restore was never tested.

## Review checklist

- [ ] Pipeline/infra/alerts changed via reviewed code.
- [ ] CI gate order present; red blocks merge; secret scan included.
- [ ] One immutable artifact promoted across envs; config/secrets external.
- [ ] Migration backward-compatible, observable, with rollback/forward-fix.
- [ ] Release strategy chosen by risk; auto-rollback triggers defined.
- [ ] Preview env + teardown; release notes + rollback runbook.
- [ ] Dev/staging/prod isolated; resources tagged; cost alerts set.
- [ ] Backup + tested restore; RPO/RTO documented.

## Required tests

- Pipeline dry-run / self-test on a scratch branch.
- Migration up + rollback (or forward-fix) rehearsal on realistic data.
- Rollback drill: deploy N, deploy N+1, roll back to N, verify.
- Restore drill from backup into a clean environment.
- Canary abort test: inject regression → auto-rollback fires.

## Documentation requirements

- `docs/runbooks/`: deploy, rollback, restore, on-call basics.
- ADR for hosting/CI/release-strategy choices with versions/dates.
- `docs/architecture/ARCHITECTURE_MAP.md`: environments and infra boundaries.
- `docs/PROJECT_STATE.md`: current environments and verification commands.
- `docs/ROADMAP.md`: remaining DevOps capabilities as Proposed.

## Definition of done

- Delivery is via reviewed code with an ordered CI gate; artifacts are immutable
  and config-external; migrations and releases are safe and reversible with
  rehearsed rollback and restore; environments and credentials are separated;
  runbooks and ADRs exist.
