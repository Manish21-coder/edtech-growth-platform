"use client";

import { emitHomepageEvent } from "../analytics";

/**
 * HP-110 — video testimonial thumbnail. Emits the play event and shows a
 * placeholder; a real (lazy-loaded) player is deferred to a later block.
 */
export function VideoTestimonialButton({ storyId }: { storyId: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        emitHomepageEvent({
          type: "homepage.testimonial_video_played.v1",
          storyId,
        })
      }
      className="border-border-strong bg-surface-accent text-text-primary hover:bg-surface-muted flex aspect-video items-center justify-center gap-2 rounded-md border text-sm font-semibold"
    >
      <span
        aria-hidden="true"
        className="text-cta-text bg-cta-bg grid h-8 w-8 place-items-center rounded-full text-xs"
      >
        &#9654;
      </span>
      Play video testimonial
    </button>
  );
}
