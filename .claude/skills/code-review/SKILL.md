---
name: code-review
description: Review a diff against the contract — correctness, security, privacy, a11y, performance, scope, and the maps.
---

# Code review

Operationalizes step 7 of the block lifecycle
(`.claude/rules/authority-and-workflow.md`) and all `.claude/rules/`. This is the
gate before "done".

## Applicability & trigger conditions

Use on every diff before merge/handoff, and when reviewing someone else's PR. Scale
depth to risk: a copy tweak is light; anything touching auth, money, PII, consent,
events, migrations or publish/rollback gets a full pass.

## Decision framework

1. **Does it match the block proposal?** Scope, non-goals, acceptance criteria. Flag
   anything extra ("while I was here…") — accidental scope expansion fails the
   block.
2. **Correctness first.** Walk the happy path, then each failure path: timeouts,
   duplicates, empty/large inputs, concurrent access, permission denied.
3. **Cross-cutting lenses** (from `authority-and-workflow.md`): security, privacy,
   accessibility, performance, observability, events/contracts. Each new
   boundary/field/event triggers its rule.
4. **Contracts & maps.** If a route/module boundary/API/event/data owner/role/state/
   journey changed, the matching `docs/` file must change in the same diff.
5. **Tests prove the change.** Right layers, deterministic, regression test for any
   bug fixed, critical journeys have E2E.

## Implementation standards (what to actually check)

- No secrets, tokens, PII, debug logs, `TODO`-bypasses, commented-out code, or
  `only`/`skip` in tests.
- Input validated at the boundary; output encoded; parameterized SQL; authz per
  object + tenant; idempotency keys on retryable mutations.
- Events: past-tense, versioned, outbox for critical, consumer idempotent, no PII
  in envelope; `EVENT_CATALOG.md` updated.
- UI: RSC-first, all states present, tokens used, keyboard + focus + axe,
  LCP/CLS safe.
- Privacy: new fields in `DATA_INVENTORY.md` with purpose + retention; consent
  separated; no PII in URLs/logs/analytics.
- Migrations: backward-compatible, reversible/forward-fix, indexes justified.
- Diff hygiene: unrelated files untouched, formatting via Prettier not by hand,
  types not loosened (`any`, `@ts-ignore`) to pass checks.

## Common failure & abuse cases (reviewer blind spots)

- Approving because CI is green — CI doesn't check authz logic, PII in events, or
  map drift.
- Missing an IDOR because only the happy path was read.
- Letting "small" scope creep in unreviewed.
- Not noticing a public event's shape changed in place.
- Accepting a skipped test with no issue link.
- Rubber-stamping a migration without checking rollout safety.
- Overlooking a new third-party script's bundle/consent impact.

## Review checklist

- [ ] Matches proposal; no scope creep; non-goals respected.
- [ ] Happy + failure paths correct; concurrency/idempotency handled.
- [ ] Security: validation, encoding, authz, secrets, SSRF, webhook verification.
- [ ] Privacy: inventory updated, consent separated, no PII leakage.
- [ ] A11y: semantics, keyboard, focus, contrast, axe pass.
- [ ] Performance: budgets, LCP/CLS, bundle impact of new deps.
- [ ] Events/APIs: versioned, catalogued, `openapi.yaml` current.
- [ ] Affected `docs/` maps + `PROJECT_STATE.md` updated in this diff.
- [ ] Tests: right layers, deterministic, regression added, E2E for critical paths.
- [ ] No debug logs / bypasses / disabled tests / loosened types.

## Required tests

- Confirm the author's tests fail without the change and pass with it (spot-check).
- Run `npm run verify` and `npm run test:e2e` locally or confirm CI did.
- For security/privacy-relevant diffs, confirm the specific abuse-case tests exist.

## Documentation requirements

- Record the review outcome and any unresolved concerns in the PR/handoff (don't
  pretend a lens passed).
- Ensure the block handoff lists changed files, verification evidence, migrations,
  risks and the next block.

## Definition of done

- The diff matches the proposal, passes every applicable rule's checklist, updates
  the affected contracts and maps, is proven by appropriate deterministic tests,
  and carries no secret/bypass/PII/scope-creep. Unresolved concerns are written
  down, not waved through.
