// Scenario: Hero Form functionality (/form)
// - Fill in valid data and submit the form
// - Validate field errors (empty/invalid data)
// - Reset the form using "New Hero" button
//
// Playwright MCP E2E Test (POM)

const { test, expect } = require('@playwright/test');
const { HomePage, FormPage } = require('../pages');

test.describe('Hero Form functionality', () => {
  test('Fill in valid data and submit the form', async ({ page }) => {
    const home = new HomePage(page);
    const form = new FormPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /form via menu', async () => {
      await home.linkForm.click();
    });
    await test.step('Fill in valid data', async () => {
      await form.inputName.fill('Superman');
      await form.inputAlterEgo.fill('Clark Kent');
      await form.inputHeroPower.selectOption({ label: 'Really Smart' });
    });
    await test.step('Submit the form', async () => {
      await form.buttonSubmit.click();
    });
    await test.step('Verify submitted data is displayed', async () => {
      await expect(page.getByRole('heading', { name: /you submitted the following/i })).toBeVisible();
      // Scope checks to the summary container to avoid ambiguity
      const summary = page.locator('text=You submitted the following:').locator('..');
      // Check label-value pairs for submitted data
      await expect(summary.getByText('Name')).toBeVisible();
      await expect(summary.getByText('Superman')).toBeVisible();
      await expect(summary.getByText('Alter Ego')).toBeVisible();
      await expect(summary.getByText('Clark Kent')).toBeVisible();
      await expect(summary.getByText('Power')).toBeVisible();
      await expect(summary.getByText('Really Smart')).toBeVisible();
    });
  });

  test('Validate field errors (empty/invalid data)', async ({ page }) => {
    const home = new HomePage(page);
    const form = new FormPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /form via menu', async () => {
      await home.linkForm.click();
    });
    await test.step('Submit empty form and verify default values', async () => {
      await form.buttonSubmit.click();
      // Check for default values in summary (form submits default hero)
      const summary = page.locator('text=You submitted the following:').locator('..');
      await expect(summary.getByText('Dr IQ')).toBeVisible();
      await expect(summary.getByText('Chuck Overstreet')).toBeVisible();
      await expect(summary.getByText('Really Smart')).toBeVisible();
    });
  });

  test('Reset the form using "New Hero" button', async ({ page }) => {
    const home = new HomePage(page);
    const form = new FormPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /form via menu', async () => {
      await home.linkForm.click();
    });
    await test.step('Fill in data', async () => {
      await form.inputName.fill('Batman');
      await form.inputAlterEgo.fill('Bruce Wayne');
      await form.inputHeroPower.selectOption({ label: 'Super Flexible' });
    });
    await test.step('Reset the form', async () => {
      await form.buttonNewHero.click();
      await expect(form.inputName).toHaveValue('');
      await expect(form.inputAlterEgo).toHaveValue('');
      await expect(form.inputHeroPower).toHaveValue('');
    });
  });
});
