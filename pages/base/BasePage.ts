import { Page } from '@playwright/test';

export class BasePage {
  constructor(readonly page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async waitForNetwork() {
    await this.page.waitForLoadState('networkidle');
  }

  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}