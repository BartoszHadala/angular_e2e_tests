# Angular E2E Tests – Playwright

## Project Setup

This project uses [Playwright](https://playwright.dev/) for end-to-end (E2E) testing in JavaScript. All tests are located in the `tests/e2e` directory and Page Objects in `tests/pages`.

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer recommended)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/BartoszHadala/angular_e2e_tests
   cd angular_e2e_tests
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. (Optional) Install Playwright browsers:
   ```sh
   npx playwright install
   ```

### Running Tests Locally
To run all E2E tests:
```sh
npm test
```
Or directly:
```sh
npx playwright test
```

To run a specific test file:
```sh
npx playwright test tests/e2e/hero-form.spec.js
```

To view the HTML report after a run:
```sh
npx playwright show-report
```

### Project Structure
- `tests/e2e/` – E2E test files
- `tests/pages/` – Page Object Model classes
- `playwright.config.js` – Playwright configuration
- `package.json` – Project dependencies and scripts

### GitHub Actions CI
This project is ready for CI with GitHub Actions. Example workflow:
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
```

### Notes
- Tests are written in JavaScript. For TypeScript, adjust config and file extensions as needed.
- Playwright version is specified in `package.json`.
- For troubleshooting, see Playwright documentation: https://playwright.dev/docs/intro

---

## How to Check if Tests Work
- Run `npx playwright test` locally or in CI.
- All tests should pass (exit code 0). If any test fails, check the HTML report for details.
- In GitHub Actions, the workflow will fail if any test fails.

---

For questions or issues, please contact the repository maintainer.
