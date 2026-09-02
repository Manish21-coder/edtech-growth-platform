"use client";

/* eslint-disable @next/next/no-img-element -- campaign creatives swap often;
   loaded with an onError fallback. */

import { useEffect, useRef, useState } from "react";
import { HERO_BANNERS } from "../content";
import { asset } from "../asset";
import { emitHomepageEvent } from "../analytics";

const ROTATE_MS = 4000;
const SLIDES = HERO_BANNERS.slice(0, 5);

/**
 * Auto-rotating promo carousel for the intro section. Uses the 16:10 mobile crop
 * of each hero banner (a good fit for this near-square card — no crop, no
 * letterbox). Crossfades one banner at a time; pauses on hover/focus/hidden tab;
 * off under prefers-reduced-motion. Whole card is the click target.
 */
export function SidePromoCarousel({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;

  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % n);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className={`border-brand-gold-600/40 relative w-full overflow-hidden rounded-2xl border shadow-[0_18px_44px_-16px_rgba(234,179,8,0.4)] ${className}`}
      aria-roledescription="carousel"
      aria-label="Featured courses"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-16/10 w-full">
        {SLIDES.map((b, idx) => (
          <Slide key={b.id} banner={b} active={idx === i} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {SLIDES.map((b, idx) => (
          <button
            key={b.id}
            type="button"
            aria-label={`Show promo ${idx + 1}${idx === i ? " (current)" : ""}`}
            aria-current={idx === i ? "true" : undefined}
            onClick={() => setI(idx)}
            className="pointer-events-auto grid h-6 w-6 place-items-center"
          >
            <span
              aria-hidden="true"
              className={
                idx === i
                  ? "block h-1 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
                  : "block h-1 w-3 rounded-full bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Slide({
  banner,
  active,
}: {
  banner: (typeof SLIDES)[number];
  active: boolean;
}) {
  const [status, setStatus] = useState<"pending" | "ok" | "fail">("pending");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "ok" : "fail");
  }, []);

  return (
    <a
      href={banner.ctaHref}
      aria-label={`${banner.headline} — ${banner.ctaLabel}`}
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      onClick={() =>
        emitHomepageEvent({ type: "campaign.clicked.v1", bannerId: banner.id })
      }
      className={`focus-visible:outline-brand-gold absolute inset-0 block transition-opacity duration-700 focus-visible:outline-2 focus-visible:-outline-offset-4 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {status !== "ok" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(150deg,#fff3d1,#ffd876)]"
        />
      ) : null}
      <img
        ref={imgRef}
        src={asset(banner.imageMobile ?? banner.image)}
        alt={banner.alt}
        width={1200}
        height={750}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("fail")}
        className={`bg-surface-muted h-full w-full object-cover ${
          status === "ok" ? "" : "invisible absolute inset-0"
        }`}
      />
    </a>
  );
}
