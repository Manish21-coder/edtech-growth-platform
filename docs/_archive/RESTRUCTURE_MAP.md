# Restructure traceability map

The original master instruction file (644 lines) was split into a slim root
`CLAUDE.md` (~140 lines of universal instruction), the `.claude/rules/` directory
(full detail, always-applicable + path-scoped), and `.claude/skills/` (task
procedures). **No requirement was removed, weakened or contradicted.** This table
maps every original section to its new home so a reviewer can confirm 100 %
coverage.

Verbatim original: [`CLAUDE.original.md`](./CLAUDE.original.md)
(sha256 `5d76bda33a2b1bff638d5a4c97fe6da9b91b95a366be6883c709dee620eab9b7`).

| Original section                               | Destination                                                                                             | Notes                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| §0 Purpose and authority                       | `CLAUDE.md` §1 + `.claude/rules/authority-and-workflow.md` (Purpose and authority)                      | Priority order + conflict-handling kept verbatim in meaning.                                  |
| §1 Product vision                              | `CLAUDE.md` §2 (summary) + `.claude/rules/product-and-modules.md` (Product vision)                      | Full module-family list retained in the rule.                                                 |
| §2 Required working method: build in blocks    | `CLAUDE.md` §3 (summary) + `.claude/rules/authority-and-workflow.md` (Working method)                   | 10-step lifecycle retained in full.                                                           |
| §2.1 Block lifecycle                           | `.claude/rules/authority-and-workflow.md` (Block lifecycle)                                             | Verbatim 10 steps + "one block IN_PROGRESS".                                                  |
| §2.2 Mandatory context files                   | `.claude/rules/documentation-and-maps.md` (Mandatory context files)                                     | Full file list + `PROJECT_STATE.md` contents retained.                                        |
| §2.3 Living maps and diagrams are mandatory    | `.claude/rules/documentation-and-maps.md` (Living maps / Diagram rules / Process)                       | All diagram rules + the "block is incomplete" clause retained.                                |
| §2.4 Required block proposal template          | `.claude/rules/authority-and-workflow.md` (Block proposal template)                                     | Template retained verbatim.                                                                   |
| §3 Default architecture                        | `.claude/rules/architecture.md` (Default architecture)                                                  | Full stack list retained; modular-monolith-first retained.                                    |
| §3.1 Repository boundaries                     | `.claude/rules/architecture.md` (Current vs proposed / Repository boundaries)                           | `apps/*`+`packages/*` tree kept and marked Proposed (ADR-0002). Enforcement clauses retained. |
| §4 Modular design contract                     | `.claude/rules/product-and-modules.md` (Modular design contract) + `docs/modules/_TEMPLATE/CONTRACT.md` | 13-point contract list retained verbatim; template file created.                              |
| §5 Event-first architecture                    | `.claude/rules/events.md`                                                                               | See §5.1–5.3 rows.                                                                            |
| §5.1 Event rules                               | `.claude/rules/events.md` (Event rules)                                                                 | Example event list + past-tense + versioning rule retained.                                   |
| §5.2 Required event envelope                   | `.claude/rules/events.md` (Required event envelope)                                                     | JSON envelope retained verbatim.                                                              |
| §5.3 Delivery guarantees                       | `.claude/rules/events.md` (Delivery guarantees)                                                         | Outbox, idempotency, backoff, DLQ, ordering, CI, analytics-never-blocks retained.             |
| §6 API standards                               | `.claude/rules/api.md` (path-scoped: API routes, openapi.yaml)                                          | All 11 bullets retained verbatim.                                                             |
| §7 Configurable content and campaign system    | `.claude/rules/content-campaign.md` (path-scoped: cms/admin/campaign)                                   | See §7.1–7.3 rows.                                                                            |
| §7.1 Admin capabilities                        | `.claude/rules/content-campaign.md` (Admin capabilities)                                                | Full capability list retained.                                                                |
| §7.2 Content model principles                  | `.claude/rules/content-campaign.md` (Content model principles)                                          | All 7 principles retained.                                                                    |
| §7.3 Publishing pipeline                       | `.claude/rules/content-campaign.md` (Publishing pipeline)                                               | 10-step pipeline + "never partially published" retained.                                      |
| §8 Lead generation and conversion requirements | `.claude/rules/lead-conversion.md` (path-scoped: lead/forms/checkout)                                   | All 12 bullets incl. "never dark patterns" retained.                                          |
| §9 Performance and perceived loading           | `.claude/rules/performance.md`                                                                          | See §9.1–9.3 rows.                                                                            |
| §9.1 Performance budgets                       | `.claude/rules/performance.md` (Performance budgets)                                                    | LCP/INP/CLS p75 targets + CI budgets retained.                                                |
| §9.2 Loading strategy                          | `.claude/rules/performance.md` (Loading strategy)                                                       | All 9 bullets retained.                                                                       |
| §9.3 Preloaders and skeletons                  | `.claude/rules/performance.md` (Preloaders and skeletons)                                               | All 8 bullets retained.                                                                       |
| §10 Design system and UI/UX                    | `.claude/rules/design-ux.md` + `.claude/rules/accessibility.md`                                         | See §10.1–10.3 rows.                                                                          |
| §10.1 Brand configuration                      | `.claude/rules/design-ux.md` (Brand configuration)                                                      | Token list + contrast validation + state generation retained.                                 |
| §10.2 Experience rules                         | `.claude/rules/design-ux.md` (Experience rules)                                                         | All 10 bullets retained.                                                                      |
| §10.3 Accessibility                            | `.claude/rules/accessibility.md`                                                                        | WCAG 2.2 AA + all 10 sub-requirements retained.                                               |
| §11 Security engineering                       | `.claude/rules/security.md`                                                                             | See §11.1–11.2 rows.                                                                          |
| §11.1 Mandatory controls                       | `.claude/rules/security.md` (Mandatory controls)                                                        | All 15 controls retained verbatim.                                                            |
| §11.2 Untrusted content and integrations       | `.claude/rules/security.md` (Untrusted content and integrations)                                        | All 6 bullets retained.                                                                       |
| §12 Privacy and EdTech data governance         | `.claude/rules/privacy.md`                                                                              | All 14 bullets + legal-review + minors emphasis retained.                                     |
| §13 Observability and analytics                | `.claude/rules/observability.md`                                                                        | All 9 bullets retained.                                                                       |
| §14 Testing strategy                           | `.claude/rules/testing.md`                                                                              | See §14.1–14.2 rows.                                                                          |
| §14.1 Test layers                              | `.claude/rules/testing.md` (Test layers)                                                                | All 10 layers retained.                                                                       |
| §14.2 Test quality rules                       | `.claude/rules/testing.md` (Test quality rules)                                                         | All 6 rules retained.                                                                         |
| §15 DevOps and environments                    | `.claude/rules/devops.md`                                                                               | All 10 bullets + "never destructive prod ops" retained.                                       |
| §16 Definition of done                         | `CLAUDE.md` §7 (essentials) + `.claude/rules/authority-and-workflow.md` (Definition of done)            | Full 11-item checklist retained in the rule.                                                  |
| §17 Claude operating rules                     | `CLAUDE.md` §9 (summary) + `.claude/rules/authority-and-workflow.md` (Claude operating rules)           | All 11 "must" clauses retained verbatim in the rule.                                          |
| §17.1 Required expertise modes                 | `.claude/rules/authority-and-workflow.md` (Required expertise modes) + one `.claude/skills/` per lens   | All 12 lenses retained; each maps to a skill.                                                 |
| §18 Initial delivery sequence                  | `.claude/rules/product-and-modules.md` (Initial delivery sequence) + `docs/ROADMAP.md`                  | 12-stage sequence retained verbatim; ROADMAP tracks status.                                   |
| §19 Reference baselines                        | `.claude/rules/reference-baselines.md`                                                                  | All 7 baselines + all 8 source links retained.                                                |
| §19 Official source links                      | `.claude/rules/reference-baselines.md` (Official source links)                                          | Retained verbatim.                                                                            |

## Coverage assertion

Every original section §0–§19 (including all sub-sections §2.1–§2.4, §5.1–§5.3,
§7.1–§7.3, §9.1–§9.3, §10.1–§10.3, §11.1–§11.2, §14.1–§14.2, §17.1) has exactly one
authoritative destination above. The slim `CLAUDE.md` only ever **summarises and
points to** a rule — it never replaces one. Where a summary and a rule both mention
a requirement, the rule is authoritative and the summary defers to it explicitly
("Full detail: …"), so there is no contradiction and no load-bearing duplication.
