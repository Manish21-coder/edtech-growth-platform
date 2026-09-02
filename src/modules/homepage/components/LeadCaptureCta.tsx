"use client";

import { useEffect, useRef, useState } from "react";
import { emitHomepageEvent } from "../analytics";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { LEAD_SUPPRESS_KEY } from "./promoStorage";

/**
 * HP-410/411/412 — a button that opens the shared lead form in a modal dialog.
 * Native <dialog> gives Esc-to-close, focus trapping and inert background.
 * On successful submission we record a timestamp so the promo popup is
 * suppressed for 30 days (HP-323).
 */
export function LeadCaptureCta({
  label,
  entryPoint,
  variant = "primary",
  className = "",
}: {
  label: string;
  entryPoint: string;
  variant?: "primary" | "secondary" | "link" | "bare";
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleOpen() {
    setOpen(true);
    emitHomepageEvent({ type: "lead.form_opened.v1", entryPoint });
  }

  function handleSuccess() {
    try {
      window.localStorage.setItem(LEAD_SUPPRESS_KEY, String(Date.now()));
    } catch {
      /* storage unavailable — popup suppression just won't persist */
    }
    emitHomepageEvent({ type: "homepage.popup_converted.v1" });
  }

  const triggerClass =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-md bg-cta-bg px-4 py-2.5 text-sm font-bold text-cta-text hover:bg-cta-bg-hover"
      : variant === "secondary"
        ? "inline-flex items-center justify-center rounded-md border border-border-strong px-4 py-2.5 text-sm font-bold text-text-primary hover:bg-surface-muted"
        : variant === "bare"
          ? "text-left"
          : "text-sm font-bold text-text-primary underline underline-offset-2";

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`${triggerClass} ${className}`}
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="lead-dialog-title"
        className="border-border bg-surface m-auto w-[min(32rem,92vw)] rounded-xl border p-0 backdrop:bg-black/50"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="max-h-[85vh] overflow-y-auto p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2
              id="lead-dialog-title"
              className="text-text-primary text-lg font-bold"
            >
              Request a callback
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-border-strong text-text-muted rounded-md border px-2 py-1 text-sm"
            >
              Close
            </button>
          </div>
          <LeadCaptureForm onSuccess={handleSuccess} />
        </div>
      </dialog>
    </>
  );
}
