# Default architecture & repository boundaries

Consolidates original master `CLAUDE.md` sections **§3 (default architecture)** and
**§3.1 (repository boundaries)**.

## Default architecture

Use a **modular monolith first**. Create independently deployable services only when
measurement proves that isolation, scaling, ownership or security boundaries require
them.

Recommended default stack, unless the repository or product owner specifies
otherwise (record the exact chosen versions/dates in an ADR):

- TypeScript in strict mode.
- Next.js with the App Router for the public site and admin application.
- React Server Components by default; client components only where interaction
  requires them.
- PostgreSQL for transactional data.
- A type-safe ORM with reviewed migrations.
- Redis or a managed queue only for justified caching, rate control or background
  jobs.
- Object storage for media and exports.
- OpenAPI for synchronous HTTP contracts.
- CloudEvents-inspired envelopes for asynchronous events.
- OpenTelemetry-compatible traces, metrics and structured logs.
- Infrastructure as code for all non-trivial environments.

If most public pages are static, generate them at build/publish time and use
on-demand revalidation or targeted rebuilds. Keep core SEO content in
server-rendered / static HTML. Load only non-essential campaign personalisation on
the client.

## Current implementation vs. proposed

- **Implemented now:** a single Next.js application with the `src/` directory
  (modular monolith). Modules live as bounded folders inside `src/`.
- **Proposed (not yet built):** the `apps/*` + `packages/*` split below. Adopt it
  when measurement justifies the move; record the decision in an ADR. See
  `docs/architecture/decisions/ADR-0002-modular-monolith-nextjs-foundation.md`.

```text
apps/
  web/                 # public website
  admin/               # internal configuration UI
  worker/              # background jobs/event consumers when justified
packages/
  ui/                  # design system
  config/              # validated configuration
  domain/              # pure domain logic
  events/              # event schemas and publisher interfaces
  api-contracts/       # generated/validated API types
  analytics/           # tracking abstraction and taxonomy
  auth/                # authentication/authorization helpers
  observability/       # logging, tracing and metrics
  test-utils/
docs/
infra/
```

## Repository boundaries (enforced regardless of layout)

- UI code must not contain provider credentials or direct database access.
- Domain logic must not depend directly on a specific analytics, CRM, email,
  payment or storage vendor — go through adapter interfaces.
- Modules communicate through explicit interfaces only; no cross-module table
  access (see `product-and-modules.md`).
- Keep `docs/architecture/ARCHITECTURE_MAP.md` and
  `docs/architecture/MODULE_DEPENDENCY_MAP.md` current.
