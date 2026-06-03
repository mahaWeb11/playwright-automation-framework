import { test, expect } from "../../fixtures/test";
import { LOGIN_DATA } from "../../config/testData";
import { CONFIG } from "../../config/config";

import { performLogin } from "../../helpers/loginHelper";

import { httpStatus } from "../../constants/httpStatus";
import { apiMessages } from "../../constants/apiMessages";

test.describe("Login API", () => {
  test(
    "Should redirect to the dashboard page when entered valid credentials",
    { tag: "@api" },
    async ({ am }) => {
      const { response, body } =
        await test.step("Send login request with valid credentials", async () =>
          await performLogin(am, CONFIG.admin.username, CONFIG.admin.password));

      await test.step("Verify response status is 200 or 302", async () => {
        expect([httpStatus.OK, httpStatus.FOUND]).toContain(response.status());
      });

      await test.step("Verify no CSRF token errors in response", async () => {
        expect(body).not.toContain(apiMessages.INVALID_CSRF_TOKEN);
        expect(body).not.toContain(apiMessages.CSRF_VALIDATION_FAILED);
      });
    },
  );

  test("Should fail for invalid password", { tag: "@api" }, async ({ am }) => {
    const { response, body } =
      await test.step("Send login request with valid credentials", async () =>
        await performLogin(
          am,
          LOGIN_DATA.invalidPassword.username,
          LOGIN_DATA.invalidPassword.password,
        ));

    await test.step("Verify response status is 200", async () => {
      expect(response.status()).toBe(httpStatus.OK);
    });

    await test.step("Verify invalid_credentials error in response", async () => {
      expect(body).not.toContain(apiMessages.INVALID_CSRF_TOKEN);
      expect(body).toContain(apiMessages.INVALID_CREDENTIALS);
    });
  });

  test("Should fail for invalid username", { tag: "@api" }, async ({ am }) => {
    const { response, body } =
      await test.step("Send login request with invalid username", async () =>
        await performLogin(
          am,
          LOGIN_DATA.invalidUsername.username,
          LOGIN_DATA.invalidUsername.password,
        ));

    await test.step("Verify response status is 200", async () => {
      expect(response.status()).toBe(httpStatus.OK);
    });

    await test.step("Verify invalid_credentials error in response", async () => {
      expect(body).not.toContain(apiMessages.INVALID_CSRF_TOKEN);
      expect(body).toContain(apiMessages.INVALID_CREDENTIALS);
    });
  });

  test("Should fail for empty credentials", { tag: "@api" }, async ({ am }) => {
    const { response, body } =
      await test.step("Send login request with empty credentials", async () =>
        await performLogin(am, "", ""));

    await test.step("Verify response status is 200", async () => {
      expect(response.status()).toBe(httpStatus.OK);
    });

    await test.step("Verify no CSRF token errors in response", async () => {
      expect(body).not.toContain(apiMessages.INVALID_CSRF_TOKEN);
    });
  });

  test(
    "Should be protected againstt SQL injection",
    { tag: "@api" },
    async ({ am }) => {
      const { body } =
        await test.step("Send login request with SQL injection payload", async () =>
          await performLogin(
            am,
            LOGIN_DATA.sqlInjection.username,
            LOGIN_DATA.sqlInjection.password,
          ));

      await test.step("Verify response does not redirect to dashboard", async () => {
        expect(body).not.toContain(apiMessages.DASHBOARD);
      });
    },
  );
});
