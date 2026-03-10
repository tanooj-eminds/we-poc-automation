import { Page, expect } from '@playwright/test';
import { getAllLocators } from '../../fixtures/all_locators';
import { BasePage } from '../base/BasePage';
import { Config } from '../../config/env';

const { YOPMAIL_URL } = Config;

export class InvitePage extends BasePage {
  private locators;

  constructor(page: Page) {
    super(page);
    this.locators = getAllLocators(page);
  }

  async clickInviteTab() {
    await expect(this.locators.inviteTab).toBeVisible();
    await this.locators.inviteTab.click();
  }

  async fillInviteForm(
    email: string,
    fullName: string,
    mobile: string,
    location: string,
    message: string
  ) {
    await expect(this.locators.inviteEmail).toBeVisible();

    await this.locators.inviteEmail.fill(email);
    await this.locators.inviteFullName.fill(fullName);
    await this.locators.inviteMobile.fill(mobile);
    await this.locators.inviteLocation.fill(location);
    await this.locators.inviteMessage.fill(message);
  }

  async submitInvite() {
    await this.locators.inviteSubmitBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openYopmail(emailPrefix: string) {
    await this.page.goto(`${YOPMAIL_URL}`, { waitUntil: 'domcontentloaded', timeout: 50000 });
    await expect(this.locators.yopmailLoginInput).toBeVisible({ timeout: 10000 });
    await this.locators.yopmailLoginInput.fill(emailPrefix);
    await this.page.waitForTimeout(1000);
    await this.locators.yopmailCheckBtn.click();
    await this.page.waitForLoadState('domcontentloaded', { timeout: 50000 });;
    
    try {
      await this.page.waitForSelector('#ifmail', { timeout: 30000, state: 'visible' });
    } 
    catch {
      await this.page.reload({ waitUntil: 'networkidle' });
      await this.page.waitForSelector('#ifmail', { timeout: 30000, state: 'visible' });
    }
  }

  async clickActivateLink(): Promise<Page> {
    for (let i = 0; i < 5; i++) {
      await this.page.waitForTimeout(2000);
      
      const iframe = this.page.frameLocator('#ifmail');
      const activateLink = iframe.locator('a:has-text("Activate Admin Account")');
      
      const isVisible = await activateLink.isVisible().catch(() => false);
      
      if (isVisible) {
        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page'),
          activateLink.click()
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
      }
      
      await this.refreshInbox();
      await this.page.waitForLoadState('domcontentloaded');
    }
    const iframe = this.page.frameLocator('#ifmail');
    const activateLink = iframe.locator('a:has-text("Activate Admin Account")');
    await expect(activateLink).toBeVisible({ timeout: 10000 });
    
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      activateLink.click()
    ]);
    
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async refreshInbox() {
    const refreshBtn = this.page.locator('button#refresh');
    await refreshBtn.waitFor({ state: 'visible', timeout: 5000 });
    await refreshBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async setPasswordOnNewPage(newPage: Page, password: string) {
    const newPageLocators = getAllLocators(newPage);

    await expect(newPageLocators.newPassword).toBeVisible();
    await newPageLocators.newPassword.fill(password);
    await newPageLocators.confirmPassword.fill(password);
  }

  async submitPasswordOnNewPage(newPage: Page) {
    const submitButton = newPage.locator('button[type="submit"]').first();

    await expect(submitButton).toBeVisible();
    await submitButton.click();

    await newPage.waitForLoadState('networkidle');
  }

  async loginNewAdminOnPage(newPage: Page, email: string, password: string) {
    const newPageLocators = getAllLocators(newPage);

    await expect(newPageLocators.email).toBeVisible();

    await newPageLocators.email.fill(email);
    await newPageLocators.password.fill(password);
    await newPageLocators.loginBtn.click();

    await newPage.waitForLoadState('networkidle');
  }
}