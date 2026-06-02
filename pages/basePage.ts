import { expect, Locator, Page } from "@playwright/test";

export default class basePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }

  async waitForVisible(locator: Locator) {
    expect(locator).toBeVisible(); // changed
  }

  async waitForURL(url: string | RegExp) {
    await this.page.waitForURL(url);
  }
}
