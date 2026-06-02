import { expect, Locator, Page } from "@playwright/test";
import basePage from "./basePage";

import { logger } from "../utils/logger.ts";

export default class dashboardPage extends basePage {
  private logger = new logger("DashboardPage");

  readonly dashboardHeader = this.page.getByRole("heading", {
    name: "Dashboard",
  });
  readonly logoutButton = this.page.getByRole("button", {
    name: "Logout",
  });

  constructor(page: Page) {
    super(page);
  }

  async logout() {
    this.logger.step("Clicking logout button");
    await this.click(this.logoutButton);
    this.logger.info("Logout clicked");
  }

  async verifyDashboardLoaded() {
    this.logger.step("Verifying dashboard is loaded");

    await this.waitForURL(/dashboard/);

    await this.page.waitForLoadState("domcontentloaded");

    await this.waitForVisible(this.dashboardHeader);
    await expect(this.dashboardHeader).toHaveText("Dashboard");

    this.logger.info("Dashboard loaded successfully");
  }

  async getHeaderText(): Promise<string> {
    this.logger.step("Getting header text");
    return await this.getText(this.dashboardHeader);
  }
}
