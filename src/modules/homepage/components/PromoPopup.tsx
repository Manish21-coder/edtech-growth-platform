"use client";

/* eslint-disable @next/next/no-img-element -- promo creative is swapped
   frequently and loaded lazily with an onError fallback. */

import { useCallback, useEffect, useRef, useState } from "react";
import { PROMO_POPUP } from "../content";
import { asset } from "../asset";
import { emitHomepageEvent } from "../analytics";
import {
  DWELL_MS,
  REPEAT_MS,
  isPopupSuppressed,
  markPopupDismissed,
  markPopupShown,
} from "./promoStorage";

/**
 * HP-140 — promotional popup.
 *
 * - first eligible after DWELL_MS on the page (HP-320)
 * - then **re-shows every 10 minutes** (REPEAT_MS) — product-owner override of
 *   the once-per-session rule (2026-09-02)
 * - a dismissal or a submitted lead still suppresses per promoStorage.ts
 * - Esc dismissal + focus trap + focus return via native <dialog>
 * - visible close control with a text label; page stays scrollable after close
 * - no countdown, no fake urgency, no disguised close (HP-504)
 *
 * Product-owner decision (2026-09-02): the popup shows the creative ONLY — the
 * image is the whole click target, linking to PROMO_POPUP.href.
 */
export function PromoPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const show = useCallback(() => {
    if (isPopupSuppressed()) return;
    emitHomepageEvent({ type: "homepage.popup_eligible.v1" });
    setVisible(true);
    markPopupShown();
    emitHomepageEvent({ type: "homepage.popup_viewed.v1" });
  }, []);

  useEffect(() => {
    // First attempt after the dwell time, then poll on the repeat cadence.
    const first = window.setTimeout(show, DWELL_MS);
    const repeat = window.setInterval(() => {
      if (!document.hidden) show();
    }, REPEAT_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(repeat);
    };
  }, [show]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (visible && !dialog.open) dialog.showModal();
  }, [visible]);

  function dismiss() {
    markPopupDismissed();
    emitHomepageEvent({ type: "homepage.popup_dismissed.v1" });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Parikshe offer"
      onClose={dismiss}
      onCancel={dismiss}
      className="w-[min(40rem,94vw)] overflow-visible rounded-2xl border-0 bg-transparent p-0 backdrop:bg-black/50 sm:m-auto"
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={dismiss}
          className="mb-2 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 shadow-md hover:bg-white"
        >
          <span aria-hidden="true">&times;</span> Close (Esc)
        </button>
      </div>

      <a
        href={PROMO_POPUP.href}
        onClick={() => emitHomepageEvent({ type: "homepage.popup_clicked.v1" })}
        className="focus-visible:outline-brand-gold block overflow-hidden rounded-2xl shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {imgFailed ? (
          <span className="bg-brand-ink font-display flex aspect-video w-full flex-col items-center justify-center gap-1 px-6 text-center text-white">
            <span className="text-xl font-extrabold">SSLC Power Guides</span>
            <span className="text-brand-gold text-sm font-semibold">
              Mathematics · Science · Social Science
            </span>
          </span>
        ) : (
          <img
            src={asset(PROMO_POPUP.image)}
            alt={PROMO_POPUP.alt}
            width={1600}
            height={840}
            decoding="async"
            onError={() => setImgFailed(true)}
            className="bg-surface-muted block h-auto w-full"
          />
        )}
      </a>
    </dialog>
  );
}
