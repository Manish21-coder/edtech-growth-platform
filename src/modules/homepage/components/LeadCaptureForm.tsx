"use client";

import { useId, useState, type FormEvent } from "react";
import { CATEGORIES } from "../content";
import { emitHomepageEvent } from "../analytics";

/**
 * HP-410 / HP-411 / HP-412 / HP-413 — ONE shared lead form for:
 * "Request a callback / counselling", "Course-interest enquiry", and the
 * WhatsApp/contact CTA fallback.
 *
 * LOW-FIDELITY: submission is a CLIENT-SIDE SIMULATED STUB. There is no network
 * call, no persistence, no CRM. `docs/modules/homepage/CONTRACT.md` and the
 * lead module (roadmap stage 8) own the real pipeline: idempotency key,
 * normalized dedupe, first/latest/conversion-touch attribution, raw UTM,
 * versioned consent records, server-side validation, spam protection.
 *
 * States implemented (`.claude/rules/design-ux.md`, `lead-conversion.md`):
 * default · focused (CSS) · validation-error · submitting · success · failure ·
 * duplicate-submission · consent/privacy-notice.
 *
 * Fields are intentionally minimal and NOT final (product-owner: do not
 * finalize fields, consent language, APIs or storage until approved).
 */

type Status = "idle" | "submitting" | "success" | "failure" | "duplicate";

interface FieldErrors {
  name?: string;
  contact?: string;
  category?: string;
  consent?: string;
}

const SIMULATED_DUPLICATE_CONTACT = "duplicate@example.com";

export function LeadCaptureForm({ onSuccess }: { onSuccess?: () => void }) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (!started) {
      setStarted(true);
      emitHomepageEvent({ type: "lead.form_started.v1" });
    }
  }

  function validate(data: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const category = String(data.get("category") ?? "");
    const consent = data.get("consent") === "on";

    if (name.length < 2)
      next.name = "Enter your name so we know who to contact.";

    // Accept either an email or a phone-like string. Real normalization/dedupe
    // rules live in the lead module.
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const looksLikePhone = /^[+()\-\s\d]{7,}$/.test(contact);
    if (!looksLikeEmail && !looksLikePhone) {
      next.contact = "Enter a valid phone number or email address.";
    }

    if (!category)
      next.category = "Choose the exam or category you are interested in.";
    if (!consent)
      next.consent =
        "Please confirm you agree to be contacted about your enquiry.";

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the summary so screen-reader users hear the errors.
      document.getElementById(`${formId}-error-summary`)?.focus();
      return;
    }

    setStatus("submitting");
    // Simulated latency + outcomes. No real request is made.
    await new Promise((r) => setTimeout(r, 600));

    const contact = String(data.get("contact") ?? "")
      .trim()
      .toLowerCase();
    if (contact === SIMULATED_DUPLICATE_CONTACT) {
      setStatus("duplicate");
      emitHomepageEvent({ type: "lead.submit_failed.v1", reason: "duplicate" });
      return;
    }
    if (contact.includes("fail")) {
      setStatus("failure");
      emitHomepageEvent({
        type: "lead.submit_failed.v1",
        reason: "simulated_error",
      });
      return;
    }

    setStatus("success");
    emitHomepageEvent({ type: "lead.submitted.v1" });
    onSuccess?.();
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-border bg-surface-muted border p-4 text-sm"
      >
        <p className="text-text-primary font-semibold">
          Thank you — we&rsquo;ll be in touch.
        </p>
        <p className="text-text-muted mt-1">
          A counsellor will call you about your enquiry shortly.
        </p>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      onChange={markStarted}
      noValidate
      aria-describedby={`${formId}-privacy`}
      className="flex flex-col gap-4"
    >
      {hasErrors ? (
        <div
          id={`${formId}-error-summary`}
          tabIndex={-1}
          role="alert"
          className="border-danger bg-surface border p-3 text-sm"
        >
          <p className="text-text-primary font-semibold">
            Please fix the following:
          </p>
          <ul className="text-text-muted mt-1 list-disc pl-5">
            {errors.name ? <li>{errors.name}</li> : null}
            {errors.contact ? <li>{errors.contact}</li> : null}
            {errors.category ? <li>{errors.category}</li> : null}
            {errors.consent ? <li>{errors.consent}</li> : null}
          </ul>
        </div>
      ) : null}

      {status === "duplicate" ? (
        <div
          role="status"
          className="border-border bg-surface-muted text-text-muted rounded-lg border p-3 text-sm"
        >
          We already have an enquiry from this contact — we&rsquo;ll follow up
          on the existing request.
        </div>
      ) : null}

      {status === "failure" ? (
        <div
          role="alert"
          className="border-danger bg-surface rounded-lg border p-3 text-sm"
        >
          <p className="text-text-primary font-semibold">
            Something went wrong sending your enquiry.
          </p>
          <p className="text-text-muted mt-1">
            Your details are still here — please try again.
          </p>
        </div>
      ) : null}

      <Field
        id={`${formId}-name`}
        name="name"
        label="Your name"
        error={errors.name}
        autoComplete="name"
      />

      <Field
        id={`${formId}-contact`}
        name="contact"
        label="Phone number or email"
        hint="We use this only to contact you about this enquiry."
        error={errors.contact}
        autoComplete="tel email"
      />

      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${formId}-category`}
          className="text-text-primary text-sm font-medium"
        >
          Exam / category of interest
        </label>
        <select
          id={`${formId}-category`}
          name="category"
          defaultValue=""
          aria-invalid={errors.category ? "true" : undefined}
          aria-describedby={
            errors.category ? `${formId}-category-error` : undefined
          }
          className="border-border bg-surface rounded-md border px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Choose one
          </option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        {errors.category ? (
          <p id={`${formId}-category-error`} className="text-danger text-xs">
            {errors.category}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={`${formId}-message`}
          className="text-text-primary text-sm font-medium"
        >
          Anything else?{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          className="border-border bg-surface rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <fieldset className="border-border flex flex-col gap-2 rounded-lg border p-3">
        <legend className="text-text-muted px-1 text-xs font-semibold">
          Consent
        </legend>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" className="mt-1" />
          <span>
            I agree that Parikshe may contact me about this enquiry.
            {errors.consent ? (
              <span className="text-danger block text-xs">
                {errors.consent}
              </span>
            ) : null}
          </span>
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="marketingConsent" className="mt-1" />
          <span className="text-text-muted">
            Optional: send me updates about courses and offers. (Separate from
            the enquiry above; never pre-checked.)
          </span>
        </label>
      </fieldset>

      <p id={`${formId}-privacy`} className="text-text-muted text-xs">
        We only use your details to respond to this enquiry. See our{" "}
        <a href="#" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-cta-bg text-cta-text hover:bg-cta-bg-hover inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a callback"}
      </button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-text-primary text-sm font-medium">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-text-muted text-xs">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        name={name}
        type="text"
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          [hintId, errorId].filter(Boolean).join(" ") || undefined
        }
        className="border-border bg-surface rounded-md border px-3 py-2 text-sm"
      />
      {error ? (
        <p id={errorId} className="text-danger text-xs">
          {error}
        </p>
      ) : null}
    </div>
  );
}
