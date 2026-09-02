import type { ReactNode } from "react";

/**
 * Infinite auto-scrolling horizontal strip.
 *
 * The track renders `items` twice (the second copy `aria-hidden`) and CSS
 * translates it -50% on a seamless loop. Pauses on hover / focus-within;
 * degrades to a normal scroll row under `prefers-reduced-motion` (see
 * `globals.css`). Server component — no JS needed.
 */
export function Marquee<T>({
  items,
  renderItem,
  getKey,
  ariaLabel,
  durationSec = 45,
  className = "",
}: {
  items: readonly T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string;
  ariaLabel: string;
  durationSec?: number;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`marquee ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <ul
        className="marquee-track gap-5 py-1"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        {doubled.map((item, i) => {
          const cloned = i >= items.length;
          return (
            <li
              key={`${getKey(item)}-${cloned ? "b" : "a"}`}
              // The second set is a visual-only loop copy: hide from AT and
              // remove its controls from the tab order (avoids duplicate/
              // focusable-in-aria-hidden issues).
              aria-hidden={cloned || undefined}
              inert={cloned || undefined}
              className="w-70 shrink-0 sm:w-80"
            >
              {renderItem(item)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
