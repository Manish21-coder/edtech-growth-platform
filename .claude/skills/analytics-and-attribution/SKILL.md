---
name: analytics-and-attribution
description: Instrument consent-aware analytics and multi-touch attribution that reconciles with transactional truth.
---

# Analytics & attribution

Operationalizes `.claude/rules/observability.md` (analytics integrity, dedupe by
stable id), `.claude/rules/events.md` and `.claude/rules/privacy.md`.

## Applicability & trigger conditions

Use when: adding tracking to a page/flow; defining a new analytics event or
dimension; wiring UTM/attribution capture; setting up server-side conversion
tracking; or building reporting/exports.

## Decision framework

1. **Taxonomy first.** Event name (past tense), required properties, types, allowed
   values, owner — defined in the analytics catalog before instrumentation.
2. **Consent-gated.** No non-essential analytics/marketing tag fires before consent
   state is `granted` (or `not_required`). Essential/first-party measurement is
   minimized and documented.
3. **Attribution model.** Capture first-touch, latest-touch and conversion-touch
   **separately**; store raw UTM params plus normalized channel/source/campaign
   dimensions. Define the lookback window.
4. **Dedupe browser + server** conversions with a shared stable `event_id`.
5. **Reconcile.** A conversion in analytics is provisional; the report of record
   joins to transactional state (lead/payment) and flags divergence.
6. **No PII as identifiers or dimensions.** Use opaque IDs; keep the anonymous
   analytics id separate from the account id.

## Implementation standards

- Client emits via a thin tracking abstraction (`packages/analytics`) — never call
  a vendor SDK directly from feature code.
- Server-side events for conversions where accuracy matters; include the shared
  `event_id`.
- Analytics failures are swallowed and never block the learner action
  (`.claude/rules/events.md`).
- UTM captured on first landing, persisted for the session/journey, not
  overwritten; last-touch updated on later visits.
- Redact/aggregate before data leaves the process; document every field's purpose
  and retention in `DATA_INVENTORY.md`.

## Common failure & abuse cases

- Tags fire before consent → compliance breach.
- Same conversion counted twice (browser + server, no shared id).
- Email/phone/student id used as the analytics user id or a dimension.
- First-touch overwritten by the latest UTM → channel misattributed.
- "Signups" reported from analytics while the DB shows half as many.
- PII appears in a URL query that analytics captures verbatim.
- Ad-blocker/consent-deny path produces `undefined` dimensions that pollute
  reports.

## Review checklist

- [ ] Event + properties defined in the catalog with an owner before code.
- [ ] Non-essential tags consent-gated; essential ones minimized + documented.
- [ ] First/latest/conversion touch stored separately; raw UTM retained.
- [ ] Shared `event_id` dedupes browser vs server conversions.
- [ ] Reconciliation to transactional state exists for revenue/lead metrics.
- [ ] No PII in ids, dimensions, or URLs; anon id ≠ account id.
- [ ] Tracking goes through the abstraction; failures non-blocking.
- [ ] Every field in DATA_INVENTORY with purpose + retention.

## Required tests

- Consent gating test: deny → no non-essential network calls; grant → events fire.
- Dedupe test: browser + server conversion → one counted.
- Attribution test: multi-visit journey records all three touches.
- Reconciliation test: analytics vs transactional mismatch is flagged.
- PII-scan test on outgoing payloads/dimensions.
- Resilience test: collector 5xx/offline → primary action unaffected.

## Documentation requirements

- Analytics taxonomy/catalog (event, props, owner, validation) in `docs/`.
- `EVENT_CATALOG.md` for analytics events crossing a production boundary.
- `docs/privacy/DATA_INVENTORY.md`: analytics identifiers and dimensions.
- `docs/architecture/EVENT_FLOW_MAP.md`: analytics producers/consumers.

## Definition of done

- Events match a governed taxonomy; collection is consent-aware and PII-free;
  attribution is multi-touch with raw UTM; conversions are deduped and reconciled
  to transactional truth; failures never block users; inventory and catalog are
  current.
