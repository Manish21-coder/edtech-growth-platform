/**
 * Client-side eligibility state for the promotional popup (HP-320..HP-327).
 *
 * LOW-FIDELITY: rules hardcoded here. In the real implementation every window is
 * admin-configurable (HP-326). Purchase-based suppression (HP-325) is absent —
 * it needs auth/purchase-state integration that isn't selected.
 *
 * Product-owner override (2026-09-02): the popup **repeats every 10 minutes**
 * while the visitor is on the site (HP-321 "once per session" and HP-322 "24h
 * after dismissal" are superseded by this shorter cadence). A successful lead
 * submission still suppresses it for 30 days (HP-323).
 */

export const POPUP_SHOWN_KEY = "parikshe.popup.lastShownAt";
export const POPUP_DISMISSED_KEY = "parikshe.popup.dismissedAt";
export const LEAD_SUPPRESS_KEY = "parikshe.lead.submittedAt";

/** HP-320 — first eligibility after this dwell time. */
export const DWELL_MS = 5_000;
/** Product-owner: re-show cadence. */
export const REPEAT_MS = 10 * 60 * 1000;
/** After a dismissal, wait this long before showing again (= the repeat cadence). */
export const DISMISS_SUPPRESS_MS = REPEAT_MS;
/** HP-323 — 30 days after a successful lead. */
export const LEAD_SUPPRESS_MS = 30 * 24 * 60 * 60 * 1000;

function readNumber(key: string): number | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function isPopupSuppressed(now: number = Date.now()): boolean {
  try {
    // HP-323 — 30 days after a successful lead submission
    const submittedAt = readNumber(LEAD_SUPPRESS_KEY);
    if (submittedAt !== null && now - submittedAt < LEAD_SUPPRESS_MS)
      return true;

    // Within 10 min of a dismissal
    const dismissedAt = readNumber(POPUP_DISMISSED_KEY);
    if (dismissedAt !== null && now - dismissedAt < DISMISS_SUPPRESS_MS)
      return true;

    // Within 10 min of it last being shown
    const shownAt = readNumber(POPUP_SHOWN_KEY);
    if (shownAt !== null && now - shownAt < REPEAT_MS) return true;

    return false;
  } catch {
    // Storage unavailable → fail safe: do not show.
    return true;
  }
}

export function markPopupShown(now: number = Date.now()): void {
  try {
    window.localStorage.setItem(POPUP_SHOWN_KEY, String(now));
  } catch {
    /* ignore */
  }
}

export function markPopupDismissed(now: number = Date.now()): void {
  try {
    window.localStorage.setItem(POPUP_DISMISSED_KEY, String(now));
  } catch {
    /* ignore */
  }
}
