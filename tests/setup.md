# RecruitmentApp – E2E Test Plan and Application Overview

## Application Structure

### Frontend Routes

- `/` – Home Page (Welcome)
- `/form` – "Hero Form" page (fields: Name, Alter Ego, Hero Power)
- `/stepper` – Stepper Form (multi-step):
  - Step 1: Name
  - Step 2: Address
  - Step 3: Summary

The navigation menu also includes external resource links:
- Angular on Twitter
- Angular on YouTube
- Angular Documentation, CLI, Blog, DevTools

### API (Backend Endpoints)

Based on the analysis of public pages, there are no visible API calls (fetch/XHR) or backend endpoints. The forms appear to operate locally, with no observable backend requests. It is possible that the API is hidden or the application operates in a demonstration mode without a backend.

To obtain further API details, it is recommended to:
- Review the application's source code (e.g., GitHub repository)
- Analyze network traffic using browser developer tools

---

## E2E Test Plan (Playwright)

### Approach
End-to-end (E2E) tests are performed exclusively on the UI layer, without direct API testing. The focus is on critical user flows, form validation, and navigation. All tests are implemented using Playwright MCP.

### Test Scenarios

#### 1. Navigation and Page Availability
- Navigate to the home page (`/`) and verify the visibility of key elements (banner, navigation links, welcome text)
- Navigate to `/form` via the menu and verify the form is displayed
- Navigate to `/stepper` via the menu and verify the stepper process is available

#### 2. "Hero Form" (`/form`)
- Enter valid data and submit the form
- Validate field requirements (e.g., empty or invalid input)
- Reset the form using the "New Hero" button

#### 3. Stepper Form (`/stepper`)
- Complete all steps (name, address, summary)
- Validate required fields at each step
- Verify the summary step for correctness
- Test "Back" and "Reset" buttons

#### 4. External Links and Resources
- Verify the presence and functionality of links to Angular resources (Twitter, YouTube, documentation)

#### 5. Responsiveness and Element Visibility
- Verify the visibility of key elements at various screen resolutions
