import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Toolchain proof, not a product feature: confirms the app boots, renders a
// top-level heading, and has no automatically detectable WCAG A/AA violations
// on the home route. Real journeys are added with their feature blocks.

test("home page responds and renders a heading", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("home page has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
