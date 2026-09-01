---
name: documentation-maps-and-diagrams
description: Keep the living architecture/user/event/dependency maps and Mermaid diagrams accurate every block.
---

# Documentation maps & diagrams

Operationalizes `.claude/rules/documentation-and-maps.md`. The maps are working
context, not decoration; stale maps are worse than none.

## Applicability & trigger conditions

Use in **every** block that adds or changes a route, module boundary, API, event,
data owner, external integration, role, state transition, data model or user
journey — and whenever you read a map to plan work (add a proposed delta first).

## Decision framework

1. **Which maps does this touch?**
   - route/journey → `USER_FLOW_MAP.md`
   - module boundary/dependency → `MODULE_DEPENDENCY_MAP.md`
   - container/component/trust boundary/data store/external system →
     `ARCHITECTURE_MAP.md` (+ `SYSTEM_CONTEXT.md` for external actors)
   - producer/consumer/transport/DLQ → `EVENT_FLOW_MAP.md`
   - lifecycle (lead/campaign/page/trial/subscription) → a state diagram
   - data model → an ERD
   - PII entry/exit/storage/transform → the trust-boundary/PII diagram
2. **Smallest useful diagram type** (flowchart / sequence / state / ER). Split a
   map that stops being readable into a high-level map + focused module diagrams.
3. **Proposed vs implemented.** Before building, add the change as a clearly
   marked `Proposed` node/edge. After building, promote it to implemented and
   delete any stale proposed elements.

## Implementation standards

- Diagrams are Mermaid inside Markdown (version-controlled, reviewable). Start from
  `docs/architecture/diagrams/TEMPLATES.md`.
- **Stable node identifiers**; display text can change without breaking references.
- Each map has a short **legend** and a `Last verified against commit: <hash>`
  line, updated when you verify it against code.
- Mark `Proposed` elements with a distinct class/style and a note; never present a
  plan as built.
- Show **trust boundaries** and every point where PII enters, leaves, is stored or
  transformed.
- Distinguish **synchronous** calls from **asynchronous** events; name the source
  of truth.
- Link each module `CONTRACT.md` and significant feature to the exact diagrams it
  affects.
- Diagrams do **not** replace `openapi.yaml`, event schemas, migrations or written
  failure contracts — cross-reference them.

## Common failure & abuse cases

- Map updated to the _plan_, code ships differently, map never reconciled.
- Renaming a node's id → dangling references elsewhere.
- One giant unreadable architecture diagram nobody maintains.
- `Proposed` components left looking implemented for months.
- PII flow omitted from the security diagram.
- Sync API call drawn as an event (or vice versa) → misleads the next engineer.
- `Last verified against commit:` never updated → false confidence.

## Review checklist

- [ ] Every changed route/boundary/API/event/owner/role/state/journey has a
      matching map update **in this diff**.
- [ ] Proposed → implemented promotion done; stale proposed elements removed.
- [ ] Node ids stable; references intact.
- [ ] Legend present; `Last verified against commit:` updated.
- [ ] Trust boundaries + PII movement shown where relevant.
- [ ] Sync vs async distinguished; source of truth labelled.
- [ ] Diagram renders (valid Mermaid); map still readable (split if not).
- [ ] Contract/feature links to affected diagrams.

## Required tests

- Mermaid syntax check for changed diagrams: extract each ```mermaid block to its
  own temp `.mmd` and validate individually (`npx --yes @mermaid-js/mermaid-cli` —
  do **not** add it as a project dependency; whole-file validation is wrong).
  Wiring this into CI is a `docs/ROADMAP.md` item.
- Link-check changed docs (relative links resolve).
- Manual: trace one real code path and confirm the diagram matches.

## Documentation requirements

- The four living maps + `SYSTEM_CONTEXT.md` kept current.
- New/changed lifecycles get a state diagram; new data models get an ERD.
- `docs/PROJECT_STATE.md` notes which maps were verified this block.
- New architectural decisions recorded as ADRs, referenced from the map.

## Definition of done

- Every affected map and diagram matches the shipped code, uses stable ids, carries
  a legend and an updated `Last verified against commit:`, correctly marks
  `Proposed` vs implemented, shows trust boundaries and PII movement, and renders
  as valid Mermaid.
