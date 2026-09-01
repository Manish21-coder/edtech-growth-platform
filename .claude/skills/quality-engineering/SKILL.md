---
name: quality-engineering
description: Choose risk-based test coverage across layers; keep tests deterministic, outcome-focused and non-flaky.
---

# Quality engineering

Operationalizes the **QA engineer** lens and `.claude/rules/testing.md`.

## Applicability & trigger conditions

Use when: planning a block's verification; adding/altering a feature; a bug is
found; tests are flaky or slow; or deciding what _not_ to test.

## Decision framework

1. **Risk-based.** Coverage is proportional to blast radius: money, PII, consent,
   auth, publish/rollback, and data integrity get the deepest testing.
2. **Right layer for the risk.** Domain rule → unit. Component interaction/state →
   component. Cross-module/API shape → contract/integration. Critical user journey
   → E2E. Design primitive → visual regression.
3. **Test outcomes, not internals.** Assert observable behaviour and public
   contracts; refactors shouldn't break good tests.
4. **Determinism.** Injected clock, seeded factories, no reliance on network,
   time-of-day, or test order. A flaky test is a bug to fix, not to retry.
5. **A skipped required test blocks the block** unless there's an approved issue
   with an owner and a date.

## Implementation standards

- Vitest + RTL for unit/component (`src/**/*.{test,spec}.tsx`); Playwright + axe
  for E2E/a11y (`e2e/**`). `npm run verify` gates lint + types + format + unit +
  build.
- Deterministic factories/builders for domain objects; never production PII in
  fixtures.
- Each critical journey (lead submit, consent, campaign click, publish/rollback,
  checkout handoff, admin permissions) has at least one E2E happy path + one
  failure path.
- Bug fixes ship with a regression test that fails without the fix.
- Keep the suite fast: parallelizable, no shared mutable state, tagged slow tests.
- Contract tests assert API/event payloads against `openapi.yaml` /
  `EVENT_CATALOG.md`.

## Common failure & abuse cases

- Testing implementation details (spying on private methods) → brittle suite.
- `await sleep(500)` instead of awaiting a condition → flake.
- Shared DB/state between tests → order-dependent failures.
- "Coverage %" chased with assertion-free tests.
- Critical path (payment/consent) has only unit tests, no E2E.
- Flaky test quarantined and forgotten.
- Fixtures seeded with real exported user data.

## Review checklist

- [ ] Coverage matches risk; high-risk paths tested at multiple layers.
- [ ] Tests assert outcomes/contracts, not internals.
- [ ] Deterministic: injected clock, seeded data, no network/order coupling.
- [ ] Critical journeys have E2E happy + failure paths.
- [ ] New/changed API/event has a contract test.
- [ ] Every bug fix has a failing-without-fix regression test.
- [ ] No unexplained `skip`/`only`; skips have an issue + owner + date.
- [ ] Suite runs in CI within budget; no new flake.

## Required tests

- The layers above, selected by risk, all green in `npm run verify` +
  `npm run test:e2e`.
- Accessibility automation on new templates/routes.
- (Proposed, add with the relevant block) contract tests, visual regression,
  load/perf tests, migration/backup-restore rehearsals.

## Documentation requirements

- Block's **verification plan** lists exact commands and what each proves.
- `docs/PROJECT_STATE.md`: the current verification commands.
- Module `CONTRACT.md`: tests & acceptance criteria.
- Note any deferred test with its tracking issue.

## Definition of done

- Risk-appropriate tests exist at the right layers, are deterministic and
  outcome-focused, run green in CI, cover critical journeys end to end, include a
  regression test for every fixed bug, and any deferral is tracked with an owner
  and date.
