import { expect, Locator, Page } from "@playwright/test";
import basePage from "./basePage.ts";
import { CONFIG } from "../config/config.ts";

import { logger } from "../utils/logger.ts";

export default class LoginPage extends basePage {
  private logger = new logger("login page");

  readonly usernameInput = this.page.locator("input[name='username']");
  readonly passwordInput = this.page.locator("input[name='password']");
  readonly loginButton = this.page.locator("button[type='submit']");

  readonly errorMessage = this.page.locator(".oxd-alert-content-text");

  readonly usernameRequired = this.page.locator(
    "div.oxd-input-group:has(input[name='username']) .oxd-input-field-error-message",
  );
  readonly passwordRequired = this.page.locator(
    "div.oxd-input-group:has(input[name='password']) .oxd-input-field-error-message",
  );

  constructor(page: Page) {
    super(page);
  }

  async open() {
    this.logger.step("Opening login page");
    await this.navigate(CONFIG.baseUrl);
  }

  async enterUsername(username: string) {
    this.logger.step(`Entering username: ${username}`);
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    this.logger.step(`Entering password: ${password}`);
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    this.logger.step("Clicking login button");
    await this.click(this.loginButton);
  }

  async login(username: string, password: string) {
    this.logger.step(`Logging in with username: ${username}`);
    await this.enterUsername(username);

    this.logger.step(`Entering password: ${password}`);
    await this.enterPassword(password);

    this.logger.step("Clicking login button");
    await this.clickLoginButton();
  }

  async waitForURL(url: string | RegExp) {
    await this.page.waitForURL(url);
  }

  async verifyErrorMessageVisible() {
    this.logger.step("Verifying error message is visible");

    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.errorMessage).toBeVisible({ timeout: 15000 });

    this.logger.info("Error message verified successfully");
  }

  async verifyUsernameRequiredVisible() {
    this.logger.step("Verifying username required message");

    await expect(this.usernameRequired).toBeVisible();

    this.logger.info("Username required message verified");
  }

  async verifyPasswordRequiredVisible() {
    this.logger.step("Verifying password required message");

    await expect(this.passwordRequired).toBeVisible();

    this.logger.info("Password required message verified");
  }

  async verifyRequiredMessagesVisible() {
    this.logger.step("Verifying all required messages");

    await this.verifyUsernameRequiredVisible();
    await this.verifyPasswordRequiredVisible();

    this.logger.info("All required messages verified");
  }
}
