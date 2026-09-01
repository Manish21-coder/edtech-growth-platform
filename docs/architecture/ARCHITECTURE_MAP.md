# Architecture map

System / container / component boundaries, data stores, external systems and trust
boundaries. Pairs with `SYSTEM_CONTEXT.md` (external view) and
`MODULE_DEPENDENCY_MAP.md` (module edges).

**Legend:** `[Implemented]` / `[Proposed]`. Solid = sync call · dashed = async
event. Subgraphs are trust boundaries. `((PII))` marks where personal data would
enter/rest/transform.

Last verified against commit: _pending first commit_

## Current (Implemented)

```mermaid
flowchart TB
  subgraph browser["Browser (untrusted)"]
    rsc_client["React client components<br/>(minimal)"]
  end

  subgraph app["Next.js app — modular monolith (trusted)"]
    server["App Router / RSC + route handlers<br/>[Implemented: default page only]"]
    modules["Feature modules in src/<br/>[Proposed — none yet]"]
  end

  rsc_client -->|"HTTP / RSC payload"| server
  server --- modules

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class modules proposed;
```

Today the repository contains a single Next.js application: App Router, RSC by
default, one static route (`/`), Tailwind v4, strict TypeScript. No database, no
API routes, no auth, no workers.

## Target (Proposed)

```mermaid
flowchart TB
  subgraph edge["Edge / CDN (Proposed)"]
    cdn["CDN + cache<br/>(Proposed)"]
  end

  subgraph trusted["Application trust boundary (Proposed)"]
    web["web — public site (Next.js)<br/>(Proposed split from monolith)"]
    admin["admin — configuration UI<br/>(Proposed)"]
    api["API route handlers (OpenAPI)<br/>(Proposed)"]
    worker["worker — event consumers / jobs<br/>(Proposed)"]
    outbox["Transactional outbox<br/>(Proposed)"]
  end

  subgraph data["Data stores (Proposed)"]
    pg[("PostgreSQL ((PII))<br/>(Proposed)")]
    redis[("Redis / queue<br/>(Proposed)")]
    obj[("Object storage ((PII in exports))<br/>(Proposed)")]
  end

  subgraph ext["External processors (Proposed)"]
    crm["CRM / ESP ((PII))"]
    pay["Payments ((PII))"]
    sink["Analytics sink"]
    otel["Telemetry backend"]
    idp["Identity provider"]
  end

  cdn --> web
  web -->|"sync"| api
  admin -->|"sync"| api
  api --> pg
  api --> outbox
  outbox -.->|"events"| redis
  redis -.-> worker
  worker --> pg
  worker -.->|"queued sync ((PII))"| crm
  api -->|"checkout handoff"| pay
  pay -.->|"signed webhooks"| api
  worker -.->|"events"| sink
  api -.->|"logs/traces/metrics"| otel
  admin -->|"SSO + MFA"| idp
  api --> obj

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class cdn,web,admin,api,worker,outbox,pg,redis,obj,crm,pay,sink,otel,idp proposed;
```

## Trust boundaries

| Boundary                     | Notes                                                                            | Status      |
| ---------------------------- | -------------------------------------------------------------------------------- | ----------- |
| Browser → server             | All input untrusted; validate + encode at the boundary.                          | Implemented |
| Server → PostgreSQL          | Parameterized queries only; PII at rest here.                                    | Proposed    |
| Server ↔ external processors | Adapters + allowlists + signature verification; PII leaves here (CRM, payments). | Proposed    |
| Admin → identity provider    | MFA required for privileged roles.                                               | Proposed    |
| Outbox → queue → worker      | Async; at-least-once; idempotent consumers; DLQ.                                 | Proposed    |

## Change process

Before a block: add the change here as a `Proposed` node/edge. After: promote to
implemented, remove stale proposed elements, update
`Last verified against commit:`. See
`.claude/skills/documentation-maps-and-diagrams/SKILL.md`.
