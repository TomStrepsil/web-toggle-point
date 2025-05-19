import { test, expect } from "@playwright/test";
import setExperimentHeaders from "../playwright.setExperimentHeaders";
import locateWithinExample from "../playwright.locateInExample";
import getFixtureURL from "../playwright.getFixtureUrl";
const fixtureURL = getFixtureURL(import.meta.url);

test.describe("varying a component with multiple features targeting a join point", () => {
  test.describe("when an experiments header set", () => {
    setExperimentHeaders(test);

    test("it shows the variant of the feature", async ({ page }) => {
      await page.goto(fixtureURL);
      await expect(locateWithinExample(page, "variant 1")).toBeInViewport();
    });
  });

  test.describe("when the first feature has no matching variant, but a second feature targeting the same join point does", () => {
    setExperimentHeaders(test, {
      "test-feature": { bucket: "control" },
      "test-feature-2": { bucket: "test-variant" }
    });

    test("it shows a varied first module, with the second unvaried (since excluded by the toggle config)", async ({
      page
    }) => {
      await page.goto(fixtureURL);
      await expect(locateWithinExample(page, "variant 2")).toBeInViewport();
    });
  });
});
