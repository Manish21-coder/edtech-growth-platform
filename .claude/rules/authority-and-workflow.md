# Authority & working method

Consolidates the original master `CLAUDE.md` sections **§0 (purpose & authority)**,
**§2 (build in blocks)**, **§2.4 (block proposal template)**, **§16 (definition of
done)**, **§17 (Claude operating rules)** and **§17.1 (required expertise modes)**.
Nothing here is optional. Verbatim archive: `docs/_archive/CLAUDE.original.md`.

## Purpose and authority

This repository builds a production-grade, modular EdTech web application focused on
lead generation, learner engagement, conversion, attribution, campaign execution and
data extraction. These rules are the operating contract for Claude and every
contributor.

Follow instructions in this priority order:

1. Explicit instructions from the product owner in the current task.
2. The root `CLAUDE.md` and the files in `.claude/rules/`.
3. Approved architecture decision records (ADRs) and module contracts.
4. Existing repository conventions.
5. Framework defaults and general best practice.

Never silently override a higher-priority instruction. If requirements conflict,
pause and document the conflict and a recommended resolution before proceeding.

## Required working method: build in blocks

Development proceeds in bounded, reviewable blocks. Never attempt the entire
platform, or a large generic framework with no working user journey, in one
unreviewable change. **Only one block may be `IN_PROGRESS` at a time** (tracked in
`docs/PROJECT_STATE.md`).

### Block lifecycle

1. **Read context** — root `CLAUDE.md`, applicable `.claude/rules/`,
   `docs/PROJECT_STATE.md`, relevant ADRs, the module `CONTRACT.md`,
   `docs/contracts/EVENT_CATALOG.md` and `docs/contracts/openapi.yaml`.
2. **Define outcome** — user outcome, scope, non-goals, acceptance criteria, risks,
   dependencies.
3. **Inspect first** — read existing code, tests and configuration before proposing
   changes. Prefer existing components, patterns and dependencies.
4. **Design** — data model, permission rules, API changes, events, UI states,
   failure behaviour, observability.
5. **Implement vertically** — deliver the smallest end-to-end working slice, not
   disconnected layers.
6. **Verify** — types, lint, unit, integration, accessibility, security and relevant
   end-to-end tests. Never claim a test, deployment or review passed without
   evidence.
7. **Review** — inspect the diff for security, privacy, performance, accessibility
   and accidental scope expansion.
8. **Record** — update `PROJECT_STATE.md`, event/API documentation, ADRs and
   remaining work.
9. **Map** — update and verify every affected architecture, user-flow, event-flow
   and dependency diagram (see `documentation-and-maps.md`).
10. **Handoff** — changed files, verification evidence, migrations, deployment
    notes, risks and the next recommended block.

### Block proposal template (produce before material implementation)

```markdown
## Block: <name>

Outcome:
Scope:
Non-goals:
Affected modules:
Data changes:
API changes:
Events produced/consumed:
Maps/diagrams affected:
Proposed diagram delta:
Permissions/privacy:
UI states:
Failure and rollback plan:
Acceptance criteria:
Verification plan:
```

## Definition of done

A feature or block is done only when **all** of the following hold:

- acceptance criteria are met;
- permission and privacy rules are implemented and tested;
- loading, empty, success and failure states exist;
- APIs and events are documented and schema-validated;
- telemetry and alerts are appropriate;
- tests pass at the required layers (see `testing.md`);
- accessibility and performance budgets pass (see `accessibility.md`, `performance.md`);
- migrations and rollback are verified;
- documentation and `docs/PROJECT_STATE.md` are updated;
- affected architecture, user-flow, event-flow and dependency maps match the
  implemented code;
- no secrets, temporary bypasses, debug logs or unresolved critical findings remain.

## Claude operating rules

Claude must:

- begin each task by reading the relevant persisted context;
- ask focused questions only when an unanswered choice materially changes
  architecture, security, data or UX; otherwise state assumptions and proceed with
  the smallest safe block;
- inspect before editing and preserve unrelated changes;
- prefer existing components, patterns and dependencies;
- explain material trade-offs in plain language;
- never claim a test, deployment or review was completed without evidence;
- never fabricate APIs, credentials, schemas, results or requirements;
- never weaken security, privacy, accessibility or tests merely to make a check pass;
- stop when credentials, production authority, destructive action or legal/product
  approval is required;
- leave the repository in a buildable, documented and resumable state.

## Required expertise modes

For every block, explicitly review the work through each relevant lens. These are
responsibilities, not fictional independent approvals — record unresolved concerns
rather than pretending a lens passed.

- **Product manager** — outcome, scope and success measurement.
- **Solution architect** — boundaries, contracts, scale and failure modes.
- **UX designer** — journey, responsive behaviour, content and states.
- **UI / design-system engineer** — tokens, consistency and visual quality.
- **Accessibility specialist** — WCAG and assistive technology.
- **Frontend engineer** — rendering, state, performance and browser behaviour.
- **Backend / API engineer** — domain integrity, APIs, concurrency and idempotency.
- **Data / event engineer** — schemas, lineage, attribution and replay.
- **Security engineer** — threat model and abuse cases.
- **Privacy reviewer** — minimisation, consent, retention and minors.
- **QA engineer** — risk-based test coverage.
- **SRE / DevOps engineer** — observability, release, rollback and cost.

Each lens has a matching procedure in `.claude/skills/`.
