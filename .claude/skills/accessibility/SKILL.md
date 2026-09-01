---
name: accessibility
description: Meet WCAG 2.2 AA on public and admin surfaces — semantics, keyboard, focus, contrast, AT smoke tests.
---

# Accessibility

Operationalizes the **Accessibility specialist** lens and
`.claude/rules/accessibility.md`. Target: **WCAG 2.2 AA**, public and admin.

## Applicability & trigger conditions

Use for every UI block, and specifically when: adding forms, dialogs, menus, tabs,
carousels, custom widgets; changing focus flow, navigation, or color; adding media;
or introducing motion/animation.

## Decision framework

1. **Native first.** Use the semantic HTML element before an ARIA re-creation.
   ARIA only to fill genuine gaps, following the authoring practices pattern
   exactly.
2. **Keyboard is the baseline.** If it works with a mouse it must work with the
   keyboard, in a logical order, with visible focus that sticky headers/banners
   never cover.
3. **Name, role, value** for every control; errors are programmatically associated
   with their field and summarised.
4. **Don't rely on color alone** for status; provide text/icon too. Verify contrast
   at design time.
5. **Respect user settings:** `prefers-reduced-motion`, zoom to 200%, 320px
   reflow, and OS text-size.
6. **WCAG 2.2 additions:** focus not obscured, target size (min 24×24 CSS px unless
   exception), dragging alternatives, accessible authentication (no memory/cognitive
   test; password managers work), consistent help placement.

## Implementation standards

- Logical heading order (one `h1` per page); landmarks (`header`, `nav`, `main`,
  `footer`).
- Dialogs: focus moves in, is trapped, `Esc` closes, focus returns to the trigger.
- Forms: persistent `<label>`, `aria-describedby` for hints/errors,
  `aria-invalid`, error summary linking to fields, input preserved on error.
- Media: captions + transcripts for required content; no autoplay audio.
- Decorative skeletons/images hidden from AT; meaningful loading uses `aria-busy` +
  status text.
- Live regions for async status where a sighted user sees a change.

## Common failure & abuse cases

- `<div onClick>` used as a button — not focusable, no role, no key handling.
- Focus ring removed globally (`outline: none`) with no replacement.
- Sticky promo bar covers the focused field on mobile.
- Placeholder used instead of a label.
- Error shown only in red text with no programmatic association.
- Modal opens but focus stays on the page behind it.
- Carousel/menu built with ARIA that doesn't match the APG keyboard model.
- CAPTCHA with no accessible alternative.

## Review checklist

- [ ] Semantic elements; ARIA only where needed and APG-correct.
- [ ] Full keyboard operation, logical order, visible unobscured focus.
- [ ] Name/role/value for all controls; errors associated + summarised.
- [ ] Contrast AA; status not color-only; target sizes met.
- [ ] 200% zoom / 320px reflow / reduced-motion OK.
- [ ] Dialogs manage and restore focus; `Esc` works.
- [ ] Media captions/transcripts where required.
- [ ] Accessible authentication; consistent help placement.

## Required tests

- Automated: `@axe-core/playwright` scan per route/template (already wired in
  `e2e/`), plus component-level axe in Vitest.
- Manual keyboard walkthrough of the new/changed flow.
- Screen-reader smoke test (VoiceOver on macOS at minimum) of the primary path.
- Zoom/reflow spot check at 200% and 320px.
- Regression test for any accessibility bug fixed.

## Documentation requirements

- Note AT test results (what was tested, with which SR/browser) in the block
  handoff.
- Component a11y notes in the design-system docs.
- Any known limitation logged with an owner and remediation date — never silently
  shipped.

## Definition of done

- Automated checks pass **and** a manual keyboard + screen-reader smoke test of the
  primary path passed; WCAG 2.2 AA criteria above are met; results recorded.
