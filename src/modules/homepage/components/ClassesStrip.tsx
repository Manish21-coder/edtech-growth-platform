import type { ReactNode } from "react";
import { CLASSES, type CourseIconName, type CourseTint } from "../content";
import { TrackedLink } from "./TrackedLink";

/**
 * Rich jewel-tone tiles. Each pairs a solid dark `bg-*` (the colour axe checks
 * for contrast) with a livelier gradient on top. `ink` is the text/icon colour;
 * `chip` tints the icon well + chevron pill to match.
 */
const TINT: Record<
  CourseTint,
  { surface: string; ink: string; chip: string; glow: string }
> = {
  violet: {
    surface:
      "bg-violet-800 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-900",
    ink: "text-white",
    chip: "bg-white/15 ring-1 ring-white/25",
    glow: "bg-fuchsia-400/30",
  },
  amber: {
    surface: "bg-amber-400 bg-gradient-to-br from-amber-300 to-amber-500",
    ink: "text-[#1a1300]",
    chip: "bg-black/10 ring-1 ring-black/10",
    glow: "bg-white/40",
  },
  emerald: {
    surface:
      "bg-emerald-800 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900",
    ink: "text-white",
    chip: "bg-white/15 ring-1 ring-white/25",
    glow: "bg-teal-300/30",
  },
  pink: {
    surface:
      "bg-rose-800 bg-gradient-to-br from-rose-600 via-pink-700 to-rose-900",
    ink: "text-white",
    chip: "bg-white/15 ring-1 ring-white/25",
    glow: "bg-pink-300/30",
  },
  orange: {
    surface:
      "bg-orange-800 bg-gradient-to-br from-orange-600 via-orange-700 to-red-900",
    ink: "text-white",
    chip: "bg-white/15 ring-1 ring-white/25",
    glow: "bg-amber-300/30",
  },
  sky: {
    surface:
      "bg-sky-800 bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900",
    ink: "text-white",
    chip: "bg-white/15 ring-1 ring-white/25",
    glow: "bg-cyan-300/30",
  },
};

const ICON: Record<CourseIconName, ReactNode> = {
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  science: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2a9 9 0 0 1 0 20M12 2a9 9 0 0 0 0 20" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </>
  ),
  commerce: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l3-4 3 3 5-7" />
      <path d="M18 7h2v2" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15v4M8 19h4" />
    </>
  ),
};

/**
 * "Our Classes" card that overlaps the bottom of the hero banner
 * (Vedantu-style). Six classes as rich gradient tiles with an icon that
 * idle-floats and lifts on hover; each links straight to its class listing.
 */
export function ClassesStrip() {
  return (
    <div className="border-border bg-surface relative z-20 mx-auto -mt-14 w-[97%] max-w-6xl rounded-2xl border p-4 shadow-[0_28px_64px_-24px_rgba(15,23,42,0.3)] sm:-mt-20 sm:rounded-3xl sm:p-5">
      <h2 className="font-display bg-cta-bg text-cta-text inline-flex rounded-lg px-3 py-1 text-sm font-extrabold sm:text-base">
        Our Classes
      </h2>
      <ul className="-mx-1 mt-3 flex snap-x snap-mandatory [scrollbar-width:none] gap-2.5 overflow-x-auto px-1 pb-1 sm:mx-0 sm:mt-4 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
        {CLASSES.map((c, i) => {
          const t = TINT[c.tint];
          return (
            <li
              key={c.id}
              className="animate-rise-in w-[40%] shrink-0 snap-start sm:w-auto"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <TrackedLink
                href={c.href}
                event={{
                  type: "homepage.category_selected.v1",
                  categoryId: c.id,
                  source: "card",
                }}
                className={`group relative flex h-full min-h-[5.25rem] flex-col justify-between gap-2 overflow-hidden rounded-xl p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${t.surface} ${t.ink}`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150 ${t.glow}`}
                />
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg ${t.chip}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="animate-float-y h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    {ICON[c.icon]}
                  </svg>
                </span>
                <span className="relative flex items-center justify-between gap-1.5 text-[13px] leading-tight font-bold">
                  {c.label}
                  <span
                    aria-hidden="true"
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs transition-transform group-hover:translate-x-0.5 ${t.chip}`}
                  >
                    &#8250;
                  </span>
                </span>
              </TrackedLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
