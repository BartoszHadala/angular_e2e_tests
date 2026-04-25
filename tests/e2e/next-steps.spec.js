// Scenario: Next Steps block interaction
// - Click each action block in the "Next Steps" section
// - Validate that the corresponding command or info appears in the terminal block below
//
// Playwright MCP E2E Test (POM)

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages');

const actions = [
  { label: /new component/i, expected: 'ng generate component xyz' },
  { label: /angular material/i, expected: 'ng add @angular/material' },
  { label: /add pwa support/i, expected: 'ng add @angular/pwa' },
  { label: /add dependency/i, expected: 'ng add' },
  { label: /run and watch tests/i, expected: 'ng test' },
  { label: /build for production/i, expected: 'ng build' },
];

test.describe('Next Steps block interaction', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await expect(page.getByRole('heading', { name: /next steps/i })).toBeVisible();
  });

  for (const action of actions) {
    test(`Click '${action.label}' and validate terminal`, async ({ page }) => {
      // Kliknij bloczek
      await page.getByRole('button', { name: action.label }).click();
      // Sprawdź, czy w terminalu pojawił się odpowiedni tekst
      await expect(page.getByText(action.expected, { exact: false })).toBeVisible();
    });
  }
});
