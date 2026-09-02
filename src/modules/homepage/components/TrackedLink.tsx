"use client";

import type { ReactNode } from "react";
import { emitHomepageEvent, type HomepageEvent } from "../analytics";

/**
 * A plain link that emits one analytics event on click. Keeps parent sections
 * as server components while still instrumenting discovery/CTA interactions.
 * The event is fire-and-forget and never blocks navigation (HP-505).
 */
export function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: HomepageEvent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => emitHomepageEvent(event)}
    >
      {children}
    </a>
  );
}
