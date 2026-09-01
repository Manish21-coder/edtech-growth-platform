---
name: privacy-and-edtech-data-governance
description: Minimize and govern learner data — inventory, legal basis, consent, retention, deletion, extra care for minors.
---

# Privacy & EdTech data governance

Operationalizes the **Privacy reviewer** lens and `.claude/rules/privacy.md`.
Maintain `docs/privacy/DATA_INVENTORY.md`. Get legal review for the final
implementation, **especially where minors are involved**.

## Applicability & trigger conditions

Use when: adding any new data field, event property, cookie, or identifier;
integrating a vendor that receives learner/lead data; building consent/preference
UI; defining retention; building export/deletion workflows; or any profiling/
targeting logic.

## Decision framework

1. **Purpose before collection.** Name the declared purpose and legal basis
   (consent, contract, legitimate interest). No purpose → don't collect.
2. **Data minimization.** Collect the least data, at the latest step, for the
   shortest time. Prefer aggregates and opaque ids.
3. **Consent separation.** Marketing consent is distinct from service processing;
   each is independently grantable and withdrawable, versioned and auditable.
4. **Minors.** If users may be under the local age of consent: no behavioural
   targeting/profiling/automated decisions without explicit review; parental/
   guardian consent flows where required; stricter retention.
5. **Residency & sharing.** Know where data lives; don't send learner data to a
   vendor until purpose, contract (DPA), security posture and retention are
   approved.
6. **Lifecycle.** Every field has a retention period and an automated
   deletion/anonymization job.

## Implementation standards

- Update `DATA_INVENTORY.md` in the **same block** that introduces a field:
  owner, purpose, legal basis/consent, sensitivity, residency, retention,
  deletion method.
- Consent records are immutable, versioned (text + version + timestamp + source),
  and linked to the subject; withdrawal is honored downstream (propagated to
  consumers/vendors).
- No student data in URLs, analytics dimensions, logs, error messages or public
  exports (`.claude/rules/observability.md`).
- Separate anonymous analytics identifiers from account identifiers.
- Dev/test/staging use synthetic or irreversibly redacted data.
- Provide access / correction / export / deletion workflows where applicable;
  deletion cascades or anonymizes across stores and event history where feasible.
- Add a privacy impact note to every new event and integration.

## Common failure & abuse cases

- Field added "we might need it" with no purpose, no inventory row, kept forever.
- One consent checkbox covers service + marketing + third-party sharing.
- Student name/email in a landing-page URL captured by analytics and ad pixels.
- Vendor integration ships learner data before a DPA exists.
- Deletion request removes the row but leaves PII in events, backups, logs, CRM.
- Behavioural retargeting enabled for an audience that includes minors.
- Prod data copied to a laptop for "debugging".

## Review checklist

- [ ] Declared purpose + legal basis for every new field/identifier.
- [ ] Minimized: least data, latest step, shortest retention.
- [ ] Marketing vs service consent separated; versioned; withdrawable + propagated.
- [ ] Minors path reviewed (targeting/profiling restrictions, guardian consent).
- [ ] Vendor: purpose + DPA + security + retention approved before data flows.
- [ ] No PII in URLs/analytics/logs/exports; anon id ≠ account id.
- [ ] Retention period + automated deletion/anonymization job defined.
- [ ] Access/correction/export/deletion workflow covers all stores + event history.
- [ ] `DATA_INVENTORY.md` updated this block; privacy note on new events/integrations.

## Required tests

- Consent gating: denied marketing consent → no marketing processing/vendor send.
- Withdrawal test: revoking consent stops downstream processing.
- Deletion test: subject erased across primary store, derived data, and (mocked)
  vendor; residual-PII scan passes.
- Retention job test: expired records anonymized/deleted.
- PII-in-telemetry scan on logs/traces/analytics payloads.
- Synthetic-data check in test fixtures (no real PII).

## Documentation requirements

- `docs/privacy/DATA_INVENTORY.md` — the authoritative record.
- Privacy impact note attached to the block and to new `EVENT_CATALOG.md` rows.
- Module `CONTRACT.md`: data owned/read, retention, consent model.
- PII-movement diagram updated (`docs/architecture/diagrams/TEMPLATES.md` §8).
- Flag items needing legal sign-off in `docs/PROJECT_STATE.md`.

## Definition of done

- Every new data element has a purpose, legal basis, inventory row, retention and
  deletion path; consent is separated and withdrawable; minors are handled with
  extra safeguards; no PII leaks into URLs/telemetry/exports; legal-review items
  are flagged.
