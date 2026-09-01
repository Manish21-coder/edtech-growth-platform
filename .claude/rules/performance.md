# Performance & perceived loading

Consolidates original master `CLAUDE.md` section **§9** (budgets, loading strategy,
preloaders and skeletons). The application must feel fast on realistic mid-range
mobile devices and constrained networks.

## Performance budgets

At the **75th percentile**, target:

- **LCP ≤ 2.5 s**
- **INP ≤ 200 ms**
- **CLS ≤ 0.1**

Set route-specific JavaScript, CSS, image and third-party budgets in CI. A new
dependency needs justification, a bundle-impact review and an owner.

## Loading strategy

- Render the first meaningful / hero section in the initial HTML.
- Prioritize the LCP asset; **never lazy-load the LCP image**.
- Reserve exact media / ad / banner dimensions to prevent layout shift.
- Stream or progressively reveal lower sections.
- Lazy-load non-critical images, video players, widgets and campaign tools.
- Use responsive image sizes and modern formats.
- Defer non-essential analytics and marketing scripts without losing consent or
  event correctness.
- Prefetch only high-probability navigation targets.
- Cache immutable assets aggressively with content hashes.

## Preloaders and skeletons

- Prefer real content immediately; use skeletons only when content genuinely cannot
  render yet.
- Skeleton geometry must match final content to avoid layout shift.
- Load the first section first; show lightweight section-shaped placeholders below
  it. Do not block the whole page behind a spinner.
- Avoid shimmer on low-power devices or when reduced motion is requested.
- Use `aria-busy`, meaningful status text where needed, and hide decorative
  skeletons from assistive technology.
- Show an actionable error / retry state instead of an endless skeleton.
- Apply a minimum display time only when necessary to prevent flicker; never
  intentionally delay ready content.

## Verification

Performance budgets and Lighthouse / field monitoring are part of the Definition of
Done. See `.claude/skills/web-performance/SKILL.md` for the procedure.
