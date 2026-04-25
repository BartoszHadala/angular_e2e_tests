// Scenario: Stepper Form functionality (/stepper)
// - Go through all steps (name, address, summary)
// - Validate required fields at each step
// - Verify summary correctness
// - Test "Back" and "Reset" buttons
//
// Playwright MCP E2E Test (POM)

const { test, expect } = require('@playwright/test');
const { HomePage, StepperPage } = require('../pages');

test.describe('Stepper Form functionality', () => {
  test('Go through all steps and verify summary', async ({ page }) => {
    const home = new HomePage(page);
    const stepper = new StepperPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /stepper via menu', async () => {
      await home.linkStepper.click();
    });
    await test.step('Fill in name and go to next step', async () => {
      await expect(stepper.inputName).toBeVisible();
      await stepper.inputName.fill('Test Name');
      await stepper.firstStepPanel.getByRole('button', { name: /next/i }).click();
    });
    await test.step('Fill in address and go to summary', async () => {
      await expect(stepper.inputAddress).toBeVisible();
      await stepper.inputAddress.fill('Test Address');
      await stepper.secondStepPanel.getByRole('button', { name: /next/i }).click();
    });
    await test.step('Verify summary', async () => {
      await expect(stepper.summaryText).toBeVisible();
      await expect(page.getByText('Test Name')).toBeVisible();
      await expect(page.getByText('Test Address')).toBeVisible();
    });
  });

  test('Validate required fields at each step', async ({ page }) => {
    const home = new HomePage(page);
    const stepper = new StepperPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /stepper via menu', async () => {
      await home.linkStepper.click();
    });
    await test.step('Try to go to next step without filling name', async () => {
      await stepper.firstStepPanel.getByRole('button', { name: /next/i }).click();
      // Sprawdź widoczność czerwonego labela 'Name *'
      await expect(page.getByText('Name *', { exact: true })).toBeVisible();
    });
    await test.step('Fill name and go to address step', async () => {
      await stepper.inputName.fill('Test Name');
      await stepper.firstStepPanel.getByRole('button', { name: /next/i }).click();
    });
    await test.step('Try to go to summary without filling address', async () => {
      await stepper.secondStepPanel.getByRole('button', { name: /next/i }).click();
      // Sprawdź widoczność czerwonego labela 'Address *'
      await expect(page.getByText('Address *', { exact: true })).toBeVisible();
    });
  });

  test('Test Back and Reset buttons', async ({ page }) => {
    const home = new HomePage(page);
    const stepper = new StepperPage(page);
    await test.step('Open home page', async () => {
      await home.goto();
    });
    await test.step('Go to /stepper via menu', async () => {
      await home.linkStepper.click();
    });
    await test.step('Fill in all steps', async () => {
      await stepper.inputName.fill('Test Name');
      await stepper.firstStepPanel.getByRole('button', { name: /next/i }).click();
      await stepper.inputAddress.fill('Test Address');
      await stepper.secondStepPanel.getByRole('button', { name: /next/i }).click();
    });
    await test.step('Go back to address step', async () => {
      await stepper.doneStepPanel.getByRole('button', { name: /back/i }).click();
      await expect(stepper.inputAddress).toBeVisible();
    });
    await test.step('Go back to name step', async () => {
      await stepper.secondStepPanel.getByRole('button', { name: /back/i }).first().click();
      await expect(stepper.inputName).toBeVisible();
    });
    await test.step('Reset the stepper', async () => {
      // Go to summary again
      await stepper.inputName.fill('Test Name');
      await stepper.firstStepPanel.getByRole('button', { name: /next/i }).click();
      await stepper.inputAddress.fill('Test Address');
      await stepper.secondStepPanel.getByRole('button', { name: /next/i }).click();
      await stepper.doneStepPanel.getByRole('button', { name: /reset/i }).click();
      await expect(stepper.inputName).toHaveValue('');
    });
  });
});
