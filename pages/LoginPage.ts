import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";
import { CONFIG } from "../config/config.ts";

export default class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  readonly errorMessage: Locator;

  readonly usernameRequired: Locator;
  readonly passwordRequired: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator("input[name='username']");
    this.passwordInput = page.locator("input[name='password']");

    this.loginButton = page.locator("button[type='submit']");

    this.errorMessage = page.locator(".oxd-alert-content-text");

    this.usernameRequired = this.page.locator(
      "div.oxd-input-group:has(input[name='username']) .oxd-input-field-error-message",
    );

    this.passwordRequired = this.page.locator(
      "div.oxd-input-group:has(input[name='password']) .oxd-input-field-error-message",
    );
  }

  async open() {
    await this.navigate(CONFIG.baseUrl);
  }

  async enterUsername(username: string) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);

    await this.clickLoginButton();
  }

  async waitForURL(url: string | RegExp) {
    await this.page.waitForURL(url);
  }

  async verifyErrorMessageVisible() {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.errorMessage).toBeVisible();
  }

  async verifyUsernameRequiredVisible() {
    await expect(this.usernameRequired).toBeVisible();
  }

  async verifyPasswordRequiredVisible() {
    await expect(this.passwordRequired).toBeVisible();
  }

  async verifyRequiredMessagesVisible() {
    await this.verifyUsernameRequiredVisible();
    await this.verifyPasswordRequiredVisible();
  }
}
