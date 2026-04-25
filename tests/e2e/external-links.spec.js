// Scenario: External links and resources
// - Check presence and functionality of Angular links (Twitter, YouTube, documentation)
//
// Playwright MCP E2E Test (POM)

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages');

const externalLinks = [
  { name: /twitter/i, url: 'https://twitter.com/angular' },
  { name: /youtube/i, url: 'https://youtube.com/angular' },
  // Add documentation links if present in the menu
];

test.describe('External links and resources', () => {
  test('Check presence and href of Angular links', async ({ page }) => {
    const home = new HomePage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    for (const link of externalLinks) {
      await test.step(`Check presence and href for ${link.name}`, async () => {
        const locator = home.banner.getByRole('link', { name: link.name });
        await expect(locator).toBeVisible();
        await expect(locator).toHaveAttribute('href', link.url);
      });
    }
  });

  test('Check that Angular links open correct pages', async ({ page, context }) => {
    const home = new HomePage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    for (const link of externalLinks) {
      await test.step(`Click ${link.name} and verify new page`, async () => {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          home.banner.getByRole('link', { name: link.name }).click(),
        ]);
        await newPage.waitForLoadState();
        if (link.name.toString().toLowerCase().includes('twitter')) {
          await expect(newPage).toHaveURL(/(twitter.com|x.com)\/angular/);
        } else if (link.name.toString().toLowerCase().includes('youtube')) {
          await expect(newPage).toHaveURL(/youtube.com/);
        } else {
          await expect(newPage).toHaveURL(link.url);
        }
        await newPage.close();
      });
    }
  });
});
