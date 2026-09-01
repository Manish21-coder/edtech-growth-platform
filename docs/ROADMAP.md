# Roadmap

Derived from the initial delivery sequence in
`.claude/rules/product-and-modules.md`. Each stage must produce a demonstrable
vertical outcome. Status values: `DONE` · `IN_PROGRESS` · `PROPOSED`.

| #   | Stage                                                                | Status      | Notes                                                                              |
| --- | -------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| 1   | Discovery, scope, domain glossary, success metrics                   | PROPOSED    | Next recommended block.                                                            |
| 2   | Repository foundation, environments, CI quality gates                | IN_PROGRESS | Repo + local toolchain **DONE**; environments + CI **PROPOSED**.                   |
| 3   | Design tokens, component library, accessible app shell               | PROPOSED    | `.claude/skills/design-systems`, `ui-ux-design`, `accessibility`.                  |
| 4   | Identity, roles, admin security, audit log                           | PROPOSED    | No auth provider chosen. `.claude/skills/security-engineering`.                    |
| 5   | Content schemas, page renderer, preview                              | PROPOSED    | `.claude/skills/cms-and-admin-systems`.                                            |
| 6   | Publish pipeline, revisions, rollback, targeted cache invalidation   | PROPOSED    |                                                                                    |
| 7   | Event SDK, catalog, consent-aware analytics, observability           | PROPOSED    | `.claude/skills/event-architecture`, `analytics-and-attribution`, `observability`. |
| 8   | Lead form vertical slice — dedupe, consent, CRM adapter              | PROPOSED    | `.claude/skills/lead-generation-and-conversion`.                                   |
| 9   | Configurable campaign surfaces and targeting                         | PROPOSED    |                                                                                    |
| 10  | Rules / triggers and reliable background processing                  | PROPOSED    |                                                                                    |
| 11  | Reporting / export and reconciliation                                | PROPOSED    |                                                                                    |
| 12  | Hardening, load testing, disaster recovery, production launch review | PROPOSED    | Establish `.claude/skills/incident-response` process here.                         |

## Cross-cutting setup tasks (PROPOSED)

| Task                                                                                                                                                                  | Status   | Notes                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| CI pipeline (GitHub Actions or equiv.) with the gate order in `.claude/rules/devops.md`                                                                               | PROPOSED | Not started.                                                                                              |
| Diagram validation in CI — extract each ```mermaid block to a temp `.mmd` and validate individually; **do not** add `@mermaid-js/mermaid-cli` as a project dependency | PROPOSED | Per `.claude/skills/documentation-maps-and-diagrams`.                                                     |
| OpenAPI lint + doc link-check in CI                                                                                                                                   | PROPOSED |                                                                                                           |
| Dependency vulnerability scanning + secret scanning                                                                                                                   | PROPOSED |                                                                                                           |
| Prettier / lint pre-commit hook (Husky or lint-staged)                                                                                                                | PROPOSED | Deliberately not added in Foundation.                                                                     |
| Visual regression tooling for design-system primitives                                                                                                                | PROPOSED | Add with stage 3.                                                                                         |
| Hosting target + IaC (AWS / Cloudflare / other)                                                                                                                       | PROPOSED | No account configured. Needs an ADR.                                                                      |
| PostgreSQL + type-safe ORM + migration tooling                                                                                                                        | PROPOSED | Add with the first persistent module.                                                                     |
| Managed queue / Redis (only if justified)                                                                                                                             | PROPOSED |                                                                                                           |
| Telemetry backend (OpenTelemetry collector, logs, metrics)                                                                                                            | PROPOSED | Add with stage 7.                                                                                         |
| Identity provider + MFA for admin                                                                                                                                     | PROPOSED | Add with stage 4.                                                                                         |
| **Figma MCP / design-tooling connection**                                                                                                                             | PROPOSED | Design-phase setup task. **Not connected.** Set up alongside stage 3 (design tokens / component library). |
| Legal review of privacy design (esp. minors)                                                                                                                          | PROPOSED | Required before any learner PII is collected (stage 8).                                                   |
| Consent management platform decision                                                                                                                                  | PROPOSED | Add with stage 7.                                                                                         |
| CRM / ESP / payment provider selection                                                                                                                                | PROPOSED | Each needs an ADR + DPA before data flows.                                                                |

## Explicitly out of scope until scheduled above

AWS, Cloudflare, databases, authentication, production credentials, and any
third-party data processor. Do not configure these without an approved plan and an
ADR.
