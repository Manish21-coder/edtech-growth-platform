# Modules

Every feature module has a `docs/modules/<module>/CONTRACT.md` (start from
`_TEMPLATE/CONTRACT.md`). Modules communicate only through published interfaces or
events — see `docs/architecture/MODULE_DEPENDENCY_MAP.md`.

## Index

| Module                 | Status | Owner | Contract |
| ---------------------- | ------ | ----- | -------- |
| _none implemented yet_ | —      | —     | —        |

> Status: **Proposed** — no modules exist. Candidate first modules (from
> `docs/ROADMAP.md`): `content`/`cms`, `campaign`, `lead`, `attribution`.

## Creating a module

1. Run `.claude/skills/module-design/SKILL.md`.
2. Copy `_TEMPLATE/CONTRACT.md` to `docs/modules/<module>/CONTRACT.md` and fill it.
3. Add the module + its allowed/prohibited edges to `MODULE_DEPENDENCY_MAP.md`.
4. Add produced/consumed events to `docs/contracts/EVENT_CATALOG.md`.
5. Add any personal-data fields to `docs/privacy/DATA_INVENTORY.md`.
