# EdTech Growth Platform — Master Development Instructions

## 0. Purpose and authority

This file is the operating contract for Claude and every contributor working on this repository. Build a production-grade, modular EdTech web application focused on lead generation, learner engagement, conversion, attribution, campaign execution, and data extraction.

Follow instructions in this order:

1. Explicit instructions from the product owner in the current task.
2. This file.
3. Approved architecture decision records (ADRs) and module contracts.
4. Existing repository conventions.
5. Framework defaults and general best practices.

Never silently override a higher-priority instruction. If requirements conflict, pause and document the conflict and recommended resolution.

## 1. Product vision

Build one configurable platform where independent modules can be added without rewriting the foundation. Every meaningful module action must be capable of:

- emitting a versioned domain or analytics event;
- consuming authorized events;
- calling documented internal or external APIs where required;
- being configured through an admin interface when configuration is a product requirement;
- exposing observable success/failure states;
- degrading safely when an optional integration is unavailable.

Expected module families include:

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

This list is extensible. Do not couple the core platform to a single campaign, product, course, cohort, provider or page type.

## 2. Required working method: build in blocks

Development must proceed in bounded blocks. Do not attempt the entire platform in one unreviewable change.

### 2.1 Block lifecycle

For every block:

1. **Read context:** read this file, `docs/PROJECT_STATE.md`, relevant ADRs, module contract, event catalog and API specification.
2. **Define outcome:** write the user outcome, scope, non-goals, acceptance criteria, risks and dependencies.
3. **Inspect first:** inspect existing code, tests and configuration before proposing changes.
4. **Design:** define data model, permission rules, API changes, events, UI states, failure behaviour and observability.
5. **Implement vertically:** deliver the smallest end-to-end working slice, not disconnected layers.
6. **Verify:** run types, lint, unit, integration, accessibility, security and relevant end-to-end tests.
7. **Review:** inspect the diff for security, privacy, performance, accessibility and accidental scope expansion.
8. **Record:** update project state, event/API documentation, ADRs and remaining work.
9. **Map:** update and verify all affected architecture, user-flow, event-flow and dependency diagrams.
10. **Handoff:** provide changed files, verification evidence, migrations, deployment notes, risks and the next recommended block.

Only one block may be marked `IN_PROGRESS` at a time.

### 2.2 Mandatory context files

Create and maintain:

```text
CLAUDE.md
docs/PROJECT_STATE.md
docs/ROADMAP.md
docs/architecture/SYSTEM_CONTEXT.md
docs/architecture/ARCHITECTURE_MAP.md
docs/architecture/USER_FLOW_MAP.md
docs/architecture/EVENT_FLOW_MAP.md
docs/architecture/MODULE_DEPENDENCY_MAP.md
docs/architecture/decisions/ADR-XXXX-title.md
docs/contracts/EVENT_CATALOG.md
docs/contracts/openapi.yaml
docs/modules/<module>/CONTRACT.md
docs/runbooks/
docs/security/THREAT_MODEL.md
docs/privacy/DATA_INVENTORY.md
```

`PROJECT_STATE.md` must remain concise and contain:

- current block and status;
- completed blocks;
- decisions and assumptions;
- active interfaces and schema versions;
- open risks/blockers;
- exact verification commands;
- next recommended action.

Do not rely on chat memory for architectural decisions. Persist them in the repository.

### 2.3 Living maps and diagrams are mandatory

Claude must maintain the following repository-backed maps as part of every relevant feature, refactor or integration. These files are working context, not optional presentation documents:

- `ARCHITECTURE_MAP.md`: system/container/component boundaries, data stores, external systems and trust boundaries.
- `USER_FLOW_MAP.md`: learner, parent, anonymous visitor and admin journeys, including success, alternate and failure paths.
- `EVENT_FLOW_MAP.md`: event producers, names/versions, transport, consumers, retries, dead-letter handling and business outcomes.
- `MODULE_DEPENDENCY_MAP.md`: module ownership, allowed dependencies and prohibited cross-boundary access.

Use Mermaid diagrams stored inside Markdown so diagrams remain version-controlled, reviewable and renderable. Use the smallest useful diagram type:

- flowchart for architecture, module relationships and decision paths;
- sequence diagram for API, webhook, publish, lead and payment journeys;
- state diagram for lead, campaign, page, trial and subscription lifecycles;
- entity-relationship diagram for important data-model relationships.

Diagram rules:

- Every node uses a stable identifier; changing display text must not break references.
- Add a short legend and a `Last verified against commit:` field.
- Link each feature/module contract to the exact diagrams it affects.
- Mark proposed elements clearly; never present planned components as implemented.
- Show trust boundaries and locations where PII enters, leaves, is stored or is transformed.
- Distinguish synchronous calls from asynchronous events and identify the source of truth.
- Keep diagrams readable; split large maps into a high-level map and focused module diagrams.
- Mermaid diagrams do not replace OpenAPI, event schemas, migrations or written failure contracts.

Before implementing a block, inspect the relevant maps and add a proposed delta. Before declaring the block complete, update diagrams to the actual implementation, remove stale proposed elements and verify diagram paths/names against code and contracts.

If a change alters a route, module boundary, API, event, data owner, external integration, role, state transition or user journey without updating the affected map, the block is incomplete.

### 2.4 Required block proposal template

Before material implementation, provide:

```markdown
## Block: <name>
Outcome:
Scope:
Non-goals:
Affected modules:
Data changes:
API changes:
Events produced/consumed:
Maps/diagrams affected:
Proposed diagram delta:
Permissions/privacy:
UI states:
Failure and rollback plan:
Acceptance criteria:
Verification plan:
```

## 3. Default architecture

Use a modular monolith first. Create independently deployable services only when measurement proves that isolation, scaling, ownership or security boundaries require them.

Recommended default stack, unless the repository or product owner specifies otherwise:

- TypeScript in strict mode.
- Next.js with the App Router for the public site and admin application.
- React Server Components by default; client components only where interaction requires them.
- PostgreSQL for transactional data.
- A type-safe ORM with reviewed migrations.
- Redis or managed queue only for justified caching, rate control or background jobs.
- Object storage for media and exports.
- OpenAPI for synchronous HTTP contracts.
- CloudEvents-inspired envelopes for asynchronous events.
- OpenTelemetry-compatible traces, metrics and structured logs.
- Infrastructure as code for all non-trivial environments.

If most public pages are static, generate them at build/publish time and use on-demand revalidation or targeted rebuilds. Keep core SEO content in server-rendered/static HTML. Load only non-essential campaign personalisation on the client.

### 3.1 Repository boundaries

Prefer a structure such as:

```text
apps/
  web/                 # public website
  admin/               # internal configuration UI
  worker/              # background jobs/event consumers when justified
packages/
  ui/                  # design system
  config/              # validated configuration
  domain/              # pure domain logic
  events/              # event schemas and publisher interfaces
  api-contracts/       # generated/validated API types
  analytics/           # tracking abstraction and taxonomy
  auth/                # authentication/authorization helpers
  observability/       # logging, tracing and metrics
  test-utils/
docs/
infra/
```

Enforce boundaries. UI code must not contain provider credentials or direct database access. Domain logic must not depend directly on a specific analytics, CRM, email, payment or storage vendor.

## 4. Modular design contract

Every module must have `docs/modules/<module>/CONTRACT.md` containing:

- purpose and owner;
- public interfaces;
- configuration schema and defaults;
- roles and permissions;
- data owned and data read;
- events produced and consumed;
- synchronous APIs used/exposed;
- UI entry points and states;
- dependencies and integration adapters;
- idempotency and retry behaviour;
- monitoring and alerts;
- tests and acceptance criteria;
- rollout, migration and rollback plan.

Modules communicate through explicit interfaces. Do not import another module's database implementation or mutate its tables directly.

## 5. Event-first architecture

### 5.1 Event rules

Emit events for meaningful facts, not UI implementation details. Examples:

```text
page.viewed
cta.clicked
lead.submitted
lead.deduplicated
lead.qualified
campaign.impression_recorded
campaign.clicked
course.viewed
checkout.started
payment.initiated
payment.succeeded
payment.failed
subscription.started
trial.started
trial.ended
content.published
admin.configuration_changed
export.completed
```

Use past tense for facts. Never rename or change the meaning of a published event in place; create a new version.

### 5.2 Required event envelope

Each event must include:

```json
{
  "specversion": "1.0",
  "id": "unique-event-id",
  "type": "lead.submitted.v1",
  "source": "module-or-service",
  "time": "RFC3339 timestamp",
  "subject": "non-sensitive entity reference",
  "correlation_id": "journey-or-request-id",
  "causation_id": "triggering-event-id-if-any",
  "tenant_id": "tenant-or-brand-id-if-applicable",
  "actor": { "type": "anonymous|user|admin|system", "id": "opaque-id" },
  "context": {
    "session_id": "opaque-id",
    "page_id": "stable-page-id",
    "utm": {},
    "consent_state": "granted|denied|unknown|not_required"
  },
  "data": {}
}
```

Do not place raw passwords, tokens, full payment data, unnecessary PII or secrets in events. Hash or tokenize identifiers only when the documented use permits it.

### 5.3 Delivery guarantees

- Producers use an outbox or equivalent atomic publishing pattern for business-critical events.
- Consumers are idempotent and maintain a processed-event key or equivalent protection.
- Retries use bounded exponential backoff with jitter.
- Poison messages go to a dead-letter path with alerting and safe replay.
- Event order must not be assumed unless the transport and partitioning contract guarantee it.
- Schemas are validated at production boundaries and compatibility-tested in CI.
- Analytics failure must never block the primary learner action.

Maintain the authoritative catalog in `docs/contracts/EVENT_CATALOG.md`, including schema, owner, classification, retention and consumers.

## 6. API standards

- Contract-first OpenAPI specification for all external and cross-module HTTP APIs.
- Version externally consumed APIs and define a deprecation window.
- Validate request path, query, headers and body at the boundary.
- Use consistent error objects with `code`, safe `message`, `request_id` and optional field errors.
- Apply authentication, object-level authorization and tenant scoping server-side.
- Use idempotency keys for lead creation, payment initiation, webhook processing and other retryable mutations.
- Paginate list endpoints; cap page size and query complexity.
- Set explicit timeouts, retry only safe operations and use circuit breaking for unstable providers.
- Verify webhook signatures against the raw request body; enforce timestamps/replay windows where supported.
- Never expose internal stack traces or provider secrets.
- Generate API types/clients from the approved contract when practical.

## 7. Configurable content and campaign system

### 7.1 Admin capabilities

Support, based on role:

- page create/edit/duplicate/archive;
- structured section editor with reorder and preview;
- SEO title, meta description, canonical, robots, schema and social preview;
- reusable content blocks, templates and brand tokens;
- images, videos, FAQs, testimonials and CTAs;
- top bars, hero banners, side banners, modals, exit-intent prompts and sticky mobile CTAs;
- category/page/cohort/device/source/UTM targeting;
- start/end schedule, timezone, priority and frequency caps;
- draft, review, approval, scheduled publish and rollback;
- audit history showing actor, time and before/after values;
- preview URLs that are unindexed and access controlled;
- bulk actions across hundreds of pages with a dry-run impact summary.

### 7.2 Content model principles

- Store structured content, not arbitrary executable code.
- Validate every block against a versioned schema.
- Sanitize rich text and restrict embeds to an allowlist.
- Separate global defaults, brand/category defaults and page overrides.
- Resolve configuration deterministically and show the effective configuration in admin.
- Protect fixed/required sections with explicit controls rather than hidden conventions.
- Media records require alt text, dimensions, focal point, ownership/source and optimisation status.

### 7.3 Publishing pipeline

Publishing must be safe and observable:

1. Validate content, links, media, SEO fields and permissions.
2. Create an immutable revision.
3. Generate a preview/diff.
4. Require approval when policy demands it.
5. Build/revalidate only affected pages when feasible.
6. Run smoke and accessibility checks.
7. Promote atomically.
8. Purge only affected cache keys.
9. Emit `content.published.v1` and record the audit event.
10. Retain the previous deploy for one-click rollback.

Never allow partially published multi-page campaigns. Use a release identifier and atomic activation time.

## 8. Lead generation and conversion requirements

- Progressive forms: request only information needed at the current step.
- Preserve draft input safely through recoverable navigation.
- Normalize phone/email consistently and deduplicate with documented rules.
- Capture first-touch, latest-touch and conversion-touch attribution separately.
- Preserve raw UTM values plus normalized reporting dimensions.
- Record consent purpose, text/version, source, time and withdrawal.
- Use server-side validation, spam protection, rate limiting and bot-resistant honeypots.
- Route integrations through provider adapters; queue external CRM writes where appropriate.
- Provide reconciliation for failed or delayed CRM/payment/webhook deliveries.
- Do not count an analytics event as business success; reconcile against authoritative transactional state.
- Feature flags and experiments require defined audience, hypothesis, primary metric, guardrails and stop conditions.
- Never use dark patterns, fake urgency, pre-checked consent or misleading trial/pricing language.

## 9. Performance and perceived loading

The application must feel fast on realistic mid-range mobile devices and constrained networks.

### 9.1 Performance budgets

At the 75th percentile, target:

- LCP <= 2.5 seconds;
- INP <= 200 milliseconds;
- CLS <= 0.1.

Set route-specific JavaScript, CSS, image and third-party budgets in CI. A new dependency needs justification, bundle impact review and an owner.

### 9.2 Loading strategy

- Render the first meaningful/hero section in the initial HTML.
- Prioritize the LCP asset; never lazy-load the LCP image.
- Reserve exact media/ad/banner dimensions to prevent layout shift.
- Stream or progressively reveal lower sections.
- Lazy-load non-critical images, video players, widgets and campaign tools.
- Use responsive image sizes and modern formats.
- Defer non-essential analytics and marketing scripts without losing consent or event correctness.
- Prefetch only high-probability navigation targets.
- Cache immutable assets aggressively with content hashes.

### 9.3 Preloaders and skeletons

- Prefer real content immediately; use skeletons only when content genuinely cannot render yet.
- Skeleton geometry must match final content to avoid layout shift.
- Load the first section first; show lightweight section-shaped placeholders below it.
- Do not block the whole page behind a spinner.
- Avoid shimmer on low-power devices or when reduced motion is requested.
- Use `aria-busy`, meaningful status text where needed and hide decorative skeletons from assistive technology.
- Show an actionable error/retry state instead of an endless skeleton.
- Apply a minimum display time only when necessary to prevent flicker; never intentionally delay ready content.

## 10. Design system and UI/UX

### 10.1 Brand configuration

Brand inputs must map to semantic design tokens, not scattered hex values:

```text
color.brand.primary
color.brand.secondary
color.surface.*
color.text.*
color.feedback.success|warning|danger|info
typography.*
spacing.*
radius.*
shadow.*
motion.*
breakpoint.*
```

Validate color contrast before accepting a palette. Generate accessible hover, focus, pressed and disabled states. Campaign artwork cannot override essential usability, legal disclosures or focus visibility.

### 10.2 Experience rules

- Mobile-first responsive design.
- Clear page hierarchy and one primary CTA per decision area.
- Consistent navigation, search, help and conversion patterns.
- Forms use persistent labels, helpful examples, inline validation and error summaries.
- Preserve user input after validation errors.
- Pop-ups must be dismissible, keyboard accessible and frequency-capped.
- Do not show an immediate modal before the visitor understands the page.
- Sticky marketing surfaces must not hide content or focused controls.
- Empty, loading, partial, success, error, offline, unauthorized and rate-limited states are designed—not improvised.
- Use plain language appropriate for students and parents.

### 10.3 Accessibility

Meet WCAG 2.2 AA for public and admin experiences:

- semantic HTML and logical heading order;
- complete keyboard operation;
- visible focus that is not obscured by sticky banners;
- accessible names, descriptions and error associations;
- sufficient contrast and non-color status indicators;
- minimum practical target sizes;
- captions/transcripts for required media;
- reduced-motion support;
- accessible authentication and password-manager compatibility;
- automated checks plus manual keyboard and screen-reader smoke tests.

## 11. Security engineering

Use OWASP ASVS Level 2 as the default verification baseline and maintain a threat model.

### 11.1 Mandatory controls

- Central identity provider; MFA required for privileged/admin roles.
- Deny-by-default RBAC/ABAC with server-side enforcement.
- Short-lived sessions, secure cookie flags, rotation and revocation.
- CSRF protection for cookie-authenticated mutations.
- Strict input validation and context-appropriate output encoding.
- Parameterized queries; no string-built SQL.
- Content Security Policy, HSTS, frame protections, secure referrer and permissions policies.
- Rate limiting by identity, IP/risk signal and sensitive operation.
- Secrets only in approved secret storage; never in source, client bundles, logs or content records.
- Encrypt data in transit and at rest.
- Dependency pinning, automated vulnerability scanning and prompt patching policy.
- Separate development, staging and production accounts/projects and credentials.
- Backups with tested restoration; documented RPO/RTO.
- Immutable audit logging for privileged and content-publishing actions.

### 11.2 Untrusted content and integrations

- Treat admin-authored HTML, uploaded files, webhook bodies and imported CSVs as untrusted.
- Scan uploads, verify MIME type and extension, randomize object keys and prevent execution.
- Use allowlists for redirects, iframe origins and webhook destinations.
- Apply SSRF protections to server-side URL fetchers.
- Never log authorization headers, cookies, tokens, passwords, OTPs or sensitive request bodies.
- Use least-privilege service roles and scoped integration credentials.

## 12. Privacy and EdTech data governance

Design for applicable privacy law and organizational policy; obtain legal review for the final implementation, particularly where minors are involved.

- Maintain a data inventory with owner, purpose, legal basis/consent, sensitivity, residency, retention and deletion method.
- Collect the minimum data needed for a declared purpose.
- Keep marketing consent separate from necessary service processing.
- Make consent records versioned and auditable; support withdrawal.
- Provide access, correction, export and deletion workflows where applicable.
- Define retention schedules and automated deletion/anonymization jobs.
- Never expose student data in URLs, analytics dimensions or public exports.
- Separate anonymous analytics identifiers from account identifiers where possible.
- Require explicit review before profiling, automated decision-making or behavioural targeting of minors.
- Do not share learner data with a vendor until purpose, contract, security and retention are approved.
- Use synthetic/redacted data in development and tests.
- Add privacy impact review to every new event, integration and data field.

## 13. Observability and analytics

- Use structured logs with timestamp, level, service, environment, request ID, trace ID, event name and safe error code.
- Add traces across HTTP, database, queue and external-provider boundaries.
- Define business and technical metrics per module.
- Monitor latency, errors, saturation, queue age, dead letters, publish failures, webhook failures and data reconciliation gaps.
- Alerts must be actionable and linked to runbooks.
- Redact sensitive fields before telemetry leaves the process.
- Separate operational telemetry from product analytics.
- Maintain analytics event definitions, owners and validation rules.
- Prevent duplicate browser/server conversion events using stable event IDs.

## 14. Testing strategy

Every feature must have tests proportionate to its risk.

### 14.1 Test layers

- Unit tests for domain rules, targeting, validation and transformations.
- Component tests for interaction, responsive states and accessibility.
- API contract and integration tests using isolated dependencies.
- Event schema, compatibility, idempotency and replay tests.
- End-to-end tests for critical journeys: lead submission, consent, campaign click, publish/rollback, checkout handoff and admin permissions.
- Visual regression for design-system primitives and critical templates.
- Accessibility automation plus manual keyboard/screen-reader checks.
- Performance budgets and Lighthouse/field monitoring.
- Security tests for authorization, injection, XSS, CSRF, SSRF, rate limits and webhook replay.
- Migration, backup-restore and rollback rehearsals.

### 14.2 Test quality rules

- Test outcomes, not private implementation details.
- No flaky retry-as-a-fix. Identify and remove the cause.
- Use deterministic factories and clocks.
- Never use production PII in fixtures.
- Critical bug fixes require a regression test.
- A block is incomplete if required tests are skipped without an approved issue, owner and deadline.

## 15. DevOps and environments

- Infrastructure and policy changes are version controlled and reviewed.
- CI stages: install integrity, secret scan, lint, typecheck, unit, contract, build, dependency/security scan, integration, accessibility, E2E and deployment checks as applicable.
- Use ephemeral preview environments for pull requests where affordable.
- Production deployment requires immutable artifacts and environment-specific configuration.
- Database migrations are backward-compatible, reviewed and separately observable.
- Use rolling, blue/green or canary releases according to risk.
- Feature flags default safely and have owners and expiry dates.
- Automatic rollback triggers must be defined for critical error/latency changes.
- Maintain release notes, auditability and a tested rollback command/runbook.
- Set cost budgets and alerts; tag resources by product, environment and owner.

