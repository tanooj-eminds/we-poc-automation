import { Page } from "@playwright/test";

export const getAllLocators = (page: Page) => ({
  // Login
  email: page.getByRole('textbox', { name: 'Username or Email' }),
  password: page.getByRole('textbox', { name: 'Password' }),
  loginBtn: page.getByRole('button', { name: 'Login' }),

  // Landing
  proceedBtn: page.getByRole('button', { name: 'I Understand - Proceed to Survey' }),
  mobileInput: page.getByRole('textbox', { name: /Enter 10-digit mobile number/i }),
  districtDropdown: page.locator('#district'),
  revenueDivisionDropdown: page.locator('#revenueDivision'),
  mandalDropdown: page.locator('#mandal'),
  villageDropdown: page.locator('#village'),
  continueBtn: page.getByRole('button', { name: 'Continue' }),
  submitSurveyBtn: page.getByRole('button', { name: 'Submit Survey' }),

  // Demographics
  ageGroup18_25: page.getByText('18-25 years', { exact: true }),
  ageGroup26_35: page.getByText('26-35 years', { exact: true }),
  ageGroup36_40: page.getByText('36-40 years', { exact: true }),
  locationUrban: page.getByText('Urban', { exact: true }),
  locationRural: page.getByText('Rural', { exact: true }),

  // Employment
  employmentEmployed: page.getByText('Employed', { exact: true }),
  employmentFarmer: page.getByText('Farmer', { exact: true }),
  employmentStudent: page.getByText('Student', { exact: true }),
  employmentEntrepreneur: page.getByText('Entrepreneur', { exact: true }),
  employmentDifferently_Abled: page.getByText('Differently-Abled', { exact: true }),
  employmentHomemaker: page.getByText('Homemaker', { exact: true }),
  employmentUnemployed: page.getByText('Unemployed', { exact: true }),

  // Training
  trainingInterestedYes: page.locator('label[for="INTERESTED_IN_TRAINING-0"]'),
  trainingInterestedNo: page.locator('label[for="INTERESTED_IN_TRAINING-1"]'),
  trainingInformationTechnology: page.getByText('Information Technology', { exact: true }),
  trainingDigitalMarketing: page.getByText('Digital Marketing', { exact: true }),
  trainingHealthcare: page.getByText('Healthcare', { exact: true }),
  trainingEntrepreneurship: page.getByText('Entrepreneurship', { exact: true }),

  // Employment Opportunities
  employmentOppYes: page.locator('label[for="EMPLOYMENT_INTEREST-0"]'),
  employmentOppNo: page.locator('label[for="EMPLOYMENT_INTEREST-1"]'),

  // Sectors
  sectorInformationTechnology: page.getByText('Information Technology', { exact: true }),
  sectorHealthcare: page.getByText('Healthcare', { exact: true }),
  sectorEducation: page.getByText('Education', { exact: true }),
  sectorManufacturing: page.getByText('Manufacturing', { exact: true }),

  // Interests
  categoryAspiringEntrepreneur: page.getByText('Aspiring Entrepreneur', { exact: true }),
  interestTailoring: page.getByText('Tailoring', { exact: true }),
  interestHandicrafts: page.getByText('Handicrafts', { exact: true }),
  interestOnlineSelling: page.getByText('Online Selling', { exact: true }),
  interestFood: page.getByText('Food', { exact: true }),

  // Support
  supportTraining: page.getByRole('checkbox', { name: 'Training' }),
  supportFunding: page.getByRole('checkbox', { name: 'Funding' }),
  supportEquipment: page.getByRole('checkbox', { name: 'Equipment' }),

  // Land & Schemes
  landSupportYes: page.getByText('Yes').first(),
  landSupportNo: page.getByText('No').first(),
  schemeAwarenessYes: page.locator('label[for="AVAILING_GOVT_SCHEME-0"]'),
  schemeAwarenessNo: page.locator('label[for="AVAILING_GOVT_SCHEME-1"]'),

  // Schemes
  schemeTREAD: page.getByRole('checkbox', { name: /TREAD Scheme/i }),
  schemeAnnapurna: page.getByRole('checkbox', { name: /Annapurna Scheme/i }),
  schemeUdyogini: page.getByRole('checkbox', { name: /Udyogini Scheme/i }),
  schemeMudra: page.getByRole('checkbox', { name: /Mudra.*Micro Units/i }),
  schemeMahilaUdyamNidhi: page.getByRole('checkbox', { name: /Mahila Udyam Nidhi/i }),
  schemeMudraYojana: page.getByRole('checkbox', { name: /Mudra Yojana/i }),
  schemeStreeShakti: page.getByRole('checkbox', { name: /Stree Shakti/i }),
  schemeBhartiyaMahilaBank: page.getByRole('checkbox', { name: /Bhartiya Mahila Business/i }),
  schemeDenaShakti: page.getByRole('checkbox', { name: /Dena Shakti/i }),
  schemeCentKalyani: page.getByRole('checkbox', { name: /Cent Kalyani/i }),
  schemeStandUpIndia: page.getByRole('checkbox', { name: /Stand-Up India/i }),
  schemePMEGP: page.getByRole('checkbox', { name: /PMEGP.*Prime Minister/i }),
  schemeCGTMSE: page.getByRole('checkbox', { name: /CGTMSE.*Credit Guarantee/i }),

  // Groups
  groupMEPMA: page.getByRole('checkbox', { name: /MEPMA.*Mission for Elimination/i }),
  groupDWCRA: page.getByRole('checkbox', { name: /DWCRA.*Development of Women/i }),
  notMemberCheckbox: page.getByRole('checkbox', { name: /Not a member/i }),

  // Submit
  submitResponseBtn: page.getByRole('button', { name: /Submit Response/i }),
  acknowledgeCheckbox: page.getByRole('checkbox', { name: /I acknowledge/i }),
  confirmationCode: page.getByRole('heading', { name: /^WE-/ }),

  // Invite
  inviteTab: page.locator('#admin-tabs-tab-invite'),
  inviteEmail: page.locator('input[placeholder="Enter Email Id"]'),
  inviteFullName: page.locator('input[placeholder="Enter Full Name"]'),
  inviteMobile: page.locator('input[placeholder="Enter 10-digit Mobile Number"]'),
  inviteLocation: page.locator('input[placeholder="Enter location"]'),
  inviteMessage: page.locator('textarea[placeholder="Write a message for the invited person..."]'),
  inviteSubmitBtn: page.locator('button[type="submit"]'),

  // YOPmail
  yopmailLoginInput: page.locator('#login'),
  yopmailCheckBtn: page.locator('.material-icons-outlined.f36'),

  // Password Creation
  newPassword: page.locator('input[name="password"]'),
  confirmPassword: page.locator('input[name="confirmPassword"]'),
  passwordToggle: page.locator('.bi.bi-eye.password-toggle-icon').first(),
  confirmPasswordToggle: page.locator('.mb-4 .bi.bi-eye.password-toggle-icon'),
  passwordSubmitBtn: page.getByRole('button', { name: 'Set Password' })

});