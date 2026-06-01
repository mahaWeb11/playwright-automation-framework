import { expect, Locator, Page } from "@playwright/test";
import basePage from "./basePage";

export default class dashboardPage extends basePage {
  readonly dashboardHeader: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardHeader = page.getByRole("heading", {
      name: "Dashboard",
    });

    this.logoutButton = page.getByRole("button", {
      name: "Logout",
    });
  }

  async logout() {
    await this.click(this.logoutButton);
  }

  async verifyDashboardLoaded() {
    await this.waitForURL(/dashboard/);

    await this.page.waitForLoadState("domcontentloaded");

    await this.waitForVisible(this.dashboardHeader);
    await expect(this.dashboardHeader).toHaveText("Dashboard");
  }

  async getHeaderText(): Promise<string> {
    return await this.getText(this.dashboardHeader);
  }
}
