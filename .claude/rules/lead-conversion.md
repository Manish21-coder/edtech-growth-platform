---
paths:
  - "src/**/lead/**"
  - "src/**/leads/**"
  - "src/**/forms/**"
  - "src/**/checkout/**"
  - "src/**/attribution/**"
  - "src/**/experiments/**"
---

# Lead generation & conversion

Consolidates original master `CLAUDE.md` section **§8**. Applies to lead capture,
forms, attribution, checkout handoff and experiments.

- **Progressive forms** — request only information needed at the current step.
- Preserve draft input safely through recoverable navigation.
- **Normalize** phone / email consistently and deduplicate with documented rules.
- Capture **first-touch, latest-touch and conversion-touch attribution
  separately**.
- Preserve **raw UTM values** plus normalized reporting dimensions.
- Record consent purpose, text / version, source, time and withdrawal.
- Use server-side validation, spam protection, rate limiting and bot-resistant
  honeypots.
- Route integrations through **provider adapters**; queue external CRM writes where
  appropriate.
- Provide **reconciliation** for failed or delayed CRM / payment / webhook
  deliveries.
- **Do not count an analytics event as business success** — reconcile against
  authoritative transactional state.
- Feature flags and experiments require a defined audience, hypothesis, primary
  metric, guardrails and stop conditions.
- **Never use dark patterns, fake urgency, pre-checked consent or misleading trial /
  pricing language.**

Related: `privacy.md` (consent, minimisation, minors), `events.md` (`lead.*`,
`checkout.*`, `payment.*`), `api.md` (idempotency keys). Procedures:
`.claude/skills/lead-generation-and-conversion/SKILL.md`,
`.claude/skills/growth-experimentation/SKILL.md`,
`.claude/skills/analytics-and-attribution/SKILL.md`.
