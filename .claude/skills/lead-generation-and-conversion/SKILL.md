---
name: lead-generation-and-conversion
description: Build lead capture and conversion flows — progressive forms, dedupe, consent, CRM adapters, reconciliation.
---

# Lead generation & conversion

Operationalizes `.claude/rules/lead-conversion.md` and `.claude/rules/privacy.md`.
Applies to lead/forms/checkout/attribution code.

## Applicability & trigger conditions

Use when: building a lead form or multi-step capture flow; adding lead routing,
dedupe, qualification or enrichment; integrating a CRM/ESP; wiring checkout-intent
handoff; or capturing consent.

## Decision framework

1. **Progressive capture.** Ask only what the current step needs; enrich/qualify
   later. Persist partial input so a back button or reload doesn't lose it.
2. **Normalize then dedupe.** Canonicalize email (lowercase, trim, plus-address
   policy) and phone (E.164) before matching. Dedupe rules are documented and
   testable; a duplicate emits `lead.deduplicated`.
3. **Consent is explicit and separate.** Marketing consent ≠ service processing.
   Record purpose, exact text + version, source, timestamp; support withdrawal.
   Never pre-check.
4. **Server is the source of truth.** Validate server-side; spam protection + rate
   limiting + honeypot; the browser event is not the record.
5. **External systems via adapters + queue.** CRM/ESP writes go through an adapter
   and an outbox/queue; failures retry and surface in a reconciliation view.
6. **Attribution captured at submit:** first-touch, latest-touch, conversion-touch
   stored separately, with raw UTM + normalized dimensions.

## Implementation standards

- `POST /leads` (or equivalent) requires an `Idempotency-Key`; a retried submit
  creates one lead (`.claude/rules/api.md`).
- Emit `lead.submitted.v1` via the outbox atomically with the DB write; downstream
  qualification/CRM sync are consumers.
- Store consent as an immutable record linked to the lead.
- PII fields inventoried in `docs/privacy/DATA_INVENTORY.md` with retention +
  deletion.
- No student/lead PII in URLs, analytics dimensions, or logs.
- Reconciliation job compares CRM acknowledgements to local leads and alerts on
  gaps.

## Common failure & abuse cases

- Double-submit or network retry creates duplicate leads / duplicate CRM contacts.
- Validation error clears the form; user abandons.
- Consent checkbox pre-checked, or one checkbox covers both service + marketing.
- CRM outage drops leads silently (no queue, no reconciliation).
- Analytics `conversion` fires but the lead never persisted → inflated reports.
- Bot fills the form thousands of times (no rate limit / honeypot).
- UTM overwritten so first-touch is lost.
- Phone/email stored unnormalized → dedupe misses obvious duplicates.

## Review checklist

- [ ] Progressive form; partial input preserved; input kept on error.
- [ ] Email/phone normalized; dedupe rules documented + tested.
- [ ] Consent explicit, separate, versioned, withdrawable, not pre-checked.
- [ ] Server-side validation + rate limit + honeypot + spam check.
- [ ] Idempotency key on submit; one lead per logical submission.
- [ ] `lead.submitted` via outbox; CRM sync is a retrying consumer.
- [ ] First/latest/conversion attribution stored separately; raw UTM kept.
- [ ] Reconciliation + alerting for CRM/webhook gaps.
- [ ] No PII in URLs/analytics/logs; DATA_INVENTORY updated.
- [ ] No dark patterns / fake urgency / misleading trial copy.

## Required tests

- Idempotency test: same submission twice → one lead, one CRM write.
- Dedupe unit tests across normalization edge cases.
- Consent record: created, immutable, withdrawal path works.
- Validation/anti-abuse: honeypot, rate limit, malformed input.
- CRM adapter failure → queued + retried + reconciliation flags gap.
- Attribution: multi-visit journey stores all three touches correctly.
- E2E: full submit happy path + one failure path.

## Documentation requirements

- Lead module `CONTRACT.md`: dedupe rules, consent model, adapters, idempotency,
  reconciliation, alerts.
- `EVENT_CATALOG.md`: `lead.submitted`, `lead.deduplicated`, `lead.qualified`.
- `docs/privacy/DATA_INVENTORY.md`: every field, purpose, legal basis, retention.
- `USER_FLOW_MAP.md` + `EVENT_FLOW_MAP.md` updated.
- Runbook: CRM sync failure / reconciliation.

## Definition of done

- Forms are progressive and loss-resistant; consent is compliant; submission is
  idempotent and reconciled against authoritative state; attribution is complete;
  no PII leaks; no dark patterns; contracts, events, inventory, maps and runbook
  are current.
