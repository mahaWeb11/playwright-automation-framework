import { Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";

export default class PomManager {
  page: Page;

  loginPage: LoginPage;
  dashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;

    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }
}
