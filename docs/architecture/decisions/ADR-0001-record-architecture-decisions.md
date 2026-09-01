# ADR-0001: Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-09-01
- **Deciders:** Product owner
- **Related:** `.claude/rules/documentation-and-maps.md`, `.claude/rules/authority-and-workflow.md`

## Context

The master contract requires that architectural decisions are persisted in the
repository, not in chat memory, and that ADRs sit above repository conventions in
the instruction priority order. We need a lightweight, consistent format.

## Options considered

1. **Lightweight ADRs in `docs/architecture/decisions/`** (Nygard-style, one file
   per decision, numbered) — low friction, version-controlled, greppable.
2. **A single running DECISIONS.md** — simpler to start, but merges poorly, hard to
   reference a single decision, and grows unreadable.
3. **External wiki / doc tool** — out of repo, drifts from code, not reviewable in
   PRs.

## Decision

Use lightweight, numbered Markdown ADRs in `docs/architecture/decisions/`, one file
per decision, based on `ADR-0000-template.md`. Every one-way-door decision (public
URLs, event names/semantics, data collected, persistence technology, hosting,
release strategy, pricing copy) requires an ADR before implementation. ADRs are
immutable once Accepted; a change is a new ADR that supersedes the old one.

## Consequences

- Positive: decisions are reviewable in the same PR as the code; the priority order
  in `.claude/rules/authority-and-workflow.md` has a concrete referent.
- Negative: minor authoring overhead per significant decision.
- Follow-up: link ADRs from the affected diagrams and module contracts.

## Compliance

Code review (`.claude/skills/code-review/SKILL.md`) checks that one-way-door changes
carry an Accepted ADR. `docs/PROJECT_STATE.md` lists the current ADR set.
