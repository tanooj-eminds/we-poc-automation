import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/auth/LoginPage';
import { SurveyPage } from '../pages/auth/surveyPage';
import { InvitePage } from '../pages/auth/InvitePage';
import { Config } from '../config/env';
import { TestData } from '../types/testData.types';
import { TestDataGenerator, SurveyData } from '../helpers/testDataGenerator';

const testData: TestData = {
  ui: { email: Config.UI_EMAIL, password: Config.UI_PASSWORD },
  api: { email: Config.API_EMAIL, password: Config.API_PASSWORD }
};

type Fixtures = {
  loginPage: LoginPage;
  surveyPage: SurveyPage;
  invitePage: InvitePage;
  testData: TestData;
  surveyData: SurveyData;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  surveyPage: async ({ page }, use) => use(new SurveyPage(page)),
  invitePage: async ({ page }, use) => use(new InvitePage(page)),
  testData: async ({}, use) => use(testData),
  surveyData: async ({}, use) => use(TestDataGenerator.generateSurveyData())
});

export { expect };