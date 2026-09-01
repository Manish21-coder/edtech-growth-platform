---
name: observability
description: Instrument structured logs, traces and metrics per module; actionable alerts linked to runbooks; redact PII.
---

# Observability

Operationalizes the **SRE** lens and `.claude/rules/observability.md`. Keep
operational telemetry separate from product analytics
(`.claude/skills/analytics-and-attribution/SKILL.md`).

> Status: Proposed — no telemetry backend is wired yet. Apply from the block that
> introduces logging/tracing/metrics.

## Applicability & trigger conditions

Use when: adding a service boundary, background job, queue consumer, or external
integration; a module has no metrics; an incident showed a blind spot; or adding an
alert.

## Decision framework

1. **Three signals, distinct jobs.** Logs = discrete events for debugging; traces =
   causal path across boundaries; metrics = aggregate health + SLOs.
2. **Instrument boundaries:** inbound HTTP, DB queries, queue publish/consume,
   external provider calls, cache. Propagate `trace_id` and `correlation_id`
   end to end.
3. **Metrics per module:** latency (p50/p95/p99), error rate, throughput,
   saturation, plus domain metrics (queue age, dead letters, publish failures,
   webhook failures, reconciliation gap).
4. **Alert on symptoms users feel** (SLO burn, error spike, queue age), not every
   fluctuation. Every alert links to a runbook and has an owner.
5. **Redact before export.** Sensitive fields never leave the process in logs,
   traces or metric labels.

## Implementation standards

- Structured JSON logs with: timestamp, level, service, environment, `request_id`,
  `trace_id`, event name, safe error `code`. No secrets/PII/tokens/OTPs/bodies.
- OpenTelemetry-compatible traces and semantic conventions where supported.
- Metric names/labels follow a documented convention; label cardinality bounded
  (no user id / email as a label).
- Dashboards and alert rules are code, reviewed, and version-controlled.
- Health/readiness endpoints; deploy + release markers on dashboards.
- Log sampling for high-volume paths; always-on for errors.

## Common failure & abuse cases

- `console.log(user)` dumps PII to the log store.
- High-cardinality metric label (email, lead id) → metrics backend blowup + cost.
- Alert on raw CPU that pages nightly and gets muted → real incident missed.
- Trace context dropped at the queue boundary → can't follow async flows.
- Alert with no runbook → responder improvises at 3 a.m.
- Operational logs and product analytics mixed → neither is trustworthy.
- No metric for dead-letter growth → poison messages pile up silently.

## Review checklist

- [ ] Logs structured, correlated, and redacted (no secrets/PII).
- [ ] Traces span HTTP/DB/queue/provider; context propagated across async.
- [ ] Per-module metrics: latency, errors, throughput, saturation + domain metrics.
- [ ] Alerts are symptom-based, owned, and link to a runbook.
- [ ] Metric label cardinality bounded.
- [ ] Dashboards/alerts are reviewed code.
- [ ] Operational telemetry separate from product analytics.
- [ ] Dead letters / publish failures / reconciliation gaps monitored.

## Required tests

- Log-redaction test: sensitive fields absent from emitted logs/traces.
- Trace-propagation test across an async (queue) hop.
- Metric-emission test for the module's key counters/histograms.
- Alert-rule test (fires on the intended condition, not on noise) where the
  platform supports it.

## Documentation requirements

- Module `CONTRACT.md`: monitoring & alerts (metrics, thresholds, runbook links).
- `docs/runbooks/` entry per alert.
- Telemetry field/label conventions in `docs/`.
- `docs/architecture/EVENT_FLOW_MAP.md`: where failures surface (DLQ, retries).

## Definition of done

- Each new boundary emits correlated, redacted logs + traces + module metrics;
  alerts are actionable, owned and runbook-linked; label cardinality is safe;
  dashboards/alerts are code; contracts and runbooks updated.
