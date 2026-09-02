import { CLASS_COURSES, type CourseTint } from "../content";
import { Section, ButtonLink } from "./primitives";

const TINT: Record<CourseTint, { kicker: string; pill: string; blob: string }> =
  {
    violet: {
      kicker: "text-violet-700",
      pill: "border-violet-200 text-violet-700 hover:bg-violet-50",
      blob: "bg-violet-100",
    },
    amber: {
      kicker: "text-amber-700",
      pill: "border-amber-200 text-amber-700 hover:bg-amber-50",
      blob: "bg-amber-100",
    },
    emerald: {
      kicker: "text-emerald-700",
      pill: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
      blob: "bg-emerald-100",
    },
    pink: {
      kicker: "text-rose-700",
      pill: "border-rose-200 text-rose-700 hover:bg-rose-50",
      blob: "bg-rose-100",
    },
    orange: {
      kicker: "text-orange-700",
      pill: "border-orange-200 text-orange-700 hover:bg-orange-50",
      blob: "bg-orange-100",
    },
    sky: {
      kicker: "text-sky-700",
      pill: "border-sky-200 text-sky-700 hover:bg-sky-50",
      blob: "bg-sky-100",
    },
  };

/**
 * HP-013 — "Explore courses by class". One card per class; each course is a
 * pill linking to its studio.parikshe.in detail page, plus an "Explore courses"
 * button to the class listing.
 */
export function ExploreCourses() {
  return (
    <Section
      id="explore-courses"
      eyebrow="Find your path"
      title="Explore courses by class"
      intro="Pick your class, then jump straight to the course that fits."
    >
      <ul className="-mx-4 flex snap-x snap-mandatory [scrollbar-width:thin] gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
        {CLASS_COURSES.map((g) => {
          const t = TINT[g.tint];
          return (
            <li
              key={g.id}
              className="border-border bg-surface relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border p-5 shadow-sm"
            >
              <span
                aria-hidden="true"
                className={`absolute -top-10 -right-10 h-28 w-28 rounded-full ${t.blob}`}
              />
              <p
                className={`relative text-[11px] font-bold tracking-wide uppercase ${t.kicker}`}
              >
                {g.kicker}
              </p>
              <h3 className="text-text-primary relative mt-0.5 text-base font-bold">
                {g.label}
              </h3>

              <ul className="relative mt-3 flex flex-1 flex-wrap content-start gap-1.5">
                {g.courses.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      className={`bg-surface inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${t.pill}`}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="relative mt-4">
                <ButtonLink
                  href={g.exploreHref}
                  variant="primary"
                  className="w-full !px-3 !text-xs"
                >
                  Explore courses
                </ButtonLink>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