Never run destructive production operations without an explicit approved plan, verified target, backup/rollback path and recorded authorization.

## 16. Definition of done

A feature or block is done only when:

- acceptance criteria are met;
- permission and privacy rules are implemented and tested;
- loading, empty, success and failure states exist;
- APIs and events are documented and schema-validated;
- telemetry and alerts are appropriate;
- tests pass at required layers;
- accessibility and performance budgets pass;
- migrations and rollback are verified;
- documentation and `PROJECT_STATE.md` are updated;
- affected architecture, user-flow, event-flow and dependency maps match the implemented code;
- no secrets, temporary bypasses, debug logs or unresolved critical findings remain.

## 17. Claude operating rules

Claude must:

- begin each task by reading the relevant persisted context;
- ask focused questions only when an unanswered choice materially changes architecture, security, data or UX;
- otherwise state assumptions and proceed with the smallest safe block;
- inspect before editing and preserve unrelated changes;
- prefer existing components, patterns and dependencies;
- explain material trade-offs in plain language;
- never claim a test, deployment or review was completed without evidence;
- never fabricate APIs, credentials, schemas, results or requirements;
- never weaken security, privacy, accessibility or tests merely to make a check pass;
- stop when credentials, production authority, destructive action or legal/product approval is required;
- leave the repository in a buildable, documented and resumable state.

### 17.1 Required expertise modes

For every block, explicitly review the work through the relevant lenses. These are responsibilities, not fictional independent approvals:

- Product manager: outcome, scope and success measurement.
- Solution architect: boundaries, contracts, scale and failure modes.
- UX designer: journey, responsive behaviour, content and states.
- UI/design-system engineer: tokens, consistency and visual quality.
- Accessibility specialist: WCAG and assistive technology.
- Frontend engineer: rendering, state, performance and browser behaviour.
- Backend/API engineer: domain integrity, APIs, concurrency and idempotency.
- Data/event engineer: schemas, lineage, attribution and replay.
- Security engineer: threat model and abuse cases.
- Privacy reviewer: minimisation, consent, retention and minors.
- QA engineer: risk-based test coverage.
- SRE/DevOps engineer: observability, release, rollback and cost.

Record unresolved concerns rather than pretending a lens passed.

## 18. Initial delivery sequence

Unless the product owner changes priorities, use this sequence:

1. Discovery, scope, domain glossary and success metrics.
2. Repository foundation, environments and CI quality gates.
3. Design tokens, component library and accessible application shell.
4. Identity, roles, admin security and audit log.
5. Content schemas, page renderer and preview.
6. Publish pipeline, revisions, rollback and targeted cache invalidation.
7. Event SDK, catalog, consent-aware analytics and observability.
8. Lead form vertical slice with dedupe, consent and CRM adapter.
9. Configurable campaign surfaces and targeting.
10. Rules/triggers and reliable background processing.
11. Reporting/export and reconciliation.
12. Hardening, load testing, disaster recovery and production launch review.

Each stage must produce a demonstrable vertical outcome. Do not begin with a large generic framework that has no working user journey.

## 19. Reference baselines

Use current official versions during implementation and record the exact version/date in ADRs:

- OWASP Application Security Verification Standard (ASVS), Level 2 baseline.
- OWASP Top 10 and API Security Top 10.
- WCAG 2.2 AA.
- OpenAPI Specification for HTTP APIs and webhooks.
- CloudEvents conventions for event envelopes.
- Core Web Vitals measured at the 75th percentile.
- OpenTelemetry semantic conventions where supported.

These baselines guide implementation; they do not replace threat modelling, legal review, user research or product-specific acceptance criteria.

### Official source links

- OWASP ASVS 5.0: https://github.com/OWASP/ASVS
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Core Web Vitals: https://web.dev/articles/vitals
- OpenAPI Specification: https://spec.openapis.org/oas/latest.html
- OpenAPI webhooks guidance: https://learn.openapis.org/specification/webhooks.html
- CloudEvents specification: https://github.com/cloudevents/spec
- OpenTelemetry documentation: https://opentelemetry.io/docs/
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
