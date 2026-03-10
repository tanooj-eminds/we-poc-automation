# WE-POC Automation Framework

## 📌 Project Overview

This repository contains the automation framework for the **WE-POC** (Women Empowerment Proof of Concept) application — a government survey and analytics platform for Telangana, India.

The framework is designed to perform end-to-end **UI and API testing** using modern automation tools, ensuring application quality through reliable, scalable, and maintainable automated tests.

---

## 🚀 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & API testing |
| TypeScript | Type-safe test authoring |
| Node.js | Runtime environment |
| dotenv | Environment variable management |
| Page Object Model | Test architecture pattern |

---

## 📂 Project Structure

```
WE-POC_AutoTS/
│
├── tests/                  # Test specifications
│   ├── api/                # API test files
│   └── ui/                 # UI test files
├── pages/                  # Page Object Models
│   ├── base/               # Base page with shared utilities
│   └── auth/               # Auth-related pages (Login, Survey, Invite)
├── fixtures/               # Custom Playwright fixtures & locators
├── helpers/                # Utility functions and test data generators
├── config/                 # Environment configuration
├── types/                  # TypeScript type definitions
├── playwright.config.ts    # Playwright configuration
├── package.json
├── .env                    # Environment variables (do not commit)
└── README.md
```

---

## ⚙️ Installation

**Prerequisites:** Node.js v18+

**1. Clone the repository**
```bash
git clone https://github.com/tanooj-eminds/we-poc-automation.git
```

**2. Navigate to the project folder**
```bash
cd we-poc-automation
```

**3. Install dependencies**
```bash
npm install
```

**4. Install Playwright browsers**
```bash
npx playwright install
```

**5. Set up environment variables**

Create a `.env` file in the project root:
```dotenv
BASE_URL=https://we-poc.ddns.net
API_BASE_URL=https://api-we.ddns.net/api
Yopmail_URL=https://yopmail.com/en/

api_email=your_api_email
api_password=your_api_password

ui_email=your_ui_email
ui_password=your_ui_password
```

---

## ▶️ Running Tests

**Run all tests**
```bash
npx playwright test
```

**Run only UI tests**
```bash
npx playwright test tests/ui/
```

**Run only API tests**
```bash
npx playwright test tests/api/
```

**Run a specific test file**
```bash
npx playwright test tests/ui/survey.spec.ts
```

**Run tests in headed mode**
```bash
npx playwright test --headed
```

---

## 📊 Test Reports

After a test run, open the Playwright HTML report:
```bash
npx playwright show-report
```

> Screenshots are automatically captured on test failure and saved to `test-results/`.

---

## 🧪 Framework Features

- **Page Object Model** — clean separation between test logic and UI interactions
- **Centralised locators** — all element selectors managed in one place
- **Dynamic test data generation** — random but valid data for every test run
- **API testing** — admin login and endpoint validation using Playwright request context
- **Custom fixtures** — pre-wired page objects injected into every test automatically
- **Reusable helpers** — shared utilities across the entire suite
- **HTML test reports** — detailed pass/fail results with traces and screenshots
