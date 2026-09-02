import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Homepage route", () => {
  it("renders a single level-1 heading (the hero)", () => {
    render(<Page />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it("renders the 'Explore courses by class' section with a card per class", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { name: /explore courses by class/i }),
    ).toBeInTheDocument();
    // One "Explore courses" button per class card (6 classes).
    const exploreLinks = screen.getAllByRole("link", {
      name: /explore courses/i,
    });
    expect(exploreLinks.length).toBeGreaterThanOrEqual(6);
  });

  it("shows the Free-vs-Paid comparison exactly once (two columns)", () => {
    render(<Page />);
    // Section heading renders once; the paid column's "Recommended" badge is
    // unique, so exactly one badge means exactly one comparison (HP-091).
    expect(
      screen.getAllByRole("heading", {
        name: /free youtube content vs paid parikshe products/i,
      }),
    ).toHaveLength(1);
    expect(screen.getAllByText("Recommended")).toHaveLength(1);
  });

  it("renders the approved phone number and a WhatsApp click-to-chat link", () => {
    render(<Page />);
    // Approved number (HP-202) present as a tel: link.
    const phone = screen.getByRole("link", { name: "6366548224" });
    expect(phone).toHaveAttribute("href", "tel:6366548224");
    // The PDF's unverified alternative must not appear.
    expect(screen.queryByText(/9686390808/)).toBeNull();
    // WhatsApp links to wa.me on the same approved number.
    const wa = screen.getByRole("link", { name: /chat on whatsapp/i });
    expect(wa).toHaveAttribute("href", "https://wa.me/916366548224");
  });
});
