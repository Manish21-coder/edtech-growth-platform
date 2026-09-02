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

## Anonymous visitor → category discovery (Proposed)

Homepage-specific journey. Traceability: `docs/requirements/HOMEPAGE_REQUIREMENTS.md`
(HP-010–HP-150), `docs/modules/homepage/CONTRACT.md`.

```mermaid
flowchart TD
  start(["Visitor lands on homepage"]) --> hero["Hero banner carousel<br/>(campaign.impression_recorded)"]
  hero --> intro["Introduction + category chips (HP-030/031)"]
  intro -- "knows category" --> chipClick["Chip click → deep-link to category page<br/>(homepage.category_selected, cta.clicked)"]
  intro -- "undecided" --> why["Why Choose Parikshe"] --> discover["Exam/Category Discovery cards (HP-050)"]
  discover --> explore["Explore Now → category/study page"]
  intro -- "5s dwell elapses" --> popupElig{"Popup eligible?<br/>(HP-320-327: 1x/session, 24h after dismiss, suppressed 30d post-lead)"}
  popupElig -- yes --> popup["Promo popup shown<br/>(homepage.popup_viewed)"]
  popup -- dismiss --> popupDismiss["Dismissed<br/>(homepage.popup_dismissed, 24h suppression)"]
  popup -- click --> popupClick["homepage.popup_clicked<br/>(not a completed conversion — HP-324)"]
  discover --> results["Category-wise Results"] --> stories["Student Stories / Testimonials"]
  stories --> faq["FAQ"]
  faq --> leadEntry{"Lead-capture entry point<br/>(HP-410/411/412)"}
  leadEntry --> form["Shared lead form<br/>(default/focused/error/submitting/success/failure/duplicate/consent states)"]
  form --> submitOk["lead.submitted<br/>(HP-323: suppress lead-gen popups 30d)"]
  form -- error --> formErr["Inline error + retry<br/>(input preserved)"] --> form

  classDef proposed stroke-dasharray:4 3,fill:#fff;
  class start,hero,intro,chipClick,why,discover,explore,popupElig,popup,popupDismiss,popupClick,results,stories,faq,leadEntry,form,submitOk,formErr proposed;
```

## Parent / guardian (Proposed)

Consent-giving and oversight flows for users below the local age of consent —
parental consent capture, preference management, and data-subject requests. To be
designed with `.claude/skills/privacy-and-edtech-data-governance/SKILL.md` and
legal review before any minor data is collected.
