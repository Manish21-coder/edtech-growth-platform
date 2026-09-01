# Runbook: <alert or operation name>

- **Status:** Proposed | Active
- **Owner:** <team / role>
- **Linked alert(s):** <alert name(s)> · **Severity:** SEV1 | SEV2 | SEV3
- **Related:** module `CONTRACT.md`, dashboards, ADRs

## When this fires

Plain-language description of the condition and what users are experiencing.

## First response (do this now)

1. Acknowledge the alert; declare an incident if user impact is broad
   (`.claude/skills/incident-response/SKILL.md`).
2. Check <dashboard link> for scope.
3. Mitigation options, safest first:
   - Roll back the most recent deploy.
   - Disable feature flag `<flag>`.
   - <other targeted mitigation>

## Diagnosis

- Key logs / traces: <queries>
- Common causes and how to confirm each.

## Resolution

Steps to fully resolve once mitigated.

## Verification

How to confirm recovery (metrics back to baseline, synthetic check green,
reconciliation clean).

## Aftermath

- Preserve evidence if security/data-related.
- Schedule a blameless postmortem; file action items with owners + dates.
- Add/adjust alerts and tests so this is caught faster next time.
