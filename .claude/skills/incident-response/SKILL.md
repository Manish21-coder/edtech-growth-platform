---
name: incident-response
description: Detect, triage, mitigate and learn from production incidents — comms, roles, timeline, blameless postmortem.
---

# Incident response

Operationalizes the **SRE** lens, `.claude/rules/observability.md` and
`.claude/rules/devops.md`. Pairs with `.claude/skills/security-engineering/SKILL.md`
for security incidents.

> Status: Proposed — no production system or on-call exists yet. Establish this
> process before the first production launch (delivery stage 12).

## Applicability & trigger conditions

Activate when: an SLO is breaching or breached; data integrity, consent, payments
or auth are affected; a security compromise is suspected; a deploy caused a
regression; or a third party this platform depends on is down and users are
impacted.

## Decision framework

1. **Declare early.** If unsure whether it's an incident, declare it — downgrading
   is cheap.
2. **Assign roles:** Incident Commander (decisions + comms), Ops lead (hands on
   keyboard), Scribe (timeline), Comms (stakeholders/users). One person may hold
   several early on.
3. **Severity by impact:** SEV1 = data loss / breach / core journey down for many;
   SEV2 = degraded/partial; SEV3 = minor/contained.
4. **Mitigate before diagnose.** Roll back the recent deploy, disable the feature
   flag, shed load, or fail over — restore users first; root cause later.
5. **Preserve evidence** for security/data incidents (logs, snapshots) before
   destructive remediation.
6. **Privacy/legal:** a personal-data breach has notification obligations — engage
   the privacy owner immediately (`.claude/rules/privacy.md`).

## Implementation standards

- Every alert links to a runbook with first-response steps
  (`docs/runbooks/`).
- Rollback is one command and rehearsed (`.claude/skills/devops-and-sre/SKILL.md`).
- Maintain a live timeline (UTC) from detection to resolution.
- Status updates on a fixed cadence (e.g. every 30 min for SEV1) even when "no
  change".
- Customer comms are plain, honest, non-speculative.
- After resolution: a **blameless postmortem** within a set window with
  contributing factors, what went well/poorly, and dated action items with owners.
- Feed action items back into `docs/ROADMAP.md` / `PROJECT_STATE.md`; add
  regression tests and missing alerts.

## Common failure & abuse cases

- Debugging root cause for an hour while users are down instead of rolling back.
- No IC → three people trying different fixes simultaneously.
- Destroying logs/DB state during remediation, losing breach evidence.
- Postmortem assigns blame → people hide the next incident.
- Action items with no owner/date → never done, incident recurs.
- Not engaging privacy/legal on a data breach → missed notification window.
- Silent war-room; stakeholders find out from customers.

## Review checklist

- [ ] Incident declared with a severity and an IC.
- [ ] Roles assigned; timeline being kept.
- [ ] Mitigation attempted before deep diagnosis (rollback/flag/failover).
- [ ] Evidence preserved for security/data incidents.
- [ ] Privacy owner engaged if personal data is involved.
- [ ] Stakeholder + user comms on a cadence.
- [ ] Blameless postmortem scheduled; action items have owners + dates.
- [ ] Regression tests + new alerts created from the postmortem.

## Required tests

- Game-day / failure-injection drills for top risk scenarios (provider outage,
  bad deploy, DB failover, queue backlog).
- Rollback and restore drills (shared with the DevOps skill).
- Alert-to-runbook coverage check: every SEV-worthy condition has an alert and a
  runbook.

## Documentation requirements

- `docs/runbooks/` — per-alert first response + this incident process doc.
- Incident timeline + postmortem stored in `docs/` (e.g. `docs/runbooks/incidents/`).
- `THREAT_MODEL.md` updated if the incident revealed a new threat/mitigation.
- Action items tracked in `docs/ROADMAP.md` / `PROJECT_STATE.md`.

## Definition of done

- The incident is mitigated and confirmed resolved; users and stakeholders were
  kept informed; evidence was preserved where needed; a blameless postmortem is
  published with owned, dated action items; and detection/tests were improved so
  the same failure is caught faster next time.
