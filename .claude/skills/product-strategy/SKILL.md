---
name: product-strategy
description: Turn a growth/learning goal into a scoped block with a measurable outcome, before any design or code.
---

# Product strategy

Operationalizes the **Product manager** lens (`.claude/rules/authority-and-workflow.md`)
and `.claude/rules/product-and-modules.md`.

## Applicability & trigger conditions

Use when: a new module family is proposed; a stakeholder asks for "a feature"
without a stated outcome or metric; a block proposal is being written; scope is
growing mid-block; or two requests conflict on priority. Do **not** use this to
re-open a decision the product owner has already made in the current task.

## Decision framework

1. **Name the actor and the job.** Learner, parent, anonymous visitor, or admin —
   what are they trying to accomplish, and where does the current journey fail?
2. **State the outcome as a metric delta**, not an activity: "increase qualified
   lead rate on `/courses/*` from X to Y at the 75th percentile", not "add a form".
3. **Pick one primary metric + guardrails.** Guardrails always include: consent
   integrity, Core Web Vitals budget, accessibility, and no increase in spam/dupe
   leads.
4. **Choose the smallest vertical slice** that can move the metric and be shipped,
   observed and rolled back independently.
5. **Classify reversibility.** One-way-door decisions (event names, public URLs,
   data collected, pricing copy) require an ADR; two-way doors do not.
6. **Write non-goals explicitly** so scope creep is visible in review.

## Implementation standards

- Every block starts from the proposal template in
  `.claude/rules/authority-and-workflow.md`.
- Success is measured against **authoritative transactional state**, never an
  analytics count alone (`.claude/rules/lead-conversion.md`).
- Experiments declare audience, hypothesis, primary metric, guardrails and stop
  conditions before launch (`.claude/skills/growth-experimentation/SKILL.md`).
- Maintain a domain glossary in `docs/` so "lead", "qualified", "conversion",
  "trial" have one definition.
- Record assumptions in `docs/PROJECT_STATE.md`; convert relative dates to absolute.

## Common failure & abuse cases

- Vanity metric (page views) chosen instead of a business outcome.
- "Quick win" that quietly collects new PII with no legal basis or inventory entry.
- Dark-pattern pressure to hit a conversion target (fake urgency, pre-checked
  consent) — prohibited by `.claude/rules/lead-conversion.md`.
- Bundling three features into one block so none can be rolled back.
- Targeting or profiling minors without the review required by
  `.claude/rules/privacy.md`.

## Review checklist

- [ ] Outcome expressed as a measurable metric delta with a percentile.
- [ ] One primary metric; guardrails include consent, CWV, a11y, spam/dupe.
- [ ] Non-goals written down.
- [ ] Smallest shippable vertical slice identified.
- [ ] One-way-door decisions captured in an ADR.
- [ ] Privacy impact of any new data/field/event noted.
- [ ] Glossary terms defined/reused consistently.

## Required tests

- No code tests here, but the block's **verification plan** must name the metric
  instrumentation (event + reconciliation source) and how the guardrails are
  checked (a11y automation, Lighthouse/budget, dedupe test).

## Documentation requirements

- Block proposal in the PR/description and summarised in `docs/PROJECT_STATE.md`.
- `docs/ROADMAP.md` updated (status, sequence).
- New ADR for any one-way-door decision.
- Glossary entry for any new domain term.

## Definition of done

- The block has a single measurable outcome, explicit non-goals, named guardrails,
  and an instrumentation + reconciliation plan.
- `PROJECT_STATE.md` and `ROADMAP.md` reflect the decision.
- Any irreversible choice has an accepted ADR.
