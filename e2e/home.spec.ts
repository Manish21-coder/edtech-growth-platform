import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Homepage low-fidelity build. Critical journeys: page renders server HTML,
// category discovery is present, the lead form opens and validates, and there
// are no automatically detectable WCAG A/AA violations.

test("homepage responds with server-rendered content and one h1", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  // One h1 for SEO/a11y (visually hidden — the hero is banners only).
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  // Server-rendered course discovery (SEO-critical, HP-013).
  await expect(
    page.getByRole("link", { name: /explore courses/i }).first(),
  ).toBeVisible();
  // The Free-vs-Paid comparison appears exactly once (HP-091, two columns).
  await expect(page.getByText("Recommended")).toHaveCount(1);
});

test("lead form opens in a dialog and blocks an empty submission", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: /request a callback \/ counselling/i })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /^request a callback$/i }).click();
  await expect(dialog.getByRole("alert")).toContainText(/enter your name/i);
});

test("homepage has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
