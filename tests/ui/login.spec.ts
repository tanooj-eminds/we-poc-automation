import { test, expect } from '../../fixtures/testBase';

test.describe('UI Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate('/login');
  });

  test('Should login successfully with valid credentials', async ({ loginPage, testData, page }) => {
    await loginPage.login(testData.ui.email, testData.ui.password);
    
    await expect(page).toHaveURL(/admin/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Mandal Performance Metrics' })).toBeVisible({ timeout: 50000 });
  });

  test('Should show error with invalid email', async ({ loginPage, page }) => {
    await loginPage.login('invalid@email.com', 'wrongPassword123');
    
    await expect(page.locator('text=/invalid|error/i')).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/login/);
  });

  test('Should show error with empty credentials', async ({ loginPage, page }) => {
    await loginPage.login('', '');
    await expect(page).toHaveURL(/login/);
  });

  test('Should show error with invalid password', async ({ loginPage, testData, page }) => {
    await loginPage.login(testData.ui.email, 'wrongPassword123');
    await expect(page.locator('text=/invalid|incorrect|error/i')).toBeVisible({ timeout: 5000 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      await page.screenshot({
        path: `test-results/screenshots/${testInfo.title}-${Date.now()}.png`,
        fullPage: true
      });
    }
  });
});