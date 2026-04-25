// FormPage POM
class FormPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: /hero form/i });
    this.inputName = page.getByRole('textbox', { name: 'Name' });
    this.inputAlterEgo = page.getByLabel(/alter ego/i);
    this.inputHeroPower = page.getByLabel(/hero power/i);
    this.buttonSubmit = page.getByRole('button', { name: /submit/i });
    this.buttonNewHero = page.getByRole('button', { name: /new hero/i });
  }
}

module.exports = { FormPage };