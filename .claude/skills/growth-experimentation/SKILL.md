---
name: growth-experimentation
description: Run A/B tests and feature flags with a hypothesis, primary metric, guardrails, stop conditions and clean teardown.
---

# Growth experimentation

Operationalizes `.claude/rules/lead-conversion.md` (experiments require audience,
hypothesis, primary metric, guardrails, stop conditions) and the **Product
manager** lens.

## Applicability & trigger conditions

Use when: proposing an A/B/multivariate test; adding a feature flag that changes
user-visible behaviour; rolling out a change gradually; or evaluating an experiment
result.

## Decision framework

1. **Write the experiment doc first:** hypothesis ("changing X will improve Y
   because Z"), audience/segment, primary metric, guardrail metrics, minimum
   detectable effect, expected duration/sample, and explicit **stop conditions**
   (harm thresholds).
2. **One primary metric.** Guardrails always include consent integrity, CWV, error
   rate, accessibility, and spam/dupe lead rate.
3. **Assignment is stable and server-decided** where it affects SEO/PII; bucketing
   by a hashed stable id; log the assignment as an event with the variant.
4. **Analyze against authoritative state**, not analytics counts alone
   (`.claude/rules/lead-conversion.md`). Don't peek/stop early unless a guardrail
   trips.
5. **Every flag has an owner and an expiry date.** Ship the winner, delete the
   flag and the losing branch.

## Implementation standards

- Flags default to the safe/existing behaviour; a missing flag service = control.
- No flicker: variant decided before first paint (server) for above-the-fold
  changes.
- Emit `experiment.assigned` (or equivalent) with `experiment_id`, `variant`,
  hashed subject, consent state.
- Never experiment on: legal disclosures, consent wording, pricing accuracy,
  accessibility affordances, or anything targeting minors without review
  (`.claude/rules/privacy.md`).
- Keep experiment config in code/review, not ad-hoc in a dashboard only.

## Common failure & abuse cases

- No hypothesis or MDE → underpowered test, inconclusive, wasted weeks.
- Peeking daily and stopping on the first "significant" blip.
- Client-side variant swap → CLS/flicker, and bots/crawlers see random variants.
- Guardrails not monitored → conversion up but refunds/spam also up.
- Winner never rolled out; flag lingers for a year (flag debt).
- A/B test on consent copy or pricing (prohibited).
- Assignment not logged → can't reconstruct who saw what.

## Review checklist

- [ ] Experiment doc: hypothesis, audience, primary metric, guardrails, MDE,
      duration, stop conditions.
- [ ] Assignment stable, server-side where it matters, logged as an event.
- [ ] Flag defaults safe; owner + expiry set.
- [ ] No flicker for above-the-fold variants.
- [ ] Not testing disclosures/consent/pricing/a11y/minors.
- [ ] Analysis plan uses authoritative state; no early peeking.
- [ ] Teardown plan: ship winner, remove flag + dead branch.

## Required tests

- Assignment determinism test (same subject → same variant).
- Guardrail instrumentation test (metrics emit correctly per variant).
- Both branches covered by component/E2E tests.
- No-flicker test for server-decided variants.
- Post-experiment: flag-removal PR leaves one code path, tests updated.

## Documentation requirements

- Experiment doc stored in `docs/` (or linked) with results and decision.
- `EVENT_CATALOG.md`: assignment/exposure event.
- `docs/PROJECT_STATE.md`: active experiments and their stop conditions.
- ADR if the winning change is a one-way door.

## Definition of done

- The experiment had a written hypothesis and guardrails, stable logged
  assignment, no prohibited target, analysis against authoritative state, and a
  completed teardown (winner shipped, flag and dead branch removed).
