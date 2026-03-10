import { test, expect } from '../../fixtures/testBase';
import { TestDataGenerator } from '../../helpers/testDataGenerator';

test.describe('Survey Tests', () => {
  test('Complete survey with random data', async ({ surveyPage, surveyData }) => {
    await test.info().attach('Survey Data', {
      body: JSON.stringify(surveyData, null, 2),
      contentType: 'application/json'
    });

    const code = await surveyPage.completeDynamicSurvey(surveyData);
    expect(code).toMatch(/^WE-/);
  });

  test('Complete survey step by step', async ({ surveyPage, surveyData }) => {
    await test.info().attach('Survey Data', {
      body: JSON.stringify(surveyData, null, 2),
      contentType: 'application/json'
    });

    await surveyPage.startSurvey();
    await surveyPage.fillPersonalInfo(surveyData.mobile, surveyData.district, surveyData.division);
    await surveyPage.fillDemographics(surveyData.ageGroup, surveyData.locationType);

    const flow = await surveyPage.fillEmployment(surveyData.employmentStatus);

    if (flow === 'interests') await surveyPage.fillInterests(surveyData.interests);
    if (flow === 'training') await surveyPage.fillTraining(surveyData);

    await surveyPage.fillSupport(surveyData.supportNeeds);
    await surveyPage.fillSchemes(surveyData);
    await surveyPage.submitSurvey();

    const code = await surveyPage.getConfirmationCode();
    expect(code).toMatch(/^WE-/);
  });

  test('Run multiple surveys', async ({ surveyPage }) => {
    for (let i = 0; i < 2; i++) {
      const data = TestDataGenerator.generateSurveyData();

      await test.info().attach(`Survey Data - Run ${i + 1}`, {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json'
      });

      const code = await surveyPage.completeDynamicSurvey(data);
      expect(code).toMatch(/^WE-/);
    }
  });

  test('Verify mobile number format', async () => {
    const mobiles = Array.from({ length: 5 }, () => TestDataGenerator.generateMobileNumber());
    
    for (const mobile of mobiles) {
      expect(mobile).toMatch(/^[6-9]\d{9}$/);
    }
  });

  test('Verify scheme selection flow', async ({ surveyPage }) => {
    const data = TestDataGenerator.generateSurveyData();
    data.selectSchemes = true;
    data.schemes = ['schemeTREAD', 'schemeAnnapurna'];

    await test.info().attach('Survey Data', {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json'
    });

    const code = await surveyPage.completeDynamicSurvey(data);
    expect(code).toMatch(/^WE-/);
  });

  test('Verify no scheme selection', async ({ surveyPage }) => {
    const data = TestDataGenerator.generateSurveyData();
    data.selectSchemes = false;
    data.schemes = [];

    await test.info().attach('Survey Data', {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json'
    });

    const code = await surveyPage.completeDynamicSurvey(data);
    expect(code).toMatch(/^WE-/);
  });

  test('Verify group membership selection', async ({ surveyPage }) => {
    const data = TestDataGenerator.generateSurveyData();
    data.selectGroups = true;
    data.groups = ['groupDWCRA'];

    await test.info().attach('Survey Data', {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json'
    });

    const code = await surveyPage.completeDynamicSurvey(data);
    expect(code).toMatch(/^WE-/);
  });

  test('Verify not a member selection', async ({ surveyPage }) => {
    const data = TestDataGenerator.generateSurveyData();
    data.selectGroups = false;
    data.groups = [];

    await test.info().attach('Survey Data', {
      body: JSON.stringify(data, null, 2),
      contentType: 'application/json'
    });

    const code = await surveyPage.completeDynamicSurvey(data);
    expect(code).toMatch(/^WE-/);
  });
});