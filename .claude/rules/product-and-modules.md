# Product vision, modular design & delivery sequence

Consolidates original master `CLAUDE.md` sections **§1 (product vision)**,
**§4 (modular design contract)** and **§18 (initial delivery sequence)**.

## Product vision

Build one configurable platform where independent modules can be added without
rewriting the foundation. Do **not** couple the core platform to a single campaign,
product, course, cohort, provider or page type.

Every meaningful module action must be capable of:

- emitting a versioned domain or analytics event;
- consuming authorized events;
- calling documented internal or external APIs where required;
- being configured through an admin interface when configuration is a product
  requirement;
- exposing observable success/failure states;
- degrading safely when an optional integration is unavailable.

Expected module families (extensible list):

- SEO and campaign landing pages;
- lead forms, lead routing, deduplication, qualification and enrichment;
- banners, pop-ups, announcement bars, sticky CTAs and notification campaigns;
- course discovery, recommendations and conversion journeys;
- checkout-intent, payment and subscription integration adapters;
- free-trial and paid-plan journeys;
- UTM and attribution capture;
- rules and trigger automation;
- experiments and feature flags;
- content, testimonials, video and FAQ management;
- data import/export and reporting;
- consent, preference and communication management;
- admin configuration, preview, scheduling, approval and audit history.

## Modular design contract

Every module must have `docs/modules/<module>/CONTRACT.md` containing:

- purpose and owner;
- public interfaces;
- configuration schema and defaults;
- roles and permissions;
- data owned and data read;
- events produced and consumed;
- synchronous APIs used / exposed;
- UI entry points and states;
- dependencies and integration adapters;
- idempotency and retry behaviour;
- monitoring and alerts;
- tests and acceptance criteria;
- rollout, migration and rollback plan.

Modules communicate through explicit interfaces. **Do not import another module's
database implementation or mutate its tables directly.** UI code must not contain
provider credentials or direct database access. Domain logic must not depend
directly on a specific analytics, CRM, email, payment or storage vendor.

Use `docs/modules/_TEMPLATE/CONTRACT.md` as the starting point. Keep
`docs/architecture/MODULE_DEPENDENCY_MAP.md` current with allowed and prohibited
dependencies.

## Initial delivery sequence

Unless the product owner changes priorities, deliver in this order. Each stage must
produce a demonstrable vertical outcome.

1. Discovery, scope, domain glossary and success metrics.
2. Repository foundation, environments and CI quality gates.
3. Design tokens, component library and accessible application shell.
4. Identity, roles, admin security and audit log.
5. Content schemas, page renderer and preview.
6. Publish pipeline, revisions, rollback and targeted cache invalidation.
7. Event SDK, catalog, consent-aware analytics and observability.
8. Lead form vertical slice with dedupe, consent and CRM adapter.
9. Configurable campaign surfaces and targeting.
10. Rules / triggers and reliable background processing.
11. Reporting / export and reconciliation.
12. Hardening, load testing, disaster recovery and production launch review.
