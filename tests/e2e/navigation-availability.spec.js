// Scenario: Navigation and page availability check
// - Go to home page and verify key elements
// - Navigate to /form and verify form elements
// - Navigate to /stepper and verify stepper process
//
// Playwright MCP E2E Test (POM)
// Scenario: Navigation and page availability check
// Playwright MCP E2E Test

const { test, expect } = require('@playwright/test');
const { HomePage, FormPage, StepperPage } = require('../pages');

test.describe('Navigation and page availability', () => {
  test('Go to home page and verify key elements', async ({ page }) => {
    const home = new HomePage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Check banner (menu)', async () => {
      await expect(home.banner).toBeVisible();
      await expect(home.linkWelcome).toBeVisible();
      await expect(home.linkForm).toBeVisible();
      await expect(home.linkStepper).toBeVisible();
      await expect(home.linkTwitter).toBeVisible();
      await expect(home.linkYouTube).toBeVisible();
    });
    await test.step('Check welcome text', async () => {
      await expect(home.welcomeText).toBeVisible();
    });
  });

  test('Navigate to /form via menu and verify form', async ({ page }) => {
    const home = new HomePage(page);
    const form = new FormPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /form via menu', async () => {
      await home.linkForm.click();
    });
    await test.step('Check form header', async () => {
      await expect(form.header).toBeVisible();
    });
    await test.step('Check form fields', async () => {
      await expect(form.inputName).toBeVisible();
      await expect(form.inputAlterEgo).toBeVisible();
      await expect(form.inputHeroPower).toBeVisible();
    });
    await test.step('Check form buttons', async () => {
      await expect(form.buttonSubmit).toBeVisible();
      await expect(form.buttonNewHero).toBeVisible();
    });
  });

  test('Navigate to /stepper via menu and verify stepper process', async ({ page }) => {
    const home = new HomePage(page);
    const stepper = new StepperPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /stepper via menu', async () => {
      await home.linkStepper.click();
    });
    await test.step('Check stepper tabs', async () => {
      await expect(stepper.tabName).toBeVisible();
      await expect(stepper.tabAddress).toBeVisible();
      await expect(stepper.tabDone).toBeVisible();
    });
    await test.step('Fill and proceed through step 1', async () => {
      await expect(stepper.inputName).toBeVisible();
      await stepper.inputName.fill('Test Name');
      await expect(stepper.firstStepPanel.getByRole('button', { name: /next/i })).toBeVisible();
      await stepper.firstStepPanel.getByRole('button', { name: /next/i }).click();
    });
    await test.step('Fill and proceed through step 2', async () => {
      await expect(stepper.inputAddress).toBeVisible();
      await stepper.inputAddress.fill('Test Address');
      await expect(stepper.secondStepPanel.getByRole('button', { name: /next/i })).toBeVisible();
      await stepper.secondStepPanel.getByRole('button', { name: /next/i }).click();
    });
    await test.step('Check summary and buttons', async () => {
      await expect(stepper.summaryText).toBeVisible();
      await expect(stepper.doneStepPanel.getByRole('button', { name: /back/i })).toBeVisible();
      await expect(stepper.doneStepPanel.getByRole('button', { name: /reset/i })).toBeVisible();
    });
  });
});
