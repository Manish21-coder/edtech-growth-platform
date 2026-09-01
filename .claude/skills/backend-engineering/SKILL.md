---
name: backend-engineering
description: Implement domain logic, mutations and background work with correctness, concurrency safety and idempotency.
---

# Backend engineering

Operationalizes the **Backend / API engineer** and **Data / event engineer** lenses,
`.claude/rules/architecture.md`, `.claude/rules/api.md` and
`.claude/rules/events.md`.

## Applicability & trigger conditions

Use when implementing: domain services, mutations, route handler logic, background
jobs / event consumers, integration adapters, or anything that writes to a data
store or calls an external provider.

## Decision framework

1. **Keep domain logic pure and vendor-free.** Side effects (DB, HTTP, queue) live
   behind interfaces injected into the domain.
2. **Model the write path for retries.** Any externally retryable mutation (lead
   create, payment initiate, webhook handling) needs an **idempotency key** and a
   dedupe store.
3. **Concurrency:** decide optimistic (version column) vs pessimistic locking per
   aggregate; never rely on read-modify-write without protection.
4. **Atomic fact + event.** When a state change must produce an event, write both
   in one transaction via the **outbox**; a separate publisher relays it.
5. **Consumers are idempotent** and keep a processed-event key; retries use bounded
   exponential backoff + jitter; poison messages go to a DLQ with alerting.
6. **Reconcile, don't trust.** Business success = authoritative transactional state,
   not an analytics or webhook receipt.

## Implementation standards

- Validate all input at the boundary; parse into typed domain objects (no raw
  request shapes deep in the code).
- Parameterized queries only; never string-build SQL (`.claude/rules/security.md`).
- Explicit timeouts on every outbound call; retry only idempotent operations;
  circuit-break unstable providers.
- Deterministic clock + ID generation injected (for tests).
- Structured logs with request/trace/correlation IDs; redact secrets and PII
  before logging (`.claude/rules/observability.md`).
- Least-privilege credentials per integration; secrets from the secret store only.
- Errors returned as `{ code, message, request_id }` — no stack traces or provider
  secrets leaked.

## Common failure & abuse cases

- Duplicate lead / double charge because the mutation had no idempotency key.
- Event published but the transaction rolled back (no outbox) → phantom events.
- Consumer crashes mid-batch and reprocesses non-idempotently → duplicated effects.
- Unbounded retry storm against a failing provider (no backoff / breaker).
- Lost update under concurrent edits (no version check).
- PII or tokens written to logs / traces / events.
- SSRF via an unvalidated URL passed to a server-side fetcher.

## Review checklist

- [ ] Domain logic free of vendor SDKs and framework types.
- [ ] Idempotency key + dedupe store on every retryable mutation.
- [ ] Concurrency strategy chosen and enforced.
- [ ] Fact + event written atomically (outbox) where required.
- [ ] Consumers idempotent; backoff + jitter; DLQ + alert.
- [ ] Timeouts, safe-only retries, circuit breakers on outbound calls.
- [ ] Parameterized queries; input validated at boundary.
- [ ] Logs/traces/events redacted; least-privilege credentials.
- [ ] Reconciliation path for delayed/failed external deliveries.

## Required tests

- Unit tests for domain rules with injected clock/IDs.
- Idempotency tests: same request twice → one effect.
- Concurrency test: parallel writes → no lost update.
- Event tests: schema validity, outbox atomicity, consumer replay/idempotency.
- Failure-injection: provider timeout/5xx, duplicate webhook, DLQ routing.
- Integration tests with the provider isolated.

## Documentation requirements

- `openapi.yaml` / `EVENT_CATALOG.md` updated for new contracts.
- Module `CONTRACT.md`: idempotency & retry behaviour, monitoring & alerts.
- `EVENT_FLOW_MAP.md` updated for new producers/consumers/DLQ paths.
- Runbook entry for any new alert.

## Definition of done

- Write paths are idempotent and concurrency-safe; events are atomic with their
  facts; consumers replay safely; reconciliation exists; telemetry is redacted and
  traced; contracts and maps match the code.
