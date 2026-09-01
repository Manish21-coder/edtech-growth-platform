# Security engineering

Consolidates original master `CLAUDE.md` section **§11** (mandatory controls,
untrusted content and integrations). Baseline: **OWASP ASVS Level 2**. Maintain
`docs/security/THREAT_MODEL.md`.

## Mandatory controls

- Central identity provider; **MFA required for privileged / admin roles**.
- **Deny-by-default** RBAC / ABAC with server-side enforcement.
- Short-lived sessions, secure cookie flags, rotation and revocation.
- CSRF protection for cookie-authenticated mutations.
- Strict input validation and context-appropriate output encoding.
- **Parameterized queries; no string-built SQL.**
- Content Security Policy, HSTS, frame protections, secure referrer and permissions
  policies.
- Rate limiting by identity, IP / risk signal and sensitive operation.
- Secrets only in approved secret storage — **never** in source, client bundles,
  logs or content records.
- Encrypt data in transit and at rest.
- Dependency pinning, automated vulnerability scanning and a prompt patching policy.
- Separate development, staging and production accounts / projects / credentials.
- Backups with tested restoration; documented RPO / RTO.
- Immutable audit logging for privileged and content-publishing actions.

## Untrusted content and integrations

- Treat admin-authored HTML, uploaded files, webhook bodies and imported CSVs as
  **untrusted**.
- Scan uploads, verify MIME type and extension, randomize object keys, prevent
  execution.
- Use **allowlists** for redirects, iframe origins and webhook destinations.
- Apply **SSRF** protections to server-side URL fetchers.
- **Never log** authorization headers, cookies, tokens, passwords, OTPs or
  sensitive request bodies.
- Use least-privilege service roles and scoped integration credentials.

## Scope note (current)

No identity provider, database, secret store or cloud account is configured yet.
Do not add production credentials or provider config without an approved plan. When
a control is introduced, update `docs/security/THREAT_MODEL.md` and the relevant
module `CONTRACT.md` in the same block. Procedure:
`.claude/skills/security-engineering/SKILL.md`.
