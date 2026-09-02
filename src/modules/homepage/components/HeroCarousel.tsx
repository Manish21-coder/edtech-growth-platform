"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_BANNERS, type HeroBanner } from "../content";
import { asset } from "../asset";
import { emitHomepageEvent } from "../analytics";
import { ClassesStrip } from "./ClassesStrip";

const AUTOPLAY_MS = 5000;

/**
 * HP-020 — hero, Vedantu-style: one full-width dark promotional banner at a
 * time, auto-rotating, pagination pills overlaid near the bottom, with a white
 * "Popular courses" card overlapping the lower edge. Whole banner is the click
 * target (campaign.clicked, not a conversion — HP-324). Pauses on
 * hover/focus/hidden tab; off under prefers-reduced-motion. Fixed aspect → no CLS.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_BANNERS.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, count]);

  useEffect(() => {
    const b = HERO_BANNERS[index];
    if (b)
      emitHomepageEvent({
        type: "campaign.impression_recorded.v1",
        bannerId: b.id,
      });
  }, [index]);

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured courses"
      className="bg-surface scroll-mt-20 pt-4 pb-2 sm:pt-6"
    >
      <h1 className="sr-only">
        Parikshe — Karnataka&rsquo;s learning destination for SSLC, PUC, KCET,
        NEET and CA Foundation
      </h1>

      <div className="mx-auto w-[95%] max-w-[1700px]">
        <div
          className="group relative overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_78%_25%,#1e293b,#0b1120)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(index + 1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(index - 1);
            }
          }}
        >
          {/* Fixed hero size (16:10 mobile / 8:3 desktop). Banners are fitted
              with object-cover; supply crops at these ratios to avoid clipping. */}
          <div className="relative aspect-16/10 w-full sm:aspect-8/3">
            {HERO_BANNERS.map((banner, i) => (
              <Slide
                key={banner.id}
                banner={banner}
                active={i === index}
                eager={i === 0}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/30 focus-visible:opacity-100"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/30 focus-visible:opacity-100"
          >
            &#8250;
          </button>

          <div className="absolute inset-x-0 bottom-16 z-10 flex justify-center gap-1.5 sm:bottom-24">
            {HERO_BANNERS.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`Go to slide ${i + 1}${i === index ? " (current)" : ""}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
                className="grid h-6 w-6 place-items-center"
              >
                <span
                  aria-hidden="true"
                  className={
                    i === index
                      ? "block h-1 w-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.45)] transition-all"
                      : "block h-1 w-4 rounded-full bg-white/50 shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-all"
                  }
                />
              </button>
            ))}
          </div>

          <span aria-live="polite" className="sr-only">
            Slide {index + 1} of {count}
          </span>
        </div>

        <ClassesStrip />
      </div>
    </section>
  );
}

function Slide({
  banner,
  active,
  eager,
}: {
  banner: HeroBanner;
  active: boolean;
  eager: boolean;
}) {
  const [status, setStatus] = useState<"pending" | "ok" | "fail">("pending");
  const imgRef = useRef<HTMLImageElement>(null);

  // React can miss `onLoad` when the image is already cached/complete before
  // the handler attaches — check on mount.
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
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,#334155,#0b1120)]"
        >
          <div className="absolute inset-0 opacity-[0.12] [background:repeating-linear-gradient(45deg,transparent_0,transparent_16px,#ffcc5b_16px,#ffcc5b_18px)]" />
        </div>
      ) : null}
      <picture>
        {banner.imageMobile ? (
          <source
            media="(max-width: 639px)"
            srcSet={asset(banner.imageMobile)}
            width={1200}
            height={750}
          />
        ) : null}
        <img
          ref={imgRef}
          src={asset(banner.image)}
          alt={banner.alt}
          width={2400}
          height={900}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          onLoad={() => setStatus("ok")}
          onError={() => setStatus("fail")}
          className={`h-full w-full object-cover ${
            status === "ok" ? "" : "invisible absolute inset-0"
          }`}
        />
      </picture>
    </a>
  );
}
