# Documentation, living maps & diagrams

Consolidates original master `CLAUDE.md` sections **§2.2 (mandatory context files &
`PROJECT_STATE.md` contents)** and **§2.3 (living maps and diagrams)**.

## Mandatory context files

Create and maintain:

```text
CLAUDE.md
docs/PROJECT_STATE.md
docs/ROADMAP.md
docs/architecture/SYSTEM_CONTEXT.md
docs/architecture/ARCHITECTURE_MAP.md
docs/architecture/USER_FLOW_MAP.md
docs/architecture/EVENT_FLOW_MAP.md
docs/architecture/MODULE_DEPENDENCY_MAP.md
docs/architecture/decisions/ADR-XXXX-title.md
docs/contracts/EVENT_CATALOG.md
docs/contracts/openapi.yaml
docs/modules/<module>/CONTRACT.md
docs/runbooks/
docs/security/THREAT_MODEL.md
docs/privacy/DATA_INVENTORY.md
```

`docs/PROJECT_STATE.md` must stay concise and contain:

- current block and status;
- completed blocks;
- decisions and assumptions;
- active interfaces and schema versions;
- open risks / blockers;
- exact verification commands;
- next recommended action.

Do not rely on chat memory for architectural decisions — persist them in the
repository.

## Living maps are mandatory

These are working context, not optional presentation documents. Maintain them as
part of every relevant feature, refactor or integration:

- **`ARCHITECTURE_MAP.md`** — system / container / component boundaries, data
  stores, external systems, trust boundaries.
- **`USER_FLOW_MAP.md`** — learner, parent, anonymous visitor and admin journeys,
  including success, alternate and failure paths.
- **`EVENT_FLOW_MAP.md`** — event producers, names / versions, transport,
  consumers, retries, dead-letter handling and business outcomes.
- **`MODULE_DEPENDENCY_MAP.md`** — module ownership, allowed dependencies and
  prohibited cross-boundary access.

Use Mermaid diagrams stored inside Markdown. Use the smallest useful diagram type:

- **flowchart** — architecture, module relationships, decision paths;
- **sequence diagram** — API, webhook, publish, lead and payment journeys;
- **state diagram** — lead, campaign, page, trial and subscription lifecycles;
- **entity-relationship diagram** — important data-model relationships.

Templates: `docs/architecture/diagrams/TEMPLATES.md`.

## Diagram rules

- Every node uses a **stable identifier**; changing display text must not break
  references.
- Add a short legend and a `Last verified against commit:` field.
- Link each feature / module contract to the exact diagrams it affects.
- **Mark proposed elements clearly; never present planned components as
  implemented.**
- Show trust boundaries and where PII enters, leaves, is stored or is transformed.
- Distinguish synchronous calls from asynchronous events; identify the source of
  truth.
- Keep diagrams readable; split large maps into a high-level map and focused module
  diagrams.
- Mermaid diagrams do **not** replace OpenAPI, event schemas, migrations or written
  failure contracts.

## Process

Before implementing a block, inspect the relevant maps and add a **proposed delta**.
Before declaring the block complete, update diagrams to the actual implementation,
remove stale proposed elements, and verify diagram paths / names against code and
contracts.

If a change alters a route, module boundary, API, event, data owner, external
integration, role, state transition or user journey **without updating the affected
map, the block is incomplete.**

Procedure: `.claude/skills/documentation-maps-and-diagrams/SKILL.md`.
