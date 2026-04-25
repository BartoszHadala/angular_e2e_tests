// Scenario: Responsiveness and element visibility
// - Verify visibility of key elements at different screen resolutions
//
// Playwright MCP E2E Test (POM)

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages');

const viewports = [
  { name: 'desktop', size: { width: 1920, height: 1080 } },
  { name: 'tablet', size: { width: 1024, height: 768 } },
  { name: 'mobile', size: { width: 375, height: 667 } },
];

const keyElements = [
  { name: 'banner', locator: page => new HomePage(page).banner },
  { name: 'welcome text', locator: page => new HomePage(page).welcomeText },
  { name: 'form link', locator: page => new HomePage(page).linkForm },
  { name: 'stepper link', locator: page => new HomePage(page).linkStepper },
];

test.describe('Responsiveness and element visibility', () => {
  for (const viewport of viewports) {
    test(`Key elements visible on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport.size);
      const home = new HomePage(page);
      await test.step('Open home page', async () => {
        await home.goto();
      });
      for (const el of keyElements) {
        await test.step(`Check ${el.name} is visible`, async () => {
          await expect(el.locator(page)).toBeVisible();
        });
      }
    });
  }
});
