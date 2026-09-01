---
name: cms-and-admin-systems
description: Build the structured content model, admin editor, and safe publishing pipeline with revisions and rollback.
---

# CMS & admin systems

Operationalizes `.claude/rules/content-campaign.md`. Applies to CMS, admin and
publishing code.

## Applicability & trigger conditions

Use when: designing content schemas/blocks; building the admin editor, preview,
scheduling, approval or audit history; implementing the publish/rollback pipeline;
or adding targeting/frequency-cap configuration.

## Decision framework

1. **Structured content, never executable code.** Each block type has a versioned
   schema; the renderer maps block type → component.
2. **Revisions are immutable.** Editing creates a new draft revision; publishing
   promotes a specific revision; rollback re-promotes a previous one.
3. **Deterministic config resolution:** global default → brand/category default →
   page override. Admin shows the _effective_ value and its source.
4. **Approval is policy-driven.** Some content types/roles require review before
   publish; the pipeline enforces it, not convention.
5. **Atomic multi-page releases.** A campaign spanning pages uses one release id
   and a single activation time — never partially live.
6. **Preview is unindexed + access-controlled**, with a shareable but expiring
   token.

## Implementation standards

- Validate every block against its schema on save and on publish; reject unknown
  block types.
- Sanitize rich text server-side; embeds restricted to an allowlist of providers
  (`.claude/rules/security.md`). Treat all admin-authored HTML as untrusted.
- Media records require alt text, dimensions, focal point, ownership/source,
  optimization status.
- Audit log entries are immutable and capture actor, timestamp, before/after.
- Publish pipeline: validate → immutable revision → preview/diff → approval (if
  required) → build/revalidate affected pages → smoke + a11y checks → atomic
  promote → purge only affected cache keys → emit `content.published.v1` + audit →
  retain previous deploy for one-click rollback.
- Bulk actions run a dry-run impact summary before applying.

## Common failure & abuse cases

- Rich text stores a `<script>` or an `onerror` attribute → stored XSS in the
  public site.
- "Publish" mutates the live revision in place → no rollback point.
- Effective config computed differently in admin vs renderer → editors misled.
- Half a campaign goes live because pages publish individually.
- Preview URL is public and indexed.
- Bulk "archive" with no dry run → hundreds of pages 404 instantly.
- Audit log editable or missing before/after values.

## Review checklist

- [ ] Every block has a versioned schema; renderer allowlists types.
- [ ] Rich text sanitized server-side; embed allowlist enforced.
- [ ] Revisions immutable; publish promotes a revision id; rollback works.
- [ ] Config resolution deterministic; effective value shown with source.
- [ ] Approval enforced by the pipeline per policy.
- [ ] Multi-page release is atomic (release id + activation time).
- [ ] Preview unindexed + access-controlled + expiring token.
- [ ] Cache purge scoped to affected keys.
- [ ] Audit log immutable with actor/time/before-after.
- [ ] Bulk actions have a dry-run impact summary.

## Required tests

- Schema validation tests (valid/invalid/unknown block).
- XSS tests: malicious rich text/embed is neutralised.
- Publish → rollback E2E: content reverts atomically.
- Config-resolution unit tests across the precedence chain.
- Multi-page campaign activation test (all-or-nothing).
- Permission tests for editor/reviewer/publisher roles.
- Audit-log immutability test.

## Documentation requirements

- Content module `CONTRACT.md`: block schemas, config schema, roles, publishing
  states.
- `docs/runbooks/`: publish failure and rollback runbook.
- `EVENT_CATALOG.md`: `content.published.v1`, `admin.configuration_changed`.
- `USER_FLOW_MAP.md`: the admin authoring/approval/publish journey.

## Definition of done

- Content is structured and schema-validated; rich text/embeds are safe; revisions
  are immutable with working rollback; releases are atomic; preview is protected;
  audit is immutable; bulk actions are dry-runnable; contracts, events, runbook and
  flow map are updated.
