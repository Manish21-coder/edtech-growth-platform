import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LeadCaptureForm } from "./components/LeadCaptureForm";
import {
  isPopupSuppressed,
  markPopupShown,
  markPopupDismissed,
  POPUP_DISMISSED_KEY,
  LEAD_SUPPRESS_KEY,
} from "./components/promoStorage";

function fill(label: RegExp, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

describe("LeadCaptureForm (HP-410..HP-413)", () => {
  it("blocks submission and summarises errors when required fields are empty", async () => {
    render(<LeadCaptureForm />);
    fireEvent.click(
      screen.getByRole("button", { name: /request a callback/i }),
    );

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/enter your name/i);
    expect(alert).toHaveTextContent(/valid phone number or email/i);
    expect(alert).toHaveTextContent(/agree to be contacted/i);
    expect(screen.queryByText(/we’ll be in touch/i)).toBeNull();
  });

  it("reaches the success state with valid input and consent", async () => {
    const onSuccess = vi.fn();
    render(<LeadCaptureForm onSuccess={onSuccess} />);

    fill(/your name/i, "Asha");
    fill(/phone number or email/i, "asha@example.com");
    fireEvent.change(screen.getByLabelText(/exam \/ category/i), {
      target: { value: "pu2-science" },
    });
    fireEvent.click(screen.getByLabelText(/parikshe may contact me/i));
    fireEvent.click(
      screen.getByRole("button", { name: /request a callback/i }),
    );

    expect(await screen.findByText(/we’ll be in touch/i)).toBeInTheDocument();
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });

  it("shows the duplicate-submission state for a known contact", async () => {
    render(<LeadCaptureForm />);

    fill(/your name/i, "Asha");
    fill(/phone number or email/i, "duplicate@example.com");
    fireEvent.change(screen.getByLabelText(/exam \/ category/i), {
      target: { value: "pu1-science" },
    });
    fireEvent.click(screen.getByLabelText(/parikshe may contact me/i));
    fireEvent.click(
      screen.getByRole("button", { name: /request a callback/i }),
    );

    expect(
      await screen.findByText(/already have an enquiry/i),
    ).toBeInTheDocument();
  });
});

describe("promoStorage — 10-minute repeat cadence (HP-320 / HP-323)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  const T = 1_000_000_000_000;
  const MIN = 60_000;

  it("is not suppressed on a fresh browser", () => {
    expect(isPopupSuppressed()).toBe(false);
  });

  it("re-shows ~10 minutes after it was last shown", () => {
    markPopupShown(T);
    expect(isPopupSuppressed(T + 5 * MIN)).toBe(true);
    expect(isPopupSuppressed(T + 11 * MIN)).toBe(false);
  });

  it("is hidden for 10 minutes after a dismissal, then eligible again", () => {
    markPopupDismissed(T);
    expect(isPopupSuppressed(T + 5 * MIN)).toBe(true);
    expect(isPopupSuppressed(T + 11 * MIN)).toBe(false);
  });

  it("is suppressed for 30 days after a lead submission (HP-323)", () => {
    window.localStorage.setItem(LEAD_SUPPRESS_KEY, String(T));
    expect(isPopupSuppressed(T + 24 * 60 * MIN)).toBe(true);
    expect(isPopupSuppressed(T + 31 * 24 * 60 * MIN)).toBe(false);
  });

  it("ignores a corrupt dismissal timestamp", () => {
    window.localStorage.setItem(POPUP_DISMISSED_KEY, "not-a-number");
    expect(isPopupSuppressed()).toBe(false);
  });
});
