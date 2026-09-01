# Module contract: <module-name>

- **Status:** Proposed | Active | Deprecated
- **Owner:** <name / role>
- **Created:** YYYY-MM-DD · **Last verified against commit:** <hash>
- **Related:** ADR-XXXX, diagrams it affects, roadmap stage

Fill every section before the module is marked Active. "TBD" is only acceptable
with a linked tracking issue. Governed by
`.claude/rules/product-and-modules.md` and `.claude/skills/module-design/SKILL.md`.

## 1. Purpose

One paragraph: the single responsibility of this module and the user/business
outcome it owns. If there are two unrelated responsibilities, split the module.

## 2. Public interfaces

Functions / types / routes other modules or the app may call. This is the stable
surface — everything else is private.

## 3. Configuration schema and defaults

Versioned schema, safe defaults, and the deterministic resolution order
(global → brand/category → override). Note how the effective config is shown in
admin.

## 4. Roles and permissions

Which roles can do what. Deny-by-default; enforced server-side.

## 5. Data owned and data read

- **Owns (exclusive):** tables/collections only this module writes.
- **Reads (via interface/events):** data from other modules — never direct table
  access.

## 6. Events produced and consumed

| Direction | Event | Version | Notes                    |
| --------- | ----- | ------- | ------------------------ |
| produces  | `…`   | v1      | outbox? classification?  |
| consumes  | `…`   | v1      | idempotency key strategy |

Cross-reference `docs/contracts/EVENT_CATALOG.md`.

## 7. Synchronous APIs used / exposed

Endpoints exposed (link to `docs/contracts/openapi.yaml`) and external/internal
APIs consumed (with timeout, retry, circuit-breaker policy).

## 8. UI entry points and states

Routes/components and the designed states: empty, loading, partial, success,
error, offline, unauthorized, rate-limited.

## 9. Dependencies and integration adapters

Shared packages and other modules depended on; vendor adapters (CRM/ESP/payment/
storage) with credential scope.

## 10. Idempotency and retry behaviour

Idempotency keys, dedupe store, retry/backoff policy, DLQ handling, reconciliation
against authoritative state.

## 11. Monitoring and alerts

Metrics, thresholds, dashboards, and the runbook each alert links to
(`docs/runbooks/`).

## 12. Tests and acceptance criteria

Required test layers for this module and the measurable acceptance criteria.

## 13. Rollout, migration and rollback plan

Feature flag, migration order (expand→contract), backfill, and the one-command
rollback path.

## 14. Privacy

Personal-data fields handled → link each to `docs/privacy/DATA_INVENTORY.md`
(purpose, legal basis, retention, deletion). Consent dependencies. Minors
considerations.
