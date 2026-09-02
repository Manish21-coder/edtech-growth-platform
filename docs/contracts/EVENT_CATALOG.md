# Event catalog

Authoritative list of domain and analytics events. Governed by
`.claude/rules/events.md`. Every event that crosses a production boundary MUST have
a row here **before** it is emitted, with a schema, owner, data classification,
retention and consumer list, plus a privacy impact note.

Last verified against commit: _pending first commit_

> Status: **Proposed** — no events are emitted yet. The rows below are the planned
> initial set from `EVENT_FLOW_MAP.md`. Do not treat any as implemented.

## Envelope

All events use the CloudEvents-inspired envelope in `.claude/rules/events.md`
(`specversion, id, type, source, time, subject, correlation_id, causation_id,
tenant_id, actor, context{session_id,page_id,utm,consent_state}, data`). No
passwords, tokens, full payment data, secrets or unnecessary PII in any field.

## Classification legend

- **C0** non-personal / operational · **C1** pseudonymous · **C2** personal data ·
  **C3** sensitive / minors-related.

## Catalog

| Type                                   | Owner          | Class | Retention          | Producers           | Consumers                                             | Status   | Privacy note                                                                                                           |
| -------------------------------------- | -------------- | ----- | ------------------ | ------------------- | ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `page.viewed.v1`                       | web            | C1    | 14 mo (aggregated) | web                 | analytics forwarder                                   | Proposed | No PII; `subject` = stable page id; UTM in `context`.                                                                  |
| `cta.clicked.v1`                       | web            | C1    | 14 mo              | web                 | analytics forwarder                                   | Proposed | No PII.                                                                                                                |
| `lead.submitted.v1`                    | lead           | C2    | per DATA_INVENTORY | lead (outbox)       | qualification, CRM sync, analytics, reporting         | Proposed | `data` carries minimal lead ref + consent state; no raw contact fields beyond what consumers require.                  |
| `lead.deduplicated.v1`                 | lead           | C1    | 24 mo              | lead                | reporting, CRM sync                                   | Proposed | References opaque lead ids only.                                                                                       |
| `lead.qualified.v1`                    | qualification  | C1    | 24 mo              | qualification       | CRM sync, checkout, notification                      | Proposed | Score + reason codes, no PII.                                                                                          |
| `campaign.impression_recorded.v1`      | campaign       | C1    | 14 mo              | campaign surfaces   | analytics, reporting                                  | Proposed | No PII.                                                                                                                |
| `campaign.clicked.v1`                  | campaign       | C1    | 14 mo              | campaign surfaces   | analytics, reporting                                  | Proposed | No PII.                                                                                                                |
| `course.viewed.v1`                     | web            | C1    | 14 mo              | web                 | analytics, recommendations                            | Proposed | No PII.                                                                                                                |
| `checkout.started.v1`                  | checkout       | C1    | 24 mo              | checkout (outbox)   | reporting, notification                               | Proposed | No payment data; opaque refs.                                                                                          |
| `payment.initiated.v1`                 | checkout       | C1    | 24 mo              | checkout (outbox)   | reporting, reconciliation                             | Proposed | No PAN/card data ever.                                                                                                 |
| `payment.succeeded.v1`                 | checkout       | C1    | 7 yr (financial)   | checkout (outbox)   | reporting, subscription, notification, reconciliation | Proposed | Amount + currency + opaque txn ref; no card data.                                                                      |
| `payment.failed.v1`                    | checkout       | C1    | 24 mo              | checkout (outbox)   | reporting, notification                               | Proposed | Failure reason code only.                                                                                              |
| `subscription.started.v1`              | subscription   | C1    | 7 yr               | subscription        | reporting, notification                               | Proposed | Plan + opaque refs.                                                                                                    |
| `trial.started.v1`                     | trial          | C1    | 24 mo              | trial               | reporting, notification                               | Proposed | Opaque refs.                                                                                                           |
| `trial.ended.v1`                       | trial          | C1    | 24 mo              | trial               | reporting, notification                               | Proposed | Opaque refs.                                                                                                           |
| `content.published.v1`                 | cms/publishing | C0    | 24 mo              | publishing (outbox) | cache purge, analytics, audit                         | Proposed | Actor id is an admin id (C1).                                                                                          |
| `admin.configuration_changed.v1`       | admin          | C0    | 7 yr (audit)       | admin               | audit, analytics                                      | Proposed | Before/after in audit store, not the event body.                                                                       |
| `export.completed.v1`                  | reporting      | C0    | 12 mo              | reporting           | notification                                          | Proposed | Export may contain PII — the file is C2/C3 and lives in access-controlled storage; the event carries only a reference. |
| `homepage.category_selected.v1`        | homepage       | C1    | 14 mo              | homepage            | analytics, recommendations                            | Proposed | Category id only, no PII. HP-030/HP-050.                                                                               |
| `homepage.popup_eligible.v1`           | homepage       | C1    | 14 mo              | homepage            | analytics                                             | Proposed | 5s-dwell popup lifecycle start. HP-140/HP-320.                                                                         |
| `homepage.popup_viewed.v1`             | homepage       | C1    | 14 mo              | homepage            | analytics                                             | Proposed | HP-140/HP-321.                                                                                                         |
| `homepage.popup_clicked.v1`            | homepage       | C1    | 14 mo              | homepage            | analytics                                             | Proposed | Not counted as a completed conversion — HP-324.                                                                        |
| `homepage.popup_dismissed.v1`          | homepage       | C1    | 14 mo              | homepage            | analytics                                             | Proposed | Drives 24h client-side suppression — HP-322.                                                                           |
| `homepage.popup_converted.v1`          | homepage       | C1    | 14 mo              | homepage            | analytics                                             | Proposed | Fired on associated `lead.submitted`; drives 30-day suppression — HP-323.                                              |
| `homepage.testimonial_video_played.v1` | homepage       | C1    | 14 mo              | homepage            | analytics                                             | Proposed | No PII; video/testimonial id only.                                                                                     |

## Versioning

`type` ends in `.vN`. A shape or meaning change = a **new version**; the old
version stays documented until all consumers migrate. Never mutate a published
event in place.

## Change process

Add/patch a row + the schema (link to JSON Schema in `packages/events` once it
exists) → update `EVENT_FLOW_MAP.md` → add a privacy impact note → add schema +
compatibility + consumer-idempotency tests
(`.claude/skills/event-architecture/SKILL.md`).
