---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
  - "src/app/**"
  - "src/components/**"
  - "packages/ui/**"
---

# Design system & UI/UX

Consolidates original master `CLAUDE.md` sections **§10.1 (brand configuration)** and
**§10.2 (experience rules)**. Accessibility requirements live in
`accessibility.md` and always apply alongside this file.

## Brand configuration

Brand inputs map to **semantic design tokens**, not scattered hex values:

```text
color.brand.primary          color.brand.secondary
color.surface.*              color.text.*
color.feedback.success|warning|danger|info
typography.*   spacing.*   radius.*   shadow.*   motion.*   breakpoint.*
```

- **Validate colour contrast before accepting a palette.**
- Generate accessible hover, focus, pressed and disabled states.
- Campaign artwork cannot override essential usability, legal disclosures or focus
  visibility.

## Experience rules

- **Mobile-first** responsive design.
- Clear page hierarchy and **one primary CTA per decision area**.
- Consistent navigation, search, help and conversion patterns.
- Forms use persistent labels, helpful examples, inline validation and error
  summaries; **preserve user input after validation errors**.
- Pop-ups must be dismissible, keyboard accessible and frequency-capped.
- Do not show an immediate modal before the visitor understands the page.
- Sticky marketing surfaces must not hide content or focused controls.
- Empty, loading, partial, success, error, offline, unauthorized and rate-limited
  states are **designed, not improvised**.
- Use plain language appropriate for students and parents.

Procedures: `.claude/skills/ui-ux-design/SKILL.md`,
`.claude/skills/design-systems/SKILL.md`,
`.claude/skills/frontend-engineering/SKILL.md`.
