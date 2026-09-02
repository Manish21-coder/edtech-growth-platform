import { CATEGORY_RESULTS } from "../content";
import { Section } from "./primitives";
import { Marquee } from "./Marquee";

/**
 * HP-100 — category-wise results as an auto-scrolling strip.
 * Real results imagery per category replaces the visual block when supplied.
 * Auto-scrolls; pauses on hover/focus; off under reduced-motion.
 */
export function ResultsCarousel() {
  return (
    <Section
      id="results"
      eyebrow="Outcomes"
      title="Results across every category"
      tone="muted"
    >
      <Marquee
        ariaLabel="Category-wise results"
        durationSec={40}
        items={CATEGORY_RESULTS}
        getKey={(r) => r.categoryId}
        renderItem={(r) => (
          <article className="border-border bg-surface overflow-hidden rounded-2xl border shadow-sm">
            <div className="flex aspect-video items-center justify-center bg-[linear-gradient(140deg,#fff3d1,#ffd876)] p-6 text-center">
              <p className="font-display text-cta-text text-lg font-extrabold tracking-tight">
                {r.categoryLabel}
              </p>
            </div>
            <div className="p-4">
              <p className="text-brand-gold-ink text-xs font-bold tracking-wide uppercase">
                Toppers &amp; results
              </p>
              <p className="text-text-primary mt-1 text-sm font-semibold">
                {r.categoryLabel} students who prepared with Parikshe
              </p>
            </div>
          </article>
        )}
      />
    </Section>
  );
}
