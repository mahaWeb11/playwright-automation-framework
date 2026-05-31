# Playwright Automation Framework

This is an E2E test automation framework built with Playwright and TypeScript.

## Tech Stack
- Playwright
- TypeScript
- Page Object Model
- GitHub Actions CI/CD

## Setup

1. Clone the repository
2. Install dependencies:
   npm ci
3. Create .env file in root:
   BASE_URL=https://opensource-demo.orangehrmlive.com
   ADMIN_USERNAME=Admin
   ADMIN_PASSWORD=admin123
4. Run tests:
   npx playwright test

## Running tests by tag
- npx playwright test --grep @smoke
- npx playwright test --grep @regression
- npx playwright test --grep @security

## Project Structure
- pages/        → Page Object classes
- tests/        → Test specs
- fixtures/     → Custom Playwright fixtures
- PageManager/  → POM Manager
- config/       → Configuration and test data
- .github/      → CI/CD pipeline
