import { Page } from "@playwright/test";
import loginPage from "../pages/loginPage";
import dashboardPage from "../pages/dashboardPage";

export default class pomManager {
  page: Page;

  loginPage: loginPage;
  dashboardPage: dashboardPage;

  constructor(page: Page) {
    this.page = page;

    this.loginPage = new loginPage(page);
    this.dashboardPage = new dashboardPage(page);
  }
}
