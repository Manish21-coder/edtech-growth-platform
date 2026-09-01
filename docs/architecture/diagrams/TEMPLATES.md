# Mermaid diagram templates

Copy a block, rename the ids, keep the legend and the
`Last verified against commit:` line. Rules: stable node ids, mark `Proposed` vs
implemented, show trust boundaries + PII movement, distinguish sync (solid) from
async (dashed), name the source of truth. See
`.claude/rules/documentation-and-maps.md` and
`.claude/skills/documentation-maps-and-diagrams/SKILL.md`.

Validate a changed diagram by extracting **this one block** to a temp `.mmd` file
and running `npx --yes @mermaid-js/mermaid-cli` on it — do not add that CLI as a
project dependency, and never feed a whole Markdown file to it as Mermaid.

---

## 1. System architecture (flowchart, containers + trust boundaries)

```mermaid
flowchart TB
  %% Legend: [Impl]=implemented [Prop]=proposed | solid=sync dashed=async | subgraph=trust boundary | ((PII))=personal data
  %% Last verified against commit: <hash>
  actor["User / client (untrusted)"]

  subgraph trusted["Application trust boundary"]
    app["App container [Impl]"]
    api["API handlers [Prop]"]
  end

  subgraph data["Data stores"]
    db[("PostgreSQL ((PII)) [Prop]")]
  end

  ext["External processor ((PII)) [Prop]"]

  actor -->|"HTTPS"| app
  app --> api
  api --> db
  api -.->|"queued sync"| ext
  ext -.->|"signed webhook"| api

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class api,db,ext proposed;
```

---

## 2. Module dependencies (flowchart, allowed vs prohibited)

```mermaid
flowchart TD
  %% Legend: solid=allowed (interface/event) | "x"=prohibited | Last verified against commit: <hash>
  moduleA["module-a (owns table_a)"]
  moduleB["module-b (owns table_b)"]
  shared["shared/events"]

  moduleA -->|"consumes events"| shared
  moduleB -->|"publishes events"| shared
  moduleA -.->|"reads via public iface"| moduleB
  moduleA -. "x direct table_b access — PROHIBITED" .-> tableB[("table_b")]

  classDef prohibited stroke:#c0392b,color:#c0392b,stroke-dasharray:2 2;
  class tableB prohibited;
```

---

## 3. User journey (journey + flowchart with success / alternate / failure)

```mermaid
journey
  title Lead capture journey (p75 target)
  section Discover
    Land on campaign page: 4: Visitor
    Understand offer: 3: Visitor
  section Convert
    Click primary CTA: 4: Visitor
    Complete form step 1: 3: Visitor
    Give marketing consent: 3: Visitor
    Submit: 4: Visitor
  section Outcome
    See thank-you + next step: 5: Visitor
```

```mermaid
flowchart TD
  start(["Entry"]) --> step["Action"]
  step --> ok{"Success?"}
  ok -- yes --> done(["Success state"])
  ok -- "validation error" --> alt["Inline errors, input preserved"] --> step
  ok -- "server error" --> fail["Actionable error + retry (nothing lost)"]
```

---

## 4. API & webhook sequence (signature verification + bounded retries)

```mermaid
sequenceDiagram
  autonumber
  participant C as Client
  participant A as API handler
  participant D as DB
  participant Q as Queue/Outbox
  C->>A: POST /leads (Idempotency-Key)
  A->>A: validate path/query/headers/body
  A->>D: begin tx
  A->>D: upsert lead (dedupe on normalized key)
  A->>Q: write outbox event (same tx)
  A->>D: commit
  A-->>C: 201 Created { id } (or 200 on idempotent replay)
  Note over A,Q: relay publishes lead.submitted.v1 asynchronously

  participant P as Payment provider
  P->>A: POST /webhooks/payments (signature, timestamp)
  A->>A: verify HMAC over RAW body + replay window
  alt invalid signature or stale timestamp
    A-->>P: 400 (no processing)
  else valid
    A->>Q: enqueue for async processing
    A-->>P: 200 fast ack
  end
```

---

## 5. Event flow (producer → outbox → transport → consumer → DLQ)

```mermaid
flowchart LR
  prod["Producer module"] --> tx[("DB tx")] --> ob[("Outbox")]
  ob --> relay["Relay"] -.->|"event.name.v1"| bus{{"Bus / queue"}}
  bus -.-> c1["Consumer 1 (idempotent)"]
  bus -.-> c2["Consumer 2 (idempotent)"]
  c1 -. "retry: backoff+jitter, then" .-> dlq[("DLQ")]
  dlq -->|"alert + safe replay"| relay
```

---

## 6. State transitions (stateDiagram-v2: lead / campaign / page / trial / subscription)

```mermaid
stateDiagram-v2
  [*] --> New
  New --> Deduplicated: matches existing (lead.deduplicated)
  New --> Qualified: passes rules (lead.qualified)
  New --> Disqualified: fails rules
  Qualified --> Converted: checkout.succeeded (reconciled)
  Qualified --> Nurture: no action in window
  Nurture --> Qualified: re-engages
  Converted --> [*]
  note right of Converted
    Source of truth = payment provider
    transactional state, not analytics.
  end note
```

---

## 7. Data relationships (erDiagram)

```mermaid
erDiagram
  LEAD ||--o{ CONSENT_RECORD : "has"
  LEAD ||--o{ ATTRIBUTION_TOUCH : "has"
  LEAD }o--|| CAMPAIGN : "sourced from"
  PAGE ||--o{ PAGE_REVISION : "versioned by"
  CAMPAIGN ||--o{ CAMPAIGN_SURFACE : "renders"
  LEAD {
    uuid id PK
    string email_normalized "((PII)) unique"
    string phone_e164 "((PII))"
    timestamptz created_at
  }
  CONSENT_RECORD {
    uuid id PK
    uuid lead_id FK
    string purpose
    string text_version
    timestamptz granted_at
    timestamptz withdrawn_at "nullable"
  }
```

---

## 8. Security trust boundaries & PII movement (subgraph boundaries, PII-tagged edges)

```mermaid
flowchart TB
  %% Legend: subgraph=trust boundary | edge label ((PII))=personal data crosses here | Last verified against commit: <hash>
  subgraph untrusted["Untrusted (browser / internet)"]
    user["Visitor / learner"]
    webhookSrc["Payment provider"]
  end

  subgraph app["Trusted app"]
    edge["Input validation + authz + rate limit"]
    svc["Domain services"]
    relay["Outbox relay"]
  end

  subgraph stores["Data at rest"]
    db[("PostgreSQL ((PII))")]
    obj[("Object storage ((PII) exports)")]
  end

  subgraph processors["External processors"]
    crm["CRM / ESP ((PII))"]
    sink["Analytics sink (no PII)"]
  end

  user -->|"form input ((PII))"| edge
  webhookSrc -.->|"signed webhook (no PII beyond ref)"| edge
  edge --> svc --> db
  svc --> obj
  svc --> relay
  relay -.->|"queued sync ((PII))"| crm
  relay -.->|"events (no PII)"| sink

  classDef boundary fill:#fff,stroke-dasharray:3 3;
```
