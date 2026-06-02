import { test, expect } from "../../../fixtures/test.ts";

import { CONFIG } from "../../../config/config.ts";
import { LOGIN_DATA } from "../../../config/testData.ts";

test.describe("Login regression", () => {
  test.beforeEach(async ({ pm }) => {
    await pm.loginPage.open();
  });

  test(
    "Should show error message for invalid password",
    { tag: "@regression" },
    async ({ pm }) => {
      await test.step("Login with invalid password", async () => {
        await pm.loginPage.login(
          LOGIN_DATA.invalidPassword.username,
          LOGIN_DATA.invalidPassword.password,
        );
      });

      await test.step("Verify that the error message is visible", async () => {
        await pm.loginPage.verifyErrorMessageVisible();
      });
    },
  );

  test(
    "Should show error message for invalid username",
    { tag: "@regression" },
    async ({ pm }) => {
      await test.step("Login with invalid password", async () => {
        await pm.loginPage.login(
          LOGIN_DATA.invalidUsername.username,
          LOGIN_DATA.invalidUsername.password,
        );
      });

      await test.step("Verify that the error message is visible", async () => {
        await pm.loginPage.verifyErrorMessageVisible();
      });
    },
  );

  test(
    "should show required messages for empty credentials",
    { tag: "@regression" },
    async ({ pm }) => {
      await test.step("Login with empty credentials", async () => {
        await pm.loginPage.login("", "");
      });

      await test.step("Verify required messages are visible", async () => {
        await pm.loginPage.verifyRequiredMessagesVisible();
      });
    },
  );

  test(
    "should show required message for empty username only",
    { tag: "@regression" },
    async ({ pm }) => {
      await test.step("Login with empty username", async () => {
        await pm.loginPage.login("", CONFIG.admin.password);
      });

      await test.step("Verify username required message", async () => {
        await pm.loginPage.verifyUsernameRequiredVisible();
      });
    },
  );

  test(
    "should show required message for empty password only",
    { tag: "@regression" },
    async ({ pm }) => {
      await test.step("Login with empty password", async () => {
        await pm.loginPage.login(CONFIG.admin.username, "");
      });

      await test.step("Verify password required message", async () => {
        await pm.loginPage.verifyPasswordRequiredVisible();
      });
    },
  );
});
