# Data inventory

Authoritative record of every personal-data element the platform processes.
Governed by `.claude/rules/privacy.md` and
`.claude/skills/privacy-and-edtech-data-governance/SKILL.md`. **Add a row in the
same block that introduces a field, event property, cookie or identifier.** Obtain
legal review before collecting any learner personal data, especially for minors.

Last verified against commit: _pending first commit_

> Status: **Proposed — nothing is collected yet.** The repository processes **no
> personal data** today (static site skeleton only). The rows below are the
> anticipated first data elements from `docs/ROADMAP.md`, all marked Proposed, so
> collection is designed with minimisation, consent, retention and deletion from
> the start.

## Classification legend

- **C0** non-personal · **C1** pseudonymous · **C2** personal data ·
  **C3** sensitive / minors-related.

## Inventory

| #   | Data element                                                          | Class | Purpose                                        | Legal basis                                                        | Collected where                 | Stored where                       | Residency | Retention                                             | Deletion method                                         | Shared with                 | Status   |
| --- | --------------------------------------------------------------------- | ----- | ---------------------------------------------- | ------------------------------------------------------------------ | ------------------------------- | ---------------------------------- | --------- | ----------------------------------------------------- | ------------------------------------------------------- | --------------------------- | -------- |
| 1   | UTM parameters (source/medium/campaign/term/content)                  | C1    | Attribution / campaign reporting               | Legitimate interest (aggregated) / consent for marketing use       | Landing page URL on first visit | Session store + attribution table  | TBD (ADR) | 14 months, then aggregate-only                        | Automated purge job                                     | Analytics sink (no raw PII) | Proposed |
| 2   | Anonymous session / device id                                         | C1    | Journey stitching, dedupe of conversion events | Legitimate interest / strictly-necessary                           | First-party cookie / storage    | Analytics store                    | TBD       | 14 months                                             | Cookie expiry + store purge                             | —                           | Proposed |
| 3   | Lead email address                                                    | C2    | Contact for enrolment enquiry; dedupe          | Consent (marketing) + pre-contract (service) — recorded separately | Lead form                       | `lead` table (normalized)          | TBD (ADR) | Until purpose ends + 24 months, or on erasure request | Hard delete + event/backups scrub + CRM delete          | CRM/ESP (after DPA)         | Proposed |
| 4   | Lead phone number (E.164)                                             | C2    | Contact / callback; dedupe                     | Consent + pre-contract                                             | Lead form                       | `lead` table                       | TBD       | as #3                                                 | as #3                                                   | CRM/ESP (after DPA)         | Proposed |
| 5   | Lead name                                                             | C2    | Personalisation of contact                     | Consent + pre-contract                                             | Lead form                       | `lead` table                       | TBD       | as #3                                                 | as #3                                                   | CRM/ESP (after DPA)         | Proposed |
| 6   | Course / programme of interest                                        | C1    | Routing, qualification                         | Pre-contract                                                       | Lead form                       | `lead` table                       | TBD       | as #3                                                 | as #3                                                   | CRM/ESP                     | Proposed |
| 7   | Consent record (purpose, text+version, timestamp, source, withdrawal) | C2    | Legal evidence of consent                      | Legal obligation                                                   | Consent capture UI              | `consent_record` table (immutable) | TBD       | Duration of relationship + statutory period           | Retained as evidence; subject data minimised on erasure | —                           | Proposed |
| 8   | Guardian / parent identity & consent (if learner is a minor)          | C3    | Verifiable parental consent                    | Legal obligation / consent                                         | Guardian consent flow           | `consent_record` (linked)          | TBD       | Statutory                                             | as #7                                                   | —                           | Proposed |
| 9   | Payment reference / subscription id (no card data)                    | C1    | Reconciliation, entitlement                    | Contract                                                           | Checkout handoff / webhook      | `subscription` / `payment` tables  | TBD       | 7 years (financial)                                   | Anonymise after statutory period                        | Payment provider            | Proposed |
| 10  | Admin user identity & audit actor id                                  | C2    | Access control, audit                          | Contract / legitimate interest                                     | Admin SSO                       | `auth` + `audit_log`               | TBD       | Duration of employment + audit period                 | Deactivate; audit entries retained                      | Identity provider           | Proposed |

## Data-subject request workflows (Proposed)

Access, correction, export, and erasure/anonymisation workflows must cover the
primary store, derived tables, event history/outbox, backups (documented lag), and
downstream processors (CRM/ESP). Tracked in `docs/ROADMAP.md` (stage 8+).

## Rules reminder

- Collect the minimum, at the latest step, for the shortest time.
- Marketing consent is **separate** from service processing.
- No student/lead PII in URLs, analytics dimensions, logs or public exports.
- Anonymous analytics id kept separate from account id.
- No profiling / behavioural targeting of minors without explicit review.
- Synthetic/redacted data only in dev and tests.
- Privacy impact note on every new event and integration.
