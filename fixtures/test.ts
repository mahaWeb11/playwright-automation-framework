import { test as base, expect } from "@playwright/test";
import pomManager from "../pageManager/pomManager";

type Fixtures = {
  pm: pomManager;
};

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    const pm = new pomManager(page);
    await use(pm);
  },
});

export { expect };
