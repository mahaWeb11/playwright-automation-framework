import { test as base, expect } from "@playwright/test";
import PomManager from "../PageManager/PomManager";

type Fixtures = {
  pm: PomManager;
};

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    const pm = new PomManager(page);
    await use(pm);
  },
});

export { expect };
