# Event-first architecture

Consolidates original master `CLAUDE.md` section **§5** (event rules, required
envelope, delivery guarantees). The authoritative catalog is
`docs/contracts/EVENT_CATALOG.md`.

## Event rules

Emit events for meaningful **facts**, not UI implementation details. Use **past
tense**. Never rename or change the meaning of a published event in place — create a
new version (`lead.submitted.v2`).

Representative events:

```text
page.viewed            cta.clicked             lead.submitted
lead.deduplicated      lead.qualified          campaign.impression_recorded
campaign.clicked       course.viewed           checkout.started
payment.initiated      payment.succeeded       payment.failed
subscription.started   trial.started           trial.ended
content.published      admin.configuration_changed   export.completed
```

Do **not** place raw passwords, tokens, full payment data, unnecessary PII or
secrets in events. Hash or tokenize identifiers only when the documented use
permits it.

## Required event envelope

```json
{
  "specversion": "1.0",
  "id": "unique-event-id",
  "type": "lead.submitted.v1",
  "source": "module-or-service",
  "time": "RFC3339 timestamp",
  "subject": "non-sensitive entity reference",
  "correlation_id": "journey-or-request-id",
  "causation_id": "triggering-event-id-if-any",
  "tenant_id": "tenant-or-brand-id-if-applicable",
  "actor": { "type": "anonymous|user|admin|system", "id": "opaque-id" },
  "context": {
    "session_id": "opaque-id",
    "page_id": "stable-page-id",
    "utm": {},
    "consent_state": "granted|denied|unknown|not_required"
  },
  "data": {}
}
```

## Delivery guarantees

- Producers use an **outbox** or equivalent atomic publishing pattern for
  business-critical events.
- Consumers are **idempotent** and maintain a processed-event key or equivalent
  protection.
- Retries use **bounded exponential backoff with jitter**.
- Poison messages go to a **dead-letter path** with alerting and safe replay.
- Event order must not be assumed unless the transport and partitioning contract
  guarantee it.
- Schemas are validated at production boundaries and compatibility-tested in CI.
- **Analytics failure must never block the primary learner action.**

## Catalog

Maintain `docs/contracts/EVENT_CATALOG.md` with, per event: schema, owner, data
classification, retention and consumers. Add a privacy impact review for every new
event (see `privacy.md`). Update `docs/architecture/EVENT_FLOW_MAP.md` whenever a
producer, consumer, transport or dead-letter path changes.
