// StepperPage POM
class StepperPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.tabName = page.getByRole('tab', { name: /fill out your name/i });
    this.tabAddress = page.getByRole('tab', { name: /fill out your address/i });
    this.tabDone = page.getByRole('tab', { name: /done/i });
    this.inputName = page.locator('input[formcontrolname="firstCtrl"]');
    this.inputAddress = page.getByRole('textbox', { name: /address/i });
    this.firstStepPanel = page.locator('[role="tabpanel"]').filter({ hasText: 'Name' });
    this.secondStepPanel = page.locator('[role="tabpanel"]').filter({ hasText: 'Address' });
    this.doneStepPanel = page.locator('[role="tabpanel"]').filter({ hasText: 'Done' });
    this.summaryText = page.getByText(/you are now done!/i);
  }
}

module.exports = { StepperPage };