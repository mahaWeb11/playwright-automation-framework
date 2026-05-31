import { test, expect } from "../fixtures/test";
import PomManager from "../PageManager/PomManager";

import { CONFIG } from "../config/config.ts";
import { LOGIN_DATA } from "../config/testData.ts";

test.describe("Login tests", () => {
  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.open();
  });

  test(
    "User should login successfully with valid credentials",
    { tag: "@smoke" },
    async ({ pm }) => {
      await pm.loginPage.login(CONFIG.admin.username, CONFIG.admin.password);

      await pm.dashboardPage.verifyDashboardLoaded();
    },
  );

  test(
    "Should show error message for invalid password",
    { tag: "@regression" },
    async ({ pm }) => {
      await pm.loginPage.login(
        LOGIN_DATA.invalidPassword.username,
        LOGIN_DATA.invalidPassword.password,
      );

      await pm.loginPage.verifyErrorMessageVisible();
    },
  );

  test(
    "Should show error message for invalid username",
    { tag: "@regression" },
    async ({ pm }) => {
      await pm.loginPage.login(
        LOGIN_DATA.invalidUsername.username,
        LOGIN_DATA.invalidUsername.password,
      );

      await pm.loginPage.verifyErrorMessageVisible();
    },
  );

  test(
    "should show required messages for empty credentials",
    { tag: "@regression" },
    async ({ pm }) => {
      await pm.loginPage.login("", "");

      await pm.loginPage.verifyRequiredMessagesVisible();
    },
  );

  test(
    "should show required message for empty username only",
    { tag: "@regression" },
    async ({ pm }) => {
      await pm.loginPage.login("", CONFIG.admin.password);

      await pm.loginPage.verifyUsernameRequiredVisible();
    },
  );

  test(
    "should show required message for empty password only",
    { tag: "@regression" },
    async ({ pm }) => {
      await pm.loginPage.login(CONFIG.admin.username, "");

      await pm.loginPage.verifyPasswordRequiredVisible();
    },
  );

  test(
    "Should not allow login with SQL injection",
    { tag: "@security" },
    async ({ pm }) => {
      await pm.loginPage.login(
        LOGIN_DATA.sqlInjection.username,
        LOGIN_DATA.sqlInjection.password,
      );

      await pm.loginPage.verifyErrorMessageVisible();
    },
  );
});
