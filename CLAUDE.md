# EdTech Growth Platform — Operating Contract

This file is the root operating contract for Claude and every contributor. It is
deliberately short. **Detailed requirements live in `.claude/rules/`** (loaded
automatically by Claude Code — universal rules always, path-scoped rules when you
touch matching files). **Task procedures live in `.claude/skills/<skill>/SKILL.md`.**
The full, unabridged original master instructions are preserved verbatim at
`docs/_archive/CLAUDE.original.md`; the mapping of every original clause to its new
home is `docs/_archive/RESTRUCTURE_MAP.md`.

## 1. Authority & instruction priority

Follow instructions in this order; never silently override a higher priority. If
requirements conflict, pause and document the conflict and a recommended resolution.

1. Explicit product-owner instructions in the current task.
2. This file and `.claude/rules/`.
3. Approved ADRs (`docs/architecture/decisions/`) and module contracts
   (`docs/modules/<module>/CONTRACT.md`).
4. Existing repository conventions.
5. Framework defaults and general best practice.

## 2. Product purpose

Build **one configurable, modular platform** for lead generation, learner
engagement, conversion, attribution, campaign execution and reporting — where
independent modules are added without rewriting the foundation. Do not couple the
core to a single campaign, product, course, cohort, provider or page type.

Every meaningful module action must be able to: emit a versioned domain/analytics
event; consume authorized events; call documented internal/external APIs where
required; be configured via an admin interface when configuration is a product
requirement; expose observable success/failure states; and degrade safely when an
optional integration is unavailable.

Full detail: `.claude/rules/product-and-modules.md`.

## 3. Universal workflow — build in blocks

Work in bounded, reviewable blocks. **Only one block is `IN_PROGRESS` at a time**
(tracked in `docs/PROJECT_STATE.md`). Never ship a large generic framework with no
working user journey. Before material implementation, produce the block proposal
(template in `.claude/rules/authority-and-workflow.md`).

Block lifecycle: **read context → define outcome → inspect existing code → design
(data, permissions, API, events, UI states, failure, observability) → implement the
smallest vertical slice → verify (types, lint, unit, integration, a11y, security,
e2e) → review the diff → record (PROJECT_STATE, contracts, ADRs) → update every
affected map/diagram → handoff (changed files, evidence, migrations, risks, next
block).**

## 4. Context-reading order (start every task here)

1. This file.
2. Applicable `.claude/rules/` (universal + any path-scoped for files you will
   touch).
3. `docs/PROJECT_STATE.md` — current block, decisions, verification commands, next
   action.
4. Relevant ADR(s), the module `CONTRACT.md`, `docs/contracts/EVENT_CATALOG.md`,
   `docs/contracts/openapi.yaml`.
5. The relevant `.claude/skills/<skill>/SKILL.md` procedure(s).

## 5. Rules index (`.claude/rules/`)

| File                        | Scope                                  | Covers (original §)                                                                                                          |
| --------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `authority-and-workflow.md` | universal                              | authority, block lifecycle & proposal, Definition of Done, Claude operating rules, expertise lenses (§0, §2, §2.4, §16, §17) |
| `product-and-modules.md`    | universal                              | product vision, module contract, delivery sequence (§1, §4, §18)                                                             |
| `architecture.md`           | universal                              | default architecture, repo boundaries (§3, §3.1)                                                                             |
| `events.md`                 | universal                              | event rules, envelope, delivery guarantees (§5)                                                                              |
| `performance.md`            | universal                              | Core Web Vitals budgets, loading, skeletons (§9)                                                                             |
| `accessibility.md`          | universal                              | WCAG 2.2 AA (§10.3)                                                                                                          |
| `security.md`               | universal                              | OWASP ASVS L2 controls, untrusted content (§11)                                                                              |
| `privacy.md`                | universal                              | data governance, consent, minors (§12)                                                                                       |
| `observability.md`          | universal                              | logs, traces, metrics, analytics integrity (§13)                                                                             |
| `testing.md`                | universal                              | test layers & quality rules (§14)                                                                                            |
| `devops.md`                 | universal                              | environments, CI stages, releases, rollback (§15)                                                                            |
| `documentation-and-maps.md` | universal                              | mandatory docs, living maps, diagram rules (§2.2, §2.3)                                                                      |
| `reference-baselines.md`    | universal                              | ASVS, WCAG, OpenAPI, CloudEvents, CWV, OTel (§19)                                                                            |
| `api.md`                    | paths: API routes / OpenAPI            | contract-first API standards (§6)                                                                                            |
| `content-campaign.md`       | paths: cms/admin/campaign              | admin, content model, publishing pipeline (§7)                                                                               |
| `lead-conversion.md`        | paths: lead/forms/checkout/attribution | lead capture, attribution, anti-dark-pattern (§8)                                                                            |
| `design-ux.md`              | paths: `.tsx`/`.css`/components/ui     | design tokens, experience rules (§10.1, §10.2)                                                                               |

## 6. Skills index (`.claude/skills/<name>/SKILL.md`)

Invoke the matching skill when starting that class of work. Each skill has:
applicability & triggers, decision framework, implementation standards, failure &
abuse cases, review checklist, required tests, documentation requirements,
definition of done.

`product-strategy` · `solution-architecture` · `module-design` ·
`frontend-engineering` · `backend-engineering` · `api-design` ·
`event-architecture` · `database-engineering` · `ui-ux-design` · `design-systems` ·
`accessibility` · `web-performance` · `technical-seo` · `cms-and-admin-systems` ·
`lead-generation-and-conversion` · `growth-experimentation` ·
`analytics-and-attribution` · `security-engineering` ·
`privacy-and-edtech-data-governance` · `quality-engineering` · `devops-and-sre` ·
`observability` · `code-review` · `incident-response` ·
`documentation-maps-and-diagrams`

## 7. Definition of done (essentials)

Full checklist in `.claude/rules/authority-and-workflow.md`. A block is done only
when: acceptance criteria met; permission & privacy rules implemented and tested;
loading/empty/success/failure states exist; APIs and events documented and
schema-validated; telemetry and alerts appropriate; required test layers pass;
accessibility and performance budgets pass; migrations and rollback verified;
`docs/PROJECT_STATE.md` and affected maps updated to match the code; no secrets,
temporary bypasses, debug logs or unresolved critical findings remain.

## 8. Mandatory documentation update

Any change that alters a **route, module boundary, API, event, data owner, external
integration, role, state transition or user journey** MUST update the affected file
under `docs/` **in the same block** — otherwise the block is incomplete. Unbuilt
design MUST be labelled **`Proposed`**; never describe planned components as
implemented. Persist architectural decisions as ADRs, not in chat.

## 9. Claude operating rules (summary)

Begin by reading persisted context. Ask focused questions only when an unanswered
choice materially changes architecture, security, data or UX; otherwise state
assumptions and proceed with the smallest safe block. Inspect before editing;
preserve unrelated changes; prefer existing components and dependencies. Never claim
a test, deploy or review passed without evidence. Never fabricate APIs, credentials,
schemas or results. Never weaken security, privacy, accessibility or tests to make a
check pass. Stop when credentials, production authority, destructive action or
legal/product approval is required. Leave the repository buildable, documented and
resumable. Review every block through the expertise lenses in
`.claude/rules/authority-and-workflow.md`.

## 10. Project commands

`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` ·
`npm run format:check` · `npm run test` · `npm run test:e2e` · `npm run verify`
(lint + typecheck + format + unit + build). Current status and the exact
verification commands for the active block: `docs/PROJECT_STATE.md`.
