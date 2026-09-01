---
name: solution-architecture
description: Define system boundaries, contracts, failure modes and scale strategy for a block or module.
---

# Solution architecture

Operationalizes the **Solution architect** lens and `.claude/rules/architecture.md`.

## Applicability & trigger conditions

Use when: introducing a module or external integration; adding a data store, queue
or cache; changing a module boundary or ownership; a request implies a new service;
or non-functional requirements (scale, latency, availability) are in play. Skip for
changes fully contained within one module's existing boundary.

## Decision framework

1. **Modular monolith first.** Only extract a service when measurement proves an
   isolation, scaling, ownership or security boundary requires it — record the
   evidence in an ADR.
2. **Draw the boundary.** What does this module own (its tables, its config)? What
   does it read via interfaces? What does it never touch?
3. **Choose sync vs async.** Request/response for read-your-writes and user-facing
   correctness; events for facts other modules react to
   (`.claude/rules/events.md`). Name the source of truth.
4. **Identify failure modes** for every external call: timeout, partial failure,
   duplicate delivery, provider down. Define fallback and whether the primary
   learner action can still complete.
5. **Pick the persistence + consistency model** deliberately (transactional
   Postgres by default; cache/queue only when justified).
6. **Plan for tenancy** (tenant/brand scoping) from the start if the platform is
   multi-brand.

## Implementation standards

- Every cross-module or external call goes through an **adapter interface**; domain
  logic never imports a vendor SDK directly (`.claude/rules/architecture.md`).
- Business-critical writes that produce events use the **outbox** pattern.
- Explicit timeouts, bounded retries with jitter, and circuit breakers for unstable
  providers (`.claude/rules/api.md`).
- Configuration is validated at startup; missing required config fails fast, not at
  first request.
- Keep `docs/architecture/ARCHITECTURE_MAP.md` and `MODULE_DEPENDENCY_MAP.md`
  current; add a **proposed delta** before building and reconcile after.

## Common failure & abuse cases

- Premature microservices: distributed transactions, no measurement to justify.
- Shared database tables between modules → hidden coupling, unversioned breakage.
- Synchronous chain to a third party on the critical lead-submission path with no
  queue or fallback.
- Assuming event ordering the transport does not guarantee.
- No tenant scoping → cross-tenant data exposure.
- "Temporary" direct DB access from the UI layer.

## Review checklist

- [ ] Module boundary (owns / reads / never touches) is explicit.
- [ ] Sync vs async justified; source of truth named.
- [ ] Every external call has timeout + retry policy + fallback + circuit breaker.
- [ ] Business-critical events use an outbox.
- [ ] No cross-module table access; adapters used for vendors.
- [ ] Tenancy/authorization scoping considered.
- [ ] ARCHITECTURE_MAP + MODULE_DEPENDENCY_MAP updated with proposed → actual.
- [ ] Any new service or one-way-door choice has an ADR.

## Required tests

- Integration tests with the external dependency isolated (fake/adapter double).
- Failure-injection tests: provider timeout, 5xx, duplicate webhook.
- Contract tests for any new cross-module interface.

## Documentation requirements

- ADR for the boundary/technology/one-way-door decision.
- Updated architecture maps (with `Last verified against commit:`).
- Module `CONTRACT.md` created/updated.
- `EVENT_CATALOG.md` / `openapi.yaml` updated for new contracts.

## Definition of done

- Boundaries and contracts are documented and match the code.
- Failure behaviour is designed, implemented and tested.
- Maps and ADRs are current; no undocumented service or shared table exists.
