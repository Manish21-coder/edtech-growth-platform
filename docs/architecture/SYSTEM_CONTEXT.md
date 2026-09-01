# System context

External actors and systems that interact with the platform. This is the
outermost view; internal containers are in `ARCHITECTURE_MAP.md`.

**Legend:** `[Implemented]` exists in code today · `[Proposed]` planned, not built.
Solid arrow = synchronous request · dashed arrow = asynchronous event/webhook.

Last verified against commit: _pending first commit_

> Status: mostly **Proposed** — only the Next.js web application skeleton exists
> today. Everything else below is planned.

```mermaid
flowchart TB
  %% ---- Actors ----
  visitor["Anonymous visitor<br/>(Implemented: can load the site)"]
  learner["Learner<br/>(Proposed)"]
  parent["Parent / guardian<br/>(Proposed)"]
  admin["Admin / content editor<br/>(Proposed)"]

  %% ---- System ----
  platform["EdTech Growth Platform<br/>Next.js web + admin + workers<br/>(Implemented: web skeleton only)"]

  %% ---- External systems (all Proposed) ----
  crm["CRM / ESP<br/>(Proposed)"]
  payments["Payment / subscription provider<br/>(Proposed)"]
  analytics["Analytics & attribution sink<br/>(Proposed)"]
  consent["Consent management platform<br/>(Proposed)"]
  storage["Object storage / CDN<br/>(Proposed)"]
  idp["Identity provider (admin MFA)<br/>(Proposed)"]
  telemetry["Telemetry backend (logs/traces/metrics)<br/>(Proposed)"]

  visitor --> platform
  learner --> platform
  parent --> platform
  admin --> platform

  platform -->|"lead sync (queued)"| crm
  platform -->|"checkout handoff"| payments
  payments -.->|"payment webhooks"| platform
  platform -.->|"domain + analytics events"| analytics
  platform -->|"consent state"| consent
  platform -->|"media, exports"| storage
  admin -->|"SSO + MFA"| idp
  platform -.->|"logs / traces / metrics"| telemetry

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class learner,parent,admin,crm,payments,analytics,consent,storage,idp,telemetry proposed;
```

## Actors

| Actor                  | Description                                                    | Status                   |
| ---------------------- | -------------------------------------------------------------- | ------------------------ |
| Anonymous visitor      | Unauthenticated user browsing landing/course pages.            | Implemented (site loads) |
| Learner                | Registered student using trials, courses, conversion journeys. | Proposed                 |
| Parent / guardian      | Consent giver / co-decision maker; extra privacy safeguards.   | Proposed                 |
| Admin / content editor | Configures pages, campaigns, targeting; role-gated.            | Proposed                 |

## External systems

All external systems are **Proposed**. None are configured; no credentials exist.
Each requires an ADR (and, where personal data flows, a DPA and a
`docs/privacy/DATA_INVENTORY.md` entry) before integration.
