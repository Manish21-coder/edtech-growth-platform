# User flow map

Learner, parent, anonymous visitor and admin journeys — success, alternate and
failure paths. Update whenever a route or journey changes
(`.claude/rules/documentation-and-maps.md`).

**Legend:** `[Implemented]` / `[Proposed]`.

Last verified against commit: _pending first commit_

> Status: **Proposed** — no product journeys are built. The only implemented flow
> is "visitor loads the home page". The flows below are planned targets.

## Anonymous visitor → lead (Proposed)

```mermaid
flowchart TD
  start(["Visitor arrives via ad / search / referral"]) --> land["Landing page<br/>(server-rendered, UTM captured)"]
  land --> understand{"Understood the offer?"}
  understand -- no --> scroll["Scroll / read more sections"] --> understand
  understand -- yes --> cta["Clicks primary CTA"]
  cta --> form["Progressive lead form (step 1)"]
  form --> validate{"Server-side validation + anti-spam"}
  validate -- fail --> formErr["Inline errors + summary<br/>(input preserved)"] --> form
  validate -- pass --> consent["Consent capture<br/>(marketing separate, not pre-checked)"]
  consent --> submit["Submit (Idempotency-Key)"]
  submit --> dedupe{"Dedupe on normalized email/phone"}
  dedupe -- duplicate --> dupOk["Thank-you<br/>(lead.deduplicated emitted)"]
  dedupe -- new --> ok["Thank-you + next step<br/>(lead.submitted emitted via outbox)"]
  submit -- server error --> retry["Error state + retry<br/>(no lead lost; queued)"]

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class land,understand,scroll,cta,form,validate,formErr,consent,submit,dedupe,dupOk,ok,retry proposed;
```

## Learner → trial → paid (Proposed)

```mermaid
stateDiagram-v2
  [*] --> Anonymous
  Anonymous --> Registered: sign up
  Registered --> TrialActive: start trial (trial.started)
  TrialActive --> TrialEnded: trial period elapses (trial.ended)
  TrialActive --> Converting: starts checkout (checkout.started)
  TrialEnded --> Converting: starts checkout
  Converting --> Subscribed: payment.succeeded (subscription.started)
  Converting --> Registered: payment.failed / abandoned
  Subscribed --> [*]
  note right of Converting
    Business success is confirmed against
    the payment provider's authoritative
    state, not an analytics event.
  end note
```

## Admin → author → publish (Proposed)

```mermaid
flowchart TD
  a(["Admin signs in (SSO + MFA)"]) --> edit["Edit page / campaign<br/>(structured blocks, schema-validated)"]
  edit --> preview["Preview (unindexed, access-controlled)"]
  preview --> review{"Approval required by policy?"}
  review -- yes --> approver["Reviewer approves / rejects"]
  approver -- rejected --> edit
  approver -- approved --> publish
  review -- no --> publish["Publish (immutable revision)"]
  publish --> checks{"Smoke + accessibility checks pass?"}
  checks -- no --> blocked["Publish blocked + report"] --> edit
  checks -- yes --> promote["Atomic promote + scoped cache purge<br/>(content.published emitted, audit recorded)"]
  promote --> rollbackReady["Previous deploy retained for one-click rollback"]

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class edit,preview,review,approver,publish,checks,blocked,promote,rollbackReady proposed;
```

## Parent / guardian (Proposed)

Consent-giving and oversight flows for users below the local age of consent —
parental consent capture, preference management, and data-subject requests. To be
designed with `.claude/skills/privacy-and-edtech-data-governance/SKILL.md` and
legal review before any minor data is collected.
