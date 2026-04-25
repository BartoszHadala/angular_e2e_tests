// HomePage POM for RecruitmentApp
class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.banner = page.getByRole('banner');
    this.linkWelcome = this.banner.getByRole('link', { name: /welcome/i });
    this.linkForm = this.banner.getByRole('link', { name: /form/i });
    this.linkStepper = this.banner.getByRole('link', { name: /stepper/i });
    this.linkTwitter = this.banner.getByRole('link', { name: /twitter/i });
    this.linkYouTube = this.banner.getByRole('link', { name: /youtube/i });
    this.welcomeText = page.getByText(/recruitment app is running!/i);
  }
  async goto() {
    await this.page.goto('https://angular-qa-recruitment-app.netlify.app/');
  }
}

module.exports = { HomePage };