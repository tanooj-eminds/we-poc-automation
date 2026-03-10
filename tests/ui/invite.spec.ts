import { test, expect } from '../../fixtures/testBase';
import { TestDataGenerator } from '../../helpers/testDataGenerator';

test.describe('Invite Tests', () => {
  test.beforeEach(async ({ loginPage, testData, page }) => {
    await loginPage.navigate('/login');
    await loginPage.login(testData.ui.email, testData.ui.password);
    await expect(page).toHaveURL(/admin/, { timeout: 10000 });
  });

  test('Send invite and activate admin account', async ({ page, invitePage }) => {
    const inviteData = TestDataGenerator.generateInviteData();

    await invitePage.clickInviteTab();
    await invitePage.fillInviteForm(
      inviteData.email,
      inviteData.fullName,
      inviteData.mobile,
      inviteData.location,
      inviteData.message
    );
    await invitePage.submitInvite();

    const emailPrefix = inviteData.email.split('@')[0];
    await invitePage.openYopmail(emailPrefix);

    const newPage = await invitePage.clickActivateLink();

    await invitePage.setPasswordOnNewPage(newPage, inviteData.password);
    await invitePage.submitPasswordOnNewPage(newPage);

    await invitePage.loginNewAdminOnPage(newPage, inviteData.email, inviteData.password);

    await expect(newPage).toHaveURL(/admin/, { timeout: 10000 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      await page.screenshot({
        path: `test-results/screenshots/${testInfo.title}-${Date.now()}.png`,
        fullPage: true
      });
      
      const pages = page.context().pages();
      for (let i = 0; i < pages.length; i++) {
        await pages[i].screenshot({
          path: `test-results/screenshots/${testInfo.title}-page${i}-${Date.now()}.png`,
          fullPage: true
        });
      }
    }
  });
});