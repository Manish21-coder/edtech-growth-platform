---
name: event-architecture
description: Design domain/analytics events — naming, envelope, versioning, delivery guarantees, catalog entries.
---

# Event architecture

Operationalizes `.claude/rules/events.md`. The authoritative catalog is
`docs/contracts/EVENT_CATALOG.md`; the flow map is
`docs/architecture/EVENT_FLOW_MAP.md`.

## Applicability & trigger conditions

Use when: a module needs to publish a fact other modules or analytics react to;
adding a consumer; changing an event's shape; or wiring a transport / DLQ.

## Decision framework

1. **Is it a fact?** Emit events for meaningful domain facts in **past tense**
   (`lead.submitted`, `payment.succeeded`), never for UI actions or internal
   implementation steps.
2. **Producer vs analytics.** Domain events drive behaviour and must be reliable;
   analytics events inform reporting and must **never block** the learner action.
3. **Versioning.** Type is `name.vN`. A shape or meaning change = a **new version**;
   never mutate a published event in place. Plan consumer migration.
4. **Delivery semantics.** At-least-once by default → consumers must be idempotent.
   Only assume ordering if the transport + partition key guarantee it.
5. **Payload minimization.** `subject` is a non-sensitive reference; `data` carries
   only what consumers need. No passwords, tokens, full payment data, secrets or
   unnecessary PII (`.claude/rules/privacy.md`).
6. **Correlation.** Always set `correlation_id` (journey/request) and
   `causation_id` (triggering event) so lineage is reconstructable.

## Implementation standards

- Use the required envelope from `.claude/rules/events.md` verbatim.
- Business-critical events are published via the **outbox** (atomic with the fact).
- Retries: bounded exponential backoff + jitter; poison → DLQ with alert + safe
  replay tooling.
- Validate event schemas at production boundaries; run compatibility tests in CI.
- Consumers store a processed-event key; processing is idempotent and side-effect
  safe on replay.
- Every new/changed event gets a `EVENT_CATALOG.md` row and a privacy impact note.

## Common failure & abuse cases

- Renaming/repurposing `lead.qualified` in place → silent consumer breakage.
- Event emitted outside the transaction → emitted on rollback, or lost on commit.
- Consumer assumes exactly-once → double-sends email on redelivery.
- PII (email, phone, student name) placed in `subject` or analytics dimensions.
- Ordering assumed across partitions → out-of-order state machine.
- No DLQ → poison message blocks the whole partition.
- Analytics publish on the critical path → form submit fails when the collector is
  down.

## Review checklist

- [ ] Name is a past-tense fact; versioned `name.vN`.
- [ ] Envelope complete; `correlation_id` / `causation_id` set.
- [ ] No secrets / unnecessary PII in `subject` or `data`.
- [ ] Outbox used for business-critical events.
- [ ] Consumers idempotent with a processed-event key.
- [ ] Backoff + jitter + DLQ + replay tooling.
- [ ] Schema validated at boundary; CI compatibility test added.
- [ ] Analytics failures are non-blocking.
- [ ] `EVENT_CATALOG.md` + `EVENT_FLOW_MAP.md` updated; privacy note added.

## Required tests

- Schema validation tests (valid + invalid payloads).
- Backward/forward compatibility test vs the previous version.
- Outbox atomicity test (fact committed ⇔ event published).
- Consumer idempotency / replay test.
- DLQ routing + replay test.
- "Collector down" test proving the primary action still succeeds.

## Documentation requirements

- `docs/contracts/EVENT_CATALOG.md`: schema, owner, classification, retention,
  consumers.
- `docs/architecture/EVENT_FLOW_MAP.md`: producer → transport → consumer → DLQ,
  with sync/async distinction and `Last verified against commit:`.
- Module `CONTRACT.md`: events produced / consumed.

## Definition of done

- Event is a versioned fact with a complete envelope, reliable (outbox) or
  explicitly non-blocking (analytics), consumed idempotently, catalogued, mapped,
  and privacy-reviewed.
