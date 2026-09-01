---
name: module-design
description: Design a single module's contract — interfaces, config, data ownership, events, permissions, rollout.
---

# Module design

Operationalizes `.claude/rules/product-and-modules.md` (Modular design contract).
Every module must have `docs/modules/<module>/CONTRACT.md`.

## Applicability & trigger conditions

Use when: creating a new module; splitting or merging modules; adding a public
interface, config option, event or permission to an existing module; or a module's
data ownership changes. Not needed for internal refactors that keep the contract
identical.

## Decision framework

1. **One reason to change.** If the module has two unrelated responsibilities,
   split it.
2. **Public surface = the contract.** Everything else is private. Keep the public
   interface minimal and stable; internal types are free to change.
3. **Data ownership is exclusive.** The module owns a set of tables; no other module
   reads or writes them directly — expose a query interface or emit events.
4. **Configuration** has a versioned schema, safe defaults, and a deterministic
   resolution order (global → brand/category → override) shown in admin.
5. **Degrade safely.** If an optional dependency (CRM, email, enrichment) is down,
   the module's core action still succeeds and reconciles later.
6. **Rollout is part of design** — flag, migration order, backfill, rollback.

## Implementation standards

- Fill every section of `docs/modules/_TEMPLATE/CONTRACT.md`: purpose & owner;
  public interfaces; config schema & defaults; roles & permissions; data owned /
  read; events produced / consumed; sync APIs used / exposed; UI entry points &
  states; dependencies & adapters; idempotency & retry; monitoring & alerts; tests
  & acceptance criteria; rollout / migration / rollback.
- Communicate with other modules only through explicit interfaces or events.
- Permissions are deny-by-default and enforced server-side
  (`.claude/rules/security.md`).
- Add the module to `docs/architecture/MODULE_DEPENDENCY_MAP.md` with allowed and
  prohibited edges.

## Common failure & abuse cases

- "Utils" / "core" module that everything depends on and no one owns.
- Reaching into another module's table "just for a join".
- Config with no schema → invalid combinations reach production.
- Optional integration on the hard path → learner action fails when vendor fails.
- Events emitted for UI details rather than domain facts.
- Circular module dependencies.

## Review checklist

- [ ] `CONTRACT.md` complete, every section filled (no "TBD" without an issue link).
- [ ] Single responsibility; public surface minimal.
- [ ] Exclusive data ownership; no foreign table access.
- [ ] Config schema versioned; defaults safe; resolution deterministic.
- [ ] Permissions deny-by-default, server-enforced.
- [ ] Safe degradation path defined and tested.
- [ ] MODULE_DEPENDENCY_MAP updated; no new cycle.
- [ ] Rollout + rollback plan present.

## Required tests

- Unit tests for the module's domain rules and config resolution.
- Contract tests for each public interface.
- Permission tests (allowed vs denied roles).
- Degradation test: dependency unavailable → core action still succeeds.
- Event schema + idempotency tests for produced/consumed events.

## Documentation requirements

- `docs/modules/<module>/CONTRACT.md` created/updated.
- `MODULE_DEPENDENCY_MAP.md` and `ARCHITECTURE_MAP.md` updated.
- `EVENT_CATALOG.md` / `openapi.yaml` updated for new contracts.
- ADR if the module boundary is a one-way door.

## Definition of done

- The contract file is complete and matches the implementation.
- Boundaries, permissions and degradation are tested.
- Dependency map has no prohibited edge or cycle introduced.
