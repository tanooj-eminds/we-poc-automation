export interface SurveyData {
  mobile: string;
  district: string;
  division: string;
  mandal: string;
  village: string;
  ageGroup: 'ageGroup18_25' | 'ageGroup26_35' | 'ageGroup36_40';
  locationType: 'locationUrban' | 'locationRural';
  employmentStatus: 'employmentEmployed' | 'employmentFarmer' | 'employmentStudent' | 'employmentEntrepreneur' | 'employmentDifferently_Abled' | 'employmentHomemaker' | 'employmentUnemployed';
  interests: string[];
  trainings: string[];
  sectors: string[];
  supportNeeds: string[];
  wantsTraining?: boolean;
  wantsEmploymentOpp?: boolean;
  selectSchemes: boolean;
  schemes: string[];
  selectGroups: boolean;
  groups: string[];
}

export class TestDataGenerator {
  private static random = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
  private static randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
  private static shuffle = <T>(arr: T[], count: number): T[] => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

  static generateMobileNumber(): string {
    const firstDigit = this.random([6, 7, 8, 9]);
    const remaining = String(Math.floor(Math.random() * 900000000) + 100000000);
    return `${firstDigit}${remaining}`;
  }

  static generateInviteData() {
    const timestamp = Date.now();
    return {
      email: `admin${timestamp}@yopmail.com`,
      fullName: `Test Admin ${timestamp}`,
      mobile: this.generateMobileNumber(),
      location: 'Hyderabad',
      message: 'Admin invite from automation',
      password: 'Welcome@123'
    };
  }

  static generateSurveyData(): SurveyData {
    const ageGroups = ['ageGroup18_25', 'ageGroup26_35', 'ageGroup36_40'] as const;
    const locationTypes = ['locationUrban', 'locationRural'] as const;
    const employmentStatuses = ['employmentEmployed', 'employmentFarmer', 'employmentStudent', 'employmentEntrepreneur', 'employmentDifferently_Abled', 'employmentHomemaker', 'employmentUnemployed'] as const;
    
    const trainings = ['trainingInformationTechnology', 'trainingDigitalMarketing', 'trainingHealthcare', 'trainingEntrepreneurship'];
    const sectors = ['sectorInformationTechnology', 'sectorHealthcare', 'sectorEducation', 'sectorManufacturing'];
    const interests = ['interestTailoring', 'interestHandicrafts', 'interestOnlineSelling', 'interestFood'];
    const supportNeeds = ['supportTraining', 'supportFunding', 'supportEquipment'];
    const schemes = ['schemeTREAD', 'schemeAnnapurna', 'schemeUdyogini', 'schemeMudra', 'schemeMahilaUdyamNidhi', 'schemeMudraYojana', 'schemeStreeShakti', 'schemeBhartiyaMahilaBank', 'schemeDenaShakti', 'schemeCentKalyani', 'schemeStandUpIndia', 'schemePMEGP', 'schemeCGTMSE'];
    const groups = ['groupMEPMA', 'groupDWCRA'];

    const selectSchemes = Math.random() > 0.3;
    const selectGroups = Math.random() > 0.5;

    return {
      mobile: this.generateMobileNumber(),
      district: '1',
      division: String(this.randomInt(1, 4)),
      mandal: '',
      village: '',
      ageGroup: this.random(ageGroups),
      locationType: this.random(locationTypes),
      employmentStatus: this.random(employmentStatuses),
      trainings: this.shuffle(trainings, this.randomInt(1, trainings.length)),
      sectors: this.shuffle(sectors, this.randomInt(1, sectors.length)),
      interests: this.shuffle(interests, this.randomInt(1, 4)),
      supportNeeds: this.shuffle(supportNeeds, this.randomInt(1, 3)),
      wantsTraining: Math.random() > 0.5,
      wantsEmploymentOpp: Math.random() > 0.5,
      selectSchemes,
      schemes: selectSchemes ? this.shuffle(schemes, this.randomInt(1, 4)) : [],
      selectGroups,
      groups: selectGroups ? this.shuffle(groups, this.randomInt(1, groups.length)) : []
    };
  }
}