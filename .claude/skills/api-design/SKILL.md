---
name: api-design
description: Design contract-first HTTP APIs and webhooks — versioned, validated, authorized, idempotent, paginated.
---

# API design

Operationalizes `.claude/rules/api.md` (path-scoped). Applies to `src/app/api/**`,
`src/**/route.ts` and `docs/contracts/openapi.yaml`.

## Applicability & trigger conditions

Use when: adding or changing an HTTP endpoint (public, admin or cross-module);
accepting a webhook; versioning or deprecating an API; or defining error/pagination
conventions.

## Decision framework

1. **Contract first.** Write/extend `docs/contracts/openapi.yaml` before the
   handler. Generate types from it where practical.
2. **Public vs internal.** Public/externally-consumed APIs are versioned with a
   deprecation window. Internal cross-module APIs still get a contract.
3. **Resource modelling.** Nouns + standard verbs; list endpoints are paginated
   with a capped page size and bounded query complexity.
4. **Idempotency.** Mutations that clients may retry (lead create, payment
   initiate, webhook processing) accept an `Idempotency-Key` and return the same
   result on replay.
5. **Errors are a contract.** One error shape: `{ code, message, request_id,
fields? }`. `message` is safe for end users; details go to logs.
6. **Webhooks:** verify the signature against the **raw body**, enforce a timestamp
   / replay window, respond fast, process async.

## Implementation standards

- Validate path, query, headers and body at the boundary; reject unknown fields
  where practical.
- AuthN + **object-level authorization** + tenant scoping enforced server-side on
  every request — never trust a client-supplied tenant/owner id.
- Explicit request timeouts; return `429` with `Retry-After` on rate limits.
- Never expose stack traces, internal IDs that leak structure, or provider secrets.
- Set cache headers deliberately; list endpoints support stable sort + cursor
  pagination.
- CSRF protection for cookie-authenticated mutations (`.claude/rules/security.md`).

## Common failure & abuse cases

- Breaking change shipped in place on a v1 endpoint (field removed / semantics
  changed) with no new version.
- Missing object-level authz → IDOR (user reads another user's lead by id).
- Webhook verified against the parsed body, not the raw bytes → signature bypass.
- No idempotency key → retried POST creates duplicates.
- Unbounded list endpoint → expensive query / data scrape.
- Error body leaks a stack trace or DSN/connection string.
- Replay of an old webhook accepted (no timestamp window).

## Review checklist

- [ ] `openapi.yaml` updated and matches the handler.
- [ ] Version + deprecation window for public APIs.
- [ ] Path/query/header/body validation at the boundary.
- [ ] AuthN + object-level authz + tenant scoping server-side.
- [ ] Idempotency key on retryable mutations.
- [ ] Consistent error object; no secrets/traces leaked.
- [ ] Pagination + page-size cap on list endpoints.
- [ ] Webhooks: raw-body signature + replay window + fast ack + async processing.
- [ ] Timeouts, rate-limit responses, circuit breaking for provider calls.

## Required tests

- Contract tests: requests/responses conform to `openapi.yaml`.
- AuthZ tests: allowed vs denied principal, cross-tenant/owner denied.
- Idempotency test: duplicate key → single effect, identical response.
- Validation tests: malformed/oversized/unknown-field inputs rejected.
- Webhook tests: valid signature, tampered body, stale timestamp, replay.
- Pagination tests: limits enforced, stable ordering.

## Documentation requirements

- `docs/contracts/openapi.yaml` (source of truth).
- Module `CONTRACT.md`: sync APIs used/exposed.
- Sequence diagram in the relevant map for non-trivial request/webhook flows
  (`docs/architecture/diagrams/TEMPLATES.md`).
- Deprecation note + timeline for any removed/changed public field.

## Definition of done

- The contract exists first and matches the implementation; authz, idempotency,
  validation, pagination and webhook verification are implemented and tested; no
  unversioned breaking change; docs and diagrams updated.
