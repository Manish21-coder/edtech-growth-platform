import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

// Toolchain proof: confirms Vitest + React Testing Library render App Router
// server-component output. Replaced by real component tests with their blocks.
describe("Home page", () => {
  it("renders a level-1 heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: /edit the/i }),
    ).toBeInTheDocument();
  });
});
