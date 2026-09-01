# Observability & analytics

Consolidates original master `CLAUDE.md` section **§13**.

## Requirements

- Use **structured logs** with timestamp, level, service, environment, request ID,
  trace ID, event name and safe error code.
- Add **traces** across HTTP, database, queue and external-provider boundaries.
- Define business and technical **metrics** per module.
- Monitor latency, errors, saturation, queue age, dead letters, publish failures,
  webhook failures and data reconciliation gaps.
- Alerts must be **actionable and linked to runbooks** (`docs/runbooks/`).
- **Redact sensitive fields before telemetry leaves the process.**
- Separate operational telemetry from product analytics.
- Maintain analytics event definitions, owners and validation rules (see
  `events.md` and `docs/contracts/EVENT_CATALOG.md`).
- Prevent duplicate browser / server conversion events using stable event IDs.

## Scope note (current)

No telemetry backend is wired yet. When logging, tracing or metrics are introduced,
add the corresponding runbook and alert links in the same block. Procedures:
`.claude/skills/observability/SKILL.md`, `.claude/skills/analytics-and-attribution/SKILL.md`.
