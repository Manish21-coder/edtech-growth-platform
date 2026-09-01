# Privacy & EdTech data governance

Consolidates original master `CLAUDE.md` section **§12**. Design for applicable
privacy law and organizational policy; obtain legal review for the final
implementation, **particularly where minors are involved**. Maintain
`docs/privacy/DATA_INVENTORY.md`.

## Requirements

- Maintain a data inventory with owner, purpose, legal basis / consent,
  sensitivity, residency, retention and deletion method.
- Collect the **minimum** data needed for a declared purpose.
- Keep marketing consent **separate** from necessary service processing.
- Make consent records versioned and auditable; support withdrawal.
- Provide access, correction, export and deletion workflows where applicable.
- Define retention schedules and automated deletion / anonymization jobs.
- **Never expose student data in URLs, analytics dimensions or public exports.**
- Separate anonymous analytics identifiers from account identifiers where possible.
- Require explicit review before profiling, automated decision-making or
  behavioural targeting of minors.
- Do not share learner data with a vendor until purpose, contract, security and
  retention are approved.
- Use synthetic / redacted data in development and tests.
- Add a privacy impact review to **every** new event, integration and data field.

## Scope note (current)

No personal data is collected or stored yet. `docs/privacy/DATA_INVENTORY.md` seeds
the fields the roadmap will introduce (UTM parameters, lead form fields) as
**Proposed**. Procedure: `.claude/skills/privacy-and-edtech-data-governance/SKILL.md`.
