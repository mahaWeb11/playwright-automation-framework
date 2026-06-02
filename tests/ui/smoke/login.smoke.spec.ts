import { test, expect } from "../../../fixtures/test.ts";

import { CONFIG } from "../../../config/config.ts";
import { LOGIN_DATA } from "../../../config/testData.ts";

test.describe("Login smoke", () => {
  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.open();
  });

  test(
    "User should login successfully with valid credentials",
    { tag: "@smoke" },
    async ({ pm }) => {
      await test.step("Login with valid credentials", async () => {
        await pm.loginPage.login(CONFIG.admin.username, CONFIG.admin.password);
      });

      await test.step("Verify dashboard is loaded", async () => {
        await pm.dashboardPage.verifyDashboardLoaded();
      });
    },
  );
});
