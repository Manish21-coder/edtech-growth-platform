# Module dependency map

Module ownership, allowed dependencies and prohibited cross-boundary access.
Enforces `.claude/rules/product-and-modules.md` and `.claude/rules/architecture.md`.

**Legend:** solid arrow = allowed dependency (via public interface or event) ·
red/`x` = prohibited. `[Proposed]` — no modules exist yet.

Last verified against commit: _pending first commit_

> Status: **Proposed** — the repository has no feature modules. This is the
> intended boundary model; update it as the first modules land.

## Intended module boundaries (Proposed)

```mermaid
flowchart TD
  subgraph shared["Shared packages (no domain logic leakage)"]
    ui["ui (design system)"]
    config["config (validated)"]
    events["events (schemas + publisher iface)"]
    analytics["analytics (tracking abstraction)"]
    auth["auth (helpers)"]
    obs["observability"]
  end

  domain["domain (pure logic)"]

  content["content / cms"]
  campaign["campaign surfaces"]
  lead["lead"]
  attribution["attribution"]
  checkout["checkout"]
  rules["rules / triggers"]
  reporting["reporting / export"]
  adminmod["admin"]

  content --> ui & config & events & domain & obs
  campaign --> ui & config & events & analytics & domain & obs
  campaign -->|"reads targeting via iface"| content
  lead --> config & events & domain & auth & obs
  lead -->|"consumes"| attribution
  attribution --> events & analytics & obs
  checkout --> events & domain & obs
  checkout -->|"consumes lead.qualified"| lead
  rules -->|"consumes events"| events
  rules --> obs
  reporting -->|"consumes events, reconciles"| events
  reporting --> obs
  adminmod --> ui & auth & config & obs
  adminmod -->|"configures"| content & campaign & rules

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class ui,config,events,analytics,auth,obs,domain,content,campaign,lead,attribution,checkout,rules,reporting,adminmod proposed;
```

## Allowed

- Depend on **shared packages** (`ui`, `config`, `events`, `analytics`, `auth`,
  `observability`) and on `domain` (pure logic).
- Read another module's data **only through its published interface** or by
  **consuming its events**.
- `admin` configures other modules through their configuration interfaces.

## Prohibited

- ❌ Importing another module's database models / running queries against its
  tables.
- ❌ Mutating another module's tables directly.
- ❌ UI/`ui` package containing provider credentials or DB access.
- ❌ `domain` importing a vendor SDK (CRM, payments, email, storage, analytics).
- ❌ Circular module dependencies.
- ❌ Emitting events for UI implementation details instead of domain facts.

## Register

| Module     | Owner | Owns (tables/config) | Reads (via iface/events) | Status   |
| ---------- | ----- | -------------------- | ------------------------ | -------- |
| _none yet_ | —     | —                    | —                        | Proposed |

Add a row and a `docs/modules/<module>/CONTRACT.md` when a module is created
(`.claude/skills/module-design/SKILL.md`).
