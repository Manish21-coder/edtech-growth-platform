---
paths:
  - "src/app/api/**"
  - "src/**/route.ts"
  - "src/**/route.tsx"
  - "docs/contracts/openapi.yaml"
  - "packages/api-contracts/**"
---

# API standards

Consolidates original master `CLAUDE.md` section **§6**. Applies whenever you touch
HTTP route handlers or the API contract.

- **Contract-first OpenAPI** specification for all external and cross-module HTTP
  APIs (`docs/contracts/openapi.yaml`).
- **Version** externally consumed APIs and define a deprecation window.
- Validate request **path, query, headers and body** at the boundary.
- Use consistent error objects with `code`, safe `message`, `request_id` and
  optional field errors.
- Apply authentication, **object-level authorization** and tenant scoping
  **server-side**.
- Use **idempotency keys** for lead creation, payment initiation, webhook
  processing and other retryable mutations.
- **Paginate** list endpoints; cap page size and query complexity.
- Set explicit **timeouts**, retry only safe operations, and use **circuit
  breaking** for unstable providers.
- **Verify webhook signatures against the raw request body**; enforce timestamps /
  replay windows where supported.
- **Never expose internal stack traces or provider secrets.**
- Generate API types / clients from the approved contract when practical.

Related: `security.md` (input validation, SSRF, secret handling), `events.md`
(events emitted from handlers), `observability.md` (request/trace IDs). Procedure:
`.claude/skills/api-design/SKILL.md`.
