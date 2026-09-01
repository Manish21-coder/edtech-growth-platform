---
name: security-engineering
description: Apply OWASP ASVS L2 controls, threat-model each block, and treat all external input as hostile.
---

# Security engineering

Operationalizes the **Security engineer** lens and `.claude/rules/security.md`.
Baseline: **OWASP ASVS Level 2**, OWASP Top 10 + API Security Top 10. Maintain
`docs/security/THREAT_MODEL.md`.

## Applicability & trigger conditions

Use for every block, and especially when: adding auth/roles/sessions; accepting
input, uploads, webhooks or imports; calling external URLs; handling secrets;
adding admin capability; or changing CSP/headers/cookies.

## Decision framework

1. **Threat-model the change (STRIDE).** For each new component/data flow: what can
   be spoofed, tampered, repudiated, disclosed, DoS'd, or elevated? Record
   mitigations or accepted risks in `THREAT_MODEL.md`.
2. **Trust boundaries.** Identify where untrusted data crosses into trusted code
   (browser→server, webhook→handler, CSV→importer, admin HTML→renderer) and put
   validation/sanitization exactly there.
3. **AuthZ is per-object.** Deny by default; check the principal may act on _this_
   resource/tenant, server-side, every time.
4. **Secrets never touch code/bundle/logs/content.** Only the secret store.
   Rotate; scope to least privilege.
5. **Assume the provider is hostile too:** verify webhook signatures on raw bytes,
   allowlist outbound URLs (SSRF), pin/scan dependencies.

## Implementation standards

- Input validated and typed at the boundary; output encoded for its context
  (HTML/attr/URL/JS/SQL). Parameterized queries only.
- Sessions: short-lived, `HttpOnly` + `Secure` + `SameSite`, rotation on privilege
  change, server-side revocation. MFA for admin/privileged roles.
- CSRF protection on cookie-authed mutations.
- Security headers: CSP (no `unsafe-inline` for scripts), HSTS, `X-Frame-Options`/
  frame-ancestors, Referrer-Policy, Permissions-Policy.
- Uploads: verify MIME + extension, cap size, randomize keys, store outside web
  root / no execution, scan.
- Rate limiting by identity, IP/risk, and per sensitive operation.
- Redirects/iframes/webhook destinations use allowlists.
- Audit-log privileged and publish actions immutably.

## Common failure & abuse cases

- IDOR: `GET /leads/123` returns another tenant's lead.
- Stored XSS via CMS rich text or an SVG upload.
- SSRF: server fetches an admin-supplied URL hitting `169.254.169.254`.
- Webhook signature checked against the parsed JSON, not raw body.
- Secret committed in a config record or printed in a log line.
- CSV import formula injection (`=cmd|...`) opened in a spreadsheet.
- Missing rate limit on login / OTP / password reset → credential stuffing.
- CSP absent or defeated by `unsafe-inline`.
- Long-lived admin session with no MFA.

## Review checklist

- [ ] STRIDE notes added to `THREAT_MODEL.md`; trust boundaries marked.
- [ ] Object-level authz, deny-by-default, server-side, tenant-scoped.
- [ ] Input validated at boundary; output context-encoded; parameterized SQL.
- [ ] Secrets only from the store; nothing in code/bundle/logs/content.
- [ ] Session flags, rotation, revocation; MFA for privileged roles.
- [ ] CSRF protection on cookie-authed mutations.
- [ ] CSP/HSTS/frame/referrer/permissions headers set.
- [ ] Uploads validated, scanned, non-executable, random keys.
- [ ] Outbound URL allowlist (SSRF); webhook raw-body signature + replay window.
- [ ] Rate limits on sensitive ops; audit logging for privileged actions.

## Required tests

- AuthZ tests: cross-tenant/cross-user access denied.
- Injection tests: XSS (stored + reflected), SQLi, template injection, CSV formula.
- SSRF test: internal/metadata URLs blocked.
- Webhook tests: tampered body, stale timestamp, replay → rejected.
- Rate-limit tests on auth/OTP/reset and lead creation.
- Header assertions (CSP/HSTS/etc.) per response.
- Dependency vulnerability scan in CI (Proposed — wire with the DevOps block).
- Regression test for every security bug fixed.

## Documentation requirements

- `docs/security/THREAT_MODEL.md` updated (assets, entry points, trust boundaries,
  mitigations, accepted risks, `Last verified against commit:`).
- Module `CONTRACT.md`: roles/permissions, integration credential scope.
- Runbook for security-relevant alerts and incident handoff to
  `.claude/skills/incident-response/SKILL.md`.

## Definition of done

- The change is threat-modeled and recorded; ASVS L2 controls above are implemented
  and tested; untrusted inputs are validated at their boundary; secrets are
  externalized; no unresolved high/critical finding remains.
