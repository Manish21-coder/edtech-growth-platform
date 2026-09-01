<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Operating contract

The authoritative operating contract for this repository is [`CLAUDE.md`](./CLAUDE.md).
Read it and the applicable rules in [`.claude/rules/`](./.claude/rules/) before making
any change, then follow the task procedure in the relevant
[`.claude/skills/<skill>/SKILL.md`](./.claude/skills/). Current status and the exact
verification commands live in [`docs/PROJECT_STATE.md`](./docs/PROJECT_STATE.md).
