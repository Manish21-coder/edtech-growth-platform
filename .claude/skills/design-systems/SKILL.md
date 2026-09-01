---
name: design-systems
description: Build the token layer and component library — semantic tokens, accessible states, brand theming.
---

# Design systems

Operationalizes the **UI / design-system engineer** lens and
`.claude/rules/design-ux.md` (Brand configuration). Home: `packages/ui/**` /
`src/components/**` and the global token stylesheet.

## Applicability & trigger conditions

Use when: setting up or extending design tokens; adding a shared component;
onboarding a new brand/theme; or you find raw hex/spacing values scattered in
feature code.

## Decision framework

1. **Three token layers:** primitive (raw palette/scale) → semantic
   (`color.text.primary`, `color.feedback.danger`, `spacing.4`) → component
   (`button.padding.x`). Feature code consumes **semantic/component** tokens only.
2. **Brand input → semantic mapping.** A new brand supplies primitives; semantic
   tokens are remapped, components don't change.
3. **State completeness.** Every interactive component defines default, hover,
   focus-visible, pressed, disabled, loading, error — all contrast-checked.
4. **Composition over configuration.** Prefer small composable primitives to a
   mega-component with 20 boolean props.
5. **Accessibility is built in**, not a prop: semantic element, label association,
   focus management, `prefers-reduced-motion` in motion tokens.

## Implementation standards

- Tokens: `color.brand.*`, `color.surface.*`, `color.text.*`,
  `color.feedback.success|warning|danger|info`, `typography.*`, `spacing.*`,
  `radius.*`, `shadow.*`, `motion.*`, `breakpoint.*`.
- **Validate contrast before accepting a palette** (WCAG 2.2 AA: 4.5:1 text, 3:1
  large text / UI components).
- Components are typed, documented with usage examples, and have visual + a11y
  tests.
- No inline hex/px in feature components; lint or review-gate this.
- Motion respects reduced-motion; no shimmer on low-power devices.
- Dark mode / high-contrast handled at the semantic layer if in scope.

## Common failure & abuse cases

- Feature code imports primitive tokens or hardcodes `#1a1a1a` → theming breaks.
- New "primary button v2" instead of extending the existing one → drift.
- Disabled state with 2:1 contrast, or focus ring removed for "cleanliness".
- Component with a `variant` for every one-off marketing need.
- Icon-only button with no accessible name.
- Motion token ignores `prefers-reduced-motion`.

## Review checklist

- [ ] Only semantic/component tokens used in feature code.
- [ ] New brand = primitive swap + semantic remap, no component edits.
- [ ] All interactive states defined and contrast-checked.
- [ ] Component typed, documented, with examples.
- [ ] Focus-visible present and not suppressed; labels correct.
- [ ] Reduced-motion honored.
- [ ] No duplicate component covering an existing need.

## Required tests

- Visual regression for each primitive and its states (Proposed tooling — stand up
  with the design-system block).
- Accessibility tests per component (axe + keyboard).
- Contrast assertion tests for the semantic palette.
- Snapshot/interaction tests for composition APIs.

## Documentation requirements

- Token reference (the three layers) in `packages/ui` docs or `docs/`.
- Per-component usage doc with do/don't and a11y notes.
- ADR for the token architecture and any breaking token rename.
- Note brand-theming procedure in `docs/`.

## Definition of done

- Tokens are layered and the only styling source; components are accessible,
  stateful, documented and tested; a new brand themes via primitives only; no raw
  values leak into features.
