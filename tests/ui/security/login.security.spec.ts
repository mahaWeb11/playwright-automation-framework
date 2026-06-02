import { test, expect } from "../../../fixtures/test.ts";

import { CONFIG } from "../../../config/config.ts";
import { LOGIN_DATA } from "../../../config/testData.ts";

test.describe("Login security", () => {
  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.open();
  });

  test(
    "Should not allow login with SQL injection",
    { tag: "@security" },
    async ({ pm }) => {
      await test.step("Login with SQL injection payload", async () => {
        await pm.loginPage.login(
          LOGIN_DATA.sqlInjection.username,
          LOGIN_DATA.sqlInjection.password,
        );
      });

      await test.step("Verify user is not logged in", async () => {
        await expect(pm.page).toHaveURL(/auth\/login/);
      });
    },
  );
});
