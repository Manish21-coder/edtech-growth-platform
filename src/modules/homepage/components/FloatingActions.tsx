"use client";

import { APP_STORE, CONTACT } from "../content";
import { emitHomepageEvent } from "../analytics";
import { Icon } from "./Icon";

/**
 * Floating quick actions pinned to the right edge — WhatsApp + Download app.
 * Sits above the mobile sticky CTA (`bottom-24` → `sm:bottom-6`).
 */
export function FloatingActions() {
  return (
    <div className="fixed right-3 bottom-24 z-40 flex flex-col items-end gap-3 sm:right-5 sm:bottom-6">
      {CONTACT.whatsapp ? (
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Parikshe on WhatsApp"
          onClick={() =>
            emitHomepageEvent({
              type: "cta.clicked.v1",
              ctaId: "float-whatsapp",
            })
          }
          className="group focus-visible:outline-brand-gold relative grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="border-border bg-surface text-text-primary pointer-events-none absolute right-14 rounded-md border px-2 py-1 text-xs font-semibold whitespace-nowrap opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
            Chat on WhatsApp
          </span>
          <Icon name="whatsapp" className="h-6 w-6" />
        </a>
      ) : null}

      <a
        href={APP_STORE.playStore}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download the Parikshe app"
        onClick={() =>
          emitHomepageEvent({
            type: "cta.clicked.v1",
            ctaId: "float-download-app",
          })
        }
        className="group bg-cta-bg text-cta-text focus-visible:outline-brand-gold relative grid h-12 w-12 place-items-center rounded-full shadow-[0_8px_24px_-6px_rgba(234,179,8,0.7)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="border-border bg-surface text-text-primary pointer-events-none absolute right-14 rounded-md border px-2 py-1 text-xs font-semibold whitespace-nowrap opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          Download Parikshe app
        </span>
        <Icon name="download" className="h-6 w-6" />
      </a>
    </div>
  );
}
