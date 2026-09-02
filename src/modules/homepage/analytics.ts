/**
 * Homepage analytics — NO-OP STUB (Proposed).
 *
 * No analytics vendor is selected (roadmap stage 7). This module only defines
 * the event *names* and *shapes* from `docs/contracts/EVENT_CATALOG.md` so the
 * instrumentation points exist in the UI code. It performs no network calls, no
 * storage, and carries no personal data.
 *
 * Rules honoured now so the real implementation inherits them:
 * - `.claude/rules/events.md`: past-tense fact names, versioned (`.v1`).
 * - `.claude/rules/lead-conversion.md`: a banner click is NOT a conversion.
 * - `.claude/rules/events.md`: analytics failure must never block the user
 *   action — hence every call here is wrapped and swallowed.
 */

export type HomepageEvent =
  | { type: "page.viewed.v1"; pageId: "homepage" }
  | { type: "cta.clicked.v1"; ctaId: string }
  | { type: "campaign.impression_recorded.v1"; bannerId: string }
  | { type: "campaign.clicked.v1"; bannerId: string }
  | {
      type: "homepage.category_selected.v1";
      categoryId: string;
      source: "chip" | "card";
    }
  | { type: "homepage.popup_eligible.v1" }
  | { type: "homepage.popup_viewed.v1" }
  | { type: "homepage.popup_clicked.v1" }
  | { type: "homepage.popup_dismissed.v1" }
  | { type: "homepage.popup_converted.v1" }
  | { type: "homepage.testimonial_video_played.v1"; storyId: string }
  | { type: "lead.form_opened.v1"; entryPoint: string }
  | { type: "lead.form_started.v1" }
  | { type: "lead.submitted.v1" }
  | { type: "lead.submit_failed.v1"; reason: string };

export function emitHomepageEvent(event: HomepageEvent): void {
  try {
    if (process.env.NODE_ENV !== "production") {
      // Dev-only visibility. Not a telemetry sink.
      console.debug("[homepage-event]", event.type, event);
    }
    // TODO(stage-7): forward to the consent-aware analytics module once a
    // vendor is selected and an ADR is recorded. Must respect consent state
    // and dedupe browser/server conversions via stable event IDs.
  } catch {
    // Analytics must never break the page.
  }
}
