---
name: ui-ux-design
description: Design learner/parent/admin journeys and screen states — hierarchy, one primary CTA, every state.
---

# UI/UX design

Operationalizes the **UX designer** lens and `.claude/rules/design-ux.md`
(Experience rules). Accessibility (`.claude/rules/accessibility.md`) always applies.

## Applicability & trigger conditions

Use when: designing a new page/flow; changing navigation or a conversion path;
adding a pop-up / banner / sticky CTA; or a journey has undefined alternate/failure
paths.

## Decision framework

1. **Map the journey end to end** for each actor (learner, parent, anonymous
   visitor, admin): entry → steps → success, plus alternate and failure paths.
2. **One primary CTA per decision area.** Secondary actions are visually
   subordinate. If there are two "primary" buttons, the design isn't done.
3. **Progressive disclosure.** Ask for the minimum at each step; defer the rest
   (`.claude/rules/lead-conversion.md`).
4. **Design every state**: empty, loading, partial, success, error, offline,
   unauthorized, rate-limited. The error state is actionable.
5. **Marketing surfaces are guests.** Pop-ups are dismissible, keyboard-accessible,
   frequency-capped, and never appear before the visitor understands the page.
   Sticky bars never cover content or the focused control.
6. **Plain language** for students and parents; avoid jargon and ambiguous
   microcopy.

## Implementation standards

- Mobile-first; define behaviour at each breakpoint token.
- Consistent navigation, search, help and conversion patterns across pages.
- Forms: persistent labels, example/helper text, inline validation, an error
  summary, and **input preserved** after errors.
- Content hierarchy maps to a correct heading order.
- Hand off with token references (spacing, color, type), not raw values
  (`.claude/skills/design-systems/SKILL.md`).
- No dark patterns: no fake urgency, no pre-checked consent, no disguised ads, no
  misleading trial/pricing copy.

## Common failure & abuse cases

- Only the happy path is designed; error/empty look broken in production.
- Immediate interstitial modal on landing → bounce + accessibility complaints.
- Two competing CTAs → lower conversion, unclear next step.
- Sticky CTA overlaps the form submit button on mobile.
- Validation error clears the whole form.
- Urgency countdown that resets on refresh (dark pattern).
- Microcopy that implies a free plan is paid, or vice versa.

## Review checklist

- [ ] Journey map covers success + alternate + failure for each actor.
- [ ] Exactly one primary CTA per decision area.
- [ ] All eight screen states designed; error is actionable.
- [ ] Pop-ups dismissible, keyboard-accessible, frequency-capped, not premature.
- [ ] Sticky surfaces don't obscure content/focus.
- [ ] Forms preserve input; labels persistent; error summary present.
- [ ] Plain language; no dark patterns.
- [ ] Handoff uses design tokens.

## Required tests

- E2E for the journey's happy path + at least one failure path.
- Component tests asserting each designed state renders.
- Accessibility: keyboard walkthrough + axe check on the new screens.
- Usability review notes (even informal) recorded for significant flows.

## Documentation requirements

- `docs/architecture/USER_FLOW_MAP.md` updated with the journey (Mermaid).
- State inventory in the module `CONTRACT.md` (UI entry points & states).
- Microcopy / content decisions noted where they carry legal or pricing meaning.

## Definition of done

- Every actor journey (incl. failure paths) is mapped and matches the build; all
  states exist; marketing surfaces are non-intrusive and accessible; no dark
  patterns; USER_FLOW_MAP is current.
