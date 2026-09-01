# Accessibility

Consolidates original master `CLAUDE.md` section **§10.3**. Meet **WCAG 2.2 AA** for
both the public and admin experiences.

## Requirements

- semantic HTML and logical heading order;
- complete keyboard operation;
- visible focus that is **not obscured by sticky banners**;
- accessible names, descriptions and error associations;
- sufficient contrast and **non-color** status indicators;
- minimum practical target sizes;
- captions / transcripts for required media;
- reduced-motion support;
- accessible authentication and password-manager compatibility;
- automated checks **plus** manual keyboard and screen-reader smoke tests.

## Relationship to other rules

- Design tokens must generate accessible hover, focus, pressed and disabled states,
  and colour contrast must be validated before a palette is accepted — see
  `design-ux.md`.
- Campaign artwork, pop-ups and sticky surfaces cannot override essential
  usability, legal disclosures or focus visibility — see `design-ux.md`.
- Accessibility automation plus manual keyboard/screen-reader checks are part of the
  Definition of Done and the test layers — see `testing.md`.

## Verification

The repository ships an axe-core accessibility check via Playwright
(`e2e/*.spec.ts`). Extend it per route/template. Automated checks never replace the
manual keyboard + screen-reader pass. Procedure:
`.claude/skills/accessibility/SKILL.md`.
