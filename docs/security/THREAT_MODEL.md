# Threat model

Governed by `.claude/rules/security.md` and
`.claude/skills/security-engineering/SKILL.md`. Baseline: **OWASP ASVS Level 2**,
OWASP Top 10 + API Security Top 10. Update this file in the same block as any change
that adds an asset, entry point, trust boundary or integration.

Last verified against commit: _pending first commit_

> Status: **Proposed / skeleton.** Only the Next.js web skeleton exists; most
> assets and entry points below are planned. Threats are recorded now so
> mitigations are designed in, not bolted on.

## Assets to protect

| Asset                                                            | Sensitivity           | Status                  |
| ---------------------------------------------------------------- | --------------------- | ----------------------- |
| Learner / lead personal data (email, phone, name, guardian data) | High (C2/C3)          | Proposed                |
| Consent records                                                  | High (legal evidence) | Proposed                |
| Admin credentials & sessions                                     | High                  | Proposed                |
| Content / campaign configuration & publish pipeline              | Medium                | Proposed                |
| Payment references & subscription state                          | High                  | Proposed                |
| Analytics & attribution data                                     | Medium                | Proposed                |
| Secrets / integration credentials                                | Critical              | Proposed                |
| Audit logs                                                       | High (integrity)      | Proposed                |
| Source code & CI/CD supply chain                                 | High                  | Partially (repo exists) |

## Entry points / attack surface

| Entry point                      | Status                 | Primary controls                                            |
| -------------------------------- | ---------------------- | ----------------------------------------------------------- |
| Public web pages (RSC + client)  | Implemented (skeleton) | Output encoding, CSP, no secrets in bundle                  |
| Lead / contact forms             | Proposed               | Server validation, rate limit, honeypot, CSRF, idempotency  |
| Admin UI & config APIs           | Proposed               | SSO + MFA, deny-by-default RBAC, object-level authz, audit  |
| HTTP API (`/api/*`)              | Proposed               | Boundary validation, authz, tenant scoping, pagination caps |
| Inbound webhooks (payments, CRM) | Proposed               | Raw-body signature verification, replay window, allowlist   |
| File uploads / media             | Proposed               | MIME+ext check, size cap, random keys, no execution, scan   |
| CSV / data import                | Proposed               | Untrusted parsing, formula-injection neutralisation         |
| Server-side URL fetchers         | Proposed               | SSRF allowlist, block link-local/metadata ranges            |
| Dependencies / build pipeline    | Partially              | Lockfile, pinned versions; scanning is Proposed             |

## Trust boundaries

See `docs/architecture/ARCHITECTURE_MAP.md` (§Trust boundaries) and diagram
template §8 in `docs/architecture/diagrams/TEMPLATES.md`.

## STRIDE register (seed — expand per block)

| #   | Threat (STRIDE)                                                   | Component       | Mitigation                                                                                | Status                        |
| --- | ----------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------- | ----------------------------- |
| T1  | **Spoofing** — attacker uses stolen admin session                 | Admin auth      | Short-lived sessions, MFA, rotation on privilege change, server-side revocation           | Proposed                      |
| T2  | **Tampering** — stored XSS via CMS rich text / SVG upload         | CMS renderer    | Server-side sanitisation, embed allowlist, CSP without `unsafe-inline`, upload validation | Proposed                      |
| T3  | **Repudiation** — admin denies a config/publish change            | Audit log       | Immutable audit log with actor/time/before-after                                          | Proposed                      |
| T4  | **Information disclosure** — IDOR reading another tenant's lead   | API             | Object-level authz + tenant scoping, deny-by-default                                      | Proposed                      |
| T5  | **Information disclosure** — PII in URLs / logs / analytics       | Web, telemetry  | No PII in URLs/dimensions/logs; redaction before export; opaque ids                       | Proposed                      |
| T6  | **Denial of service** — credential stuffing / form spam           | Auth, forms     | Rate limiting by identity/IP/risk, honeypot, bot checks                                   | Proposed                      |
| T7  | **Elevation of privilege** — role check only in the client        | Admin, API      | Server-side enforcement on every request                                                  | Proposed                      |
| T8  | **Tampering** — forged payment webhook                            | Webhook handler | HMAC over raw body, timestamp/replay window, provider allowlist                           | Proposed                      |
| T9  | **Information disclosure** — SSRF via admin-supplied URL          | URL fetcher     | Allowlist, block internal/metadata ranges, no redirects to private IPs                    | Proposed                      |
| T10 | **Tampering** — dependency / supply-chain compromise              | Build           | Pinned deps, vulnerability + secret scanning in CI, review                                | Proposed (scanning)           |
| T11 | **Repudiation / disclosure** — secret committed to repo or logged | Whole app       | Secret store only; secret scanning; never log auth headers/tokens/bodies                  | Partially (scanning Proposed) |

## Accepted risks

None recorded yet. Any accepted risk needs an owner, expiry/review date and
product-owner sign-off.

## Verification

Security test layers in `.claude/rules/testing.md`
(`.claude/skills/security-engineering/SKILL.md` review checklist). Add a regression
test for every security bug fixed.
