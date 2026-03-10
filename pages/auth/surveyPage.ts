import { Page, expect } from '@playwright/test';
import { getAllLocators } from '../../fixtures/all_locators';
import { BasePage } from '../base/BasePage';
import { SurveyData } from '../../helpers/testDataGenerator';

type Locators = ReturnType<typeof getAllLocators>;

export class SurveyPage extends BasePage {
  private locators = getAllLocators(this.page);

  private readonly employmentFlowMap = {
    employmentHomemaker: 'support',
    employmentFarmer: 'support',
    employmentDifferently_Abled: 'support',
    employmentStudent: 'training',
    employmentUnemployed: 'training',
    employmentEmployed: 'interests',
    employmentEntrepreneur: 'interests'
  } as const;

  constructor(page: Page) {
    super(page);
  }

  async startSurvey() {
    await this.page.goto('/', { waitUntil: 'networkidle' });

    // Wait for and click the dialog button if it exists
    const dialogButton = this.locators.proceedBtn;
    
    try {
      // Wait for button to be actually clickable (visible + enabled + stable)
      await dialogButton.waitFor({ state: 'visible', timeout: 5000 });
      await dialogButton.click({ timeout: 5000 });
      
      // Wait for dialog to disappear and mobile input to appear
      await this.locators.mobileInput.waitFor({ state: 'visible', timeout: 15000 });
    } catch (error) {
      // If dialog button doesn't exist, mobile input should already be visible
      await this.locators.mobileInput.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async fillPersonalInfo(mobile: string, district: string, division: string) {
    // Mobile input already visible from startSurvey()
    await this.locators.mobileInput.fill(mobile);

    // District dropdown
    await this.locators.districtDropdown.waitFor({ state: 'visible' });
    await this.locators.districtDropdown.selectOption(district);

    // Wait for division dropdown to be populated based on district
    await this.locators.revenueDivisionDropdown.waitFor({ state: 'visible' });
    await this.locators.revenueDivisionDropdown.selectOption(division);

    // Wait for mandal dropdown to be populated
    await this.page.waitForFunction(() => {
      const el = document.querySelector('#mandal') as HTMLSelectElement;
      return el && el.options.length > 1;
    });
    await this.locators.mandalDropdown.selectOption({ index: 1 });

    // Wait for village dropdown to be populated
    await this.page.waitForFunction(() => {
      const el = document.querySelector('#village') as HTMLSelectElement;
      return el && el.options.length > 1;
    });
    await this.locators.villageDropdown.selectOption({ index: 1 });

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();
  }

  async fillDemographics(age: SurveyData['ageGroup'], location: SurveyData['locationType']) {
    await this.locators[age].waitFor({ state: 'visible' });
    await this.locators[age].click();

    await this.locators[location].waitFor({ state: 'visible' });
    await this.locators[location].click();

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();
  }

  async fillEmployment(status: SurveyData['employmentStatus']) {
    await this.locators[status].waitFor({ state: 'visible' });
    await this.locators[status].click();

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();

    return this.employmentFlowMap[status];
  }

  async fillTraining(data: SurveyData) {
    const visible = await this.locators.trainingInterestedYes.isVisible().catch(() => false);
    if (!visible) return;

    const wantsTraining = data.wantsTraining ?? true;

    if (!wantsTraining) {
      await this.locators.trainingInterestedNo.click();
      await expect(this.locators.continueBtn).toBeEnabled();
      await this.locators.continueBtn.click();
      return;
    }

    await this.locators.trainingInterestedYes.click();
    // Wait for training options to appear
    await this.page.waitForLoadState('domcontentloaded');

    await this.clickMultiple(data.trainings);

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();

    const oppVisible = await this.locators.employmentOppYes.isVisible().catch(() => false);
    if (!oppVisible) return;

    const wantsOpp = data.wantsEmploymentOpp ?? true;

    if (!wantsOpp) {
      await this.locators.employmentOppNo.click();
      await expect(this.locators.continueBtn).toBeEnabled();
      await this.locators.continueBtn.click();
      return;
    }

    await this.locators.employmentOppYes.click();
    // Wait for sector options to appear
    await this.page.waitForLoadState('domcontentloaded');

    await this.clickMultiple(data.sectors);

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();
  }

  async fillInterests(interests: string[]) {
    await this.locators.categoryAspiringEntrepreneur.waitFor({ state: 'visible' });
    await this.locators.categoryAspiringEntrepreneur.click();
    
    // Wait for interest options to appear
    await this.page.waitForLoadState('domcontentloaded');

    await this.clickMultiple(interests);

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();
  }

  async fillSupport(needs: string[]) {
    for (const need of needs) {
      const locator = this.locators[need as keyof Locators];

      if (locator && await locator.isEnabled().catch(() => false)) {
        await locator.check();
      }
    }

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();
  }

  async fillSchemes(data: SurveyData) {
    // Land Support
    const landVisible = await this.locators.landSupportYes.isVisible().catch(() => false);
    if (landVisible) {
      await this.locators.landSupportYes.click();
      await this.page.waitForLoadState('domcontentloaded');
    }

    // Scheme Awareness
    const schemeVisible = await this.locators.schemeAwarenessYes.isVisible().catch(() => false);
    if (schemeVisible) {
      await this.locators.schemeAwarenessYes.click();
      await this.page.waitForLoadState('domcontentloaded');
    }

    // Select Schemes
    const schemesAppeared = await this.page
      .getByText('Which government schemes are you availing?')
      .isVisible()
      .catch(() => false);

    if (schemesAppeared && data.selectSchemes && data.schemes.length > 0) {
      await this.clickMultiple(data.schemes);
    }

    // Group Membership
    const groupVisible = await this.page
      .getByText('Are you a member of any of the following groups?')
      .isVisible()
      .catch(() => false);

    if (groupVisible) {
      if (data.selectGroups && data.groups.length > 0) {
        await this.clickMultiple(data.groups);
      } else {
        const notMemberVisible = await this.locators.notMemberCheckbox.isVisible().catch(() => false);
        if (notMemberVisible && await this.locators.notMemberCheckbox.isEnabled().catch(() => false)) {
          await this.locators.notMemberCheckbox.check();
        }
      }
    }

    await expect(this.locators.continueBtn).toBeEnabled();
    await this.locators.continueBtn.click();
  }

  async submitSurvey() {
    await this.locators.submitResponseBtn.waitFor({ state: 'visible' });
    await this.locators.submitResponseBtn.click();

    await this.locators.acknowledgeCheckbox.waitFor({ state: 'visible' });
    await this.locators.acknowledgeCheckbox.check();

    await this.locators.submitSurveyBtn.waitFor({ state: 'visible' });
    await this.locators.submitSurveyBtn.click();
  }

  async getConfirmationCode(): Promise<string> {
    await this.locators.confirmationCode.waitFor({ state: 'visible' });

    const text = await this.locators.confirmationCode.textContent();

    if (!text) throw new Error('Confirmation code not found');

    return text.trim();
  }

  async completeDynamicSurvey(data: SurveyData) {
    await this.startSurvey();

    await this.fillPersonalInfo(data.mobile, data.district, data.division);

    await this.fillDemographics(data.ageGroup, data.locationType);

    const flow = await this.fillEmployment(data.employmentStatus);

    if (flow === 'interests') await this.fillInterests(data.interests);

    if (flow === 'training') await this.fillTraining(data);

    await this.fillSupport(data.supportNeeds);

    await this.fillSchemes(data);

    await this.submitSurvey();

    return this.getConfirmationCode();
  }

  private async clickMultiple(items: string[]) {
    for (const item of items) {
      const locator = this.locators[item as keyof Locators];

      if (locator && await locator.isVisible().catch(() => false)) {
        await locator.click();
      }
    }
  }
}