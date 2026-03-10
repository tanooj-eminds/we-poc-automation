import { Page } from '@playwright/test';
import { getAllLocators } from '../../fixtures/all_locators';
import { BasePage } from '../base/BasePage';

export class LoginPage extends BasePage {
  private locators = getAllLocators(this.page);

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.locators.email.fill(email);
    await this.locators.password.fill(password);
    await this.locators.loginBtn.click();
  }
}