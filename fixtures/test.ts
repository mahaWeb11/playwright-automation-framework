import { test as base, expect, request } from "@playwright/test";
import pomManager from "../utils/pomManager.ts";
import apiManager from "../utils/apiManager.ts";
import { CONFIG } from "../config/config";

type Fixtures = {
  pm: pomManager;
  am: apiManager;
};

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    const pm = new pomManager(page);
    await use(pm);
  },

  am: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: CONFIG.baseUrl,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
    const am = new apiManager(apiContext);
    await use(am);
    await apiContext.dispose();
  },
});

export { expect };
