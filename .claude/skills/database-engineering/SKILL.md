---
name: database-engineering
description: Schema design, reviewed migrations, indexing, and safe data changes on transactional Postgres.
---

# Database engineering

Operationalizes `.claude/rules/architecture.md` (Postgres + type-safe ORM,
reviewed migrations) and `.claude/rules/devops.md` (backward-compatible
migrations).

## Applicability & trigger conditions

Use when: adding or changing a table/column/index/constraint; writing a migration;
introducing a new data store; planning a backfill; or changing data retention.

> Status: Proposed — no database is provisioned yet. Apply this skill from the
> block that introduces persistence.

## Decision framework

1. **Ownership.** Each table belongs to exactly one module
   (`.claude/skills/module-design/SKILL.md`). Cross-module reads go through an
   interface, not a foreign `JOIN`.
2. **Normalize first**, denormalize only with a measured read problem and a
   consistency plan.
3. **Keys.** Prefer surrogate keys (UUID/ULID) for external exposure; never expose
   sequential internal IDs in URLs or analytics (`.claude/rules/privacy.md`).
4. **Constraints in the database** — not-null, unique, foreign keys, checks — are
   the last line of correctness; keep them even with app-level validation.
5. **Expand → migrate → contract** for every breaking change: add new
   nullable/parallel structure, backfill, switch reads/writes, then remove the old
   structure in a later release.
6. **Index deliberately** from real query patterns; every index has a write-cost
   and a reason.

## Implementation standards

- Migrations are versioned, reviewed, reversible where feasible, and separately
  observable (timing, lock waits).
- No long-held locks on hot tables: create indexes concurrently, add columns
  without volatile defaults, batch backfills.
- PII columns are documented in `docs/privacy/DATA_INVENTORY.md` with retention +
  deletion method; add deletion/anonymization jobs where required.
- Encryption at rest enabled; column-level encryption/tokenization for the most
  sensitive fields.
- Use the ORM's parameterized queries; no string-built SQL.
- Seed/factory data is synthetic — never production PII.

## Common failure & abuse cases

- `ALTER TABLE` that rewrites or long-locks a large hot table in a deploy.
- Dropping a column in the same release that stops writing it → old app instances
  error mid-rollout.
- Backfill in one transaction → lock storm, replication lag.
- Missing unique constraint → duplicate leads despite app dedupe.
- Sequential IDs leaked in URLs enabling enumeration.
- Index added "just in case" on every column → write amplification.
- Retention undefined → PII kept forever.

## Review checklist

- [ ] Table owned by one module; no cross-module raw access.
- [ ] Expand/contract steps; backward-compatible within a rollout.
- [ ] Constraints (nn/unique/fk/check) present.
- [ ] Indexes justified by real queries; created concurrently.
- [ ] Backfill batched and observable.
- [ ] External IDs are non-sequential.
- [ ] PII documented in DATA_INVENTORY with retention + deletion.
- [ ] Migration reviewed, reversible/rollback path stated.

## Required tests

- Migration up + down (or forward-fix) rehearsal on a realistic dataset.
- Constraint tests: duplicates/nulls rejected.
- Query performance check on representative volume for new access paths.
- Backfill idempotency (safe to re-run).
- Backup + restore rehearsal when introducing a new store.

## Documentation requirements

- ERD in `docs/architecture/` (template in `diagrams/TEMPLATES.md`) updated.
- `docs/privacy/DATA_INVENTORY.md` updated for any personal-data column.
- Module `CONTRACT.md`: data owned / data read.
- Migration notes + rollback in the block handoff and a runbook if operationally
  significant.

## Definition of done

- Schema change is owned, constrained, indexed on evidence, rolled out
  expand→contract, migration rehearsed both directions, PII inventoried with
  retention, ERD and contracts updated.
