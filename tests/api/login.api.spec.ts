import { test, expect } from "../../fixtures/test";
import { LOGIN_DATA } from "../../config/testData";
import { CONFIG } from "../../config/config";

test.describe("Login API", () => {
  test(
    "Should redirect to the dashboard page when entered valid credentials",
    { tag: "@api" },
    async ({ am }) => {
      const response = await am.loginApi.login(
        CONFIG.admin.username,
        CONFIG.admin.password,
      );

      const status = response.status();
      expect([200, 302]).toContain(status);

      const body = await response.text();
      expect(body).not.toContain("invalid_csrf_token");
      expect(body).not.toContain("CSRF token validation failed");
    },
  );

  test("Should fail for invalid password", { tag: "@api" }, async ({ am }) => {
    const response = await am.loginApi.login(
      LOGIN_DATA.invalidPassword.username,
      LOGIN_DATA.invalidPassword.password,
    );

    expect(response.status()).toBe(200);

    const body = await response.text();

    expect(body).not.toContain("invalid_csrf_token");
    expect(body).toContain("invalid_credentials");
  });

  test("Should fail for invalid username", { tag: "@api" }, async ({ am }) => {
    const response = await am.loginApi.login(
      LOGIN_DATA.invalidUsername.username,
      LOGIN_DATA.invalidUsername.password,
    );

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).not.toContain("invalid_csrf_token");
    expect(body).toContain("invalid_credentials");
  });

  test("Should fail for empty credentials", { tag: "@api" }, async ({ am }) => {
    const response = await am.loginApi.login("", "");

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).not.toContain("invalid_csrf_token");
  });

  test(
    "Should be protected againstt SQL injection",
    { tag: "@api" },
    async ({ am }) => {
      const response = await am.loginApi.login(
        LOGIN_DATA.sqlInjection.username,
        LOGIN_DATA.sqlInjection.password,
      );

      const body = await response.text();
      expect(body).not.toContain("/dashboard");
    },
  );
});
