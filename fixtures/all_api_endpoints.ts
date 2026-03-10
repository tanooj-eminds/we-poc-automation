import { Config } from "../config/env";

const { API_BASE_URL } = Config;

export const API_ENDPOINTS = {
  AUTH: {
    ADMIN: {
      LOGIN: `${API_BASE_URL}/auth/admin/login/`,
      INVITE: `${API_BASE_URL}/auth/admin/invite/`,
      ACTIVATE: `${API_BASE_URL}/auth/admin/activate/`,
    }
  },
  ANALYTICS: {
    AGE_GROUP: `${API_BASE_URL}/analytics/age-group/`,
    GOVT_GROUP_MEMBERSHIP: `${API_BASE_URL}/analytics/govt-group-membership/`,
    GOVT_SCHEMES: `${API_BASE_URL}/analytics/govt-schemes/`,
    LOCATION_BREAKDOWN: `${API_BASE_URL}/analytics/location-breakdown/`,
    MANDAL_PERFORMANCE: `${API_BASE_URL}/analytics/mandal-performance/`,
    MONTHLY_REGISTRATION_TRENDS: `${API_BASE_URL}/analytics/monthly-registration-trends/`,
    MULTI_QUESTION: `${API_BASE_URL}/analytics/multi-question/`,
    SUMMARY: `${API_BASE_URL}/analytics/summary/`,
    TIME_SERIES: `${API_BASE_URL}/analytics/time-series/`,
    QUESTION_BY_ID: (id: string) => `${API_BASE_URL}/analytics/question/${id}/`,
  },
  DASHBOARD: {
    TOP_INTERESTS: `${API_BASE_URL}/dashboard/top-interests/`,
    TRAINING_AREAS_TRENDS: `${API_BASE_URL}/dashboard/training-areas-trends/`,
    WOMEN_STATUS: `${API_BASE_URL}/dashboard/women-status/`,
  },
  SURVEY: {
    CHECK_MOBILE: `${API_BASE_URL}/survey/check-mobile/`,
    CHOICES: `${API_BASE_URL}/survey/choices/`,
    SCHEMA: `${API_BASE_URL}/survey/schema/`,
    SUBMIT: `${API_BASE_URL}/survey/submit/`,
  },
  LOCATIONS: {
    DISTRICTS: `${API_BASE_URL}/locations/districts/`,
    DIVISIONS: `${API_BASE_URL}/locations/divisions/`,
    MANDALS: `${API_BASE_URL}/locations/mandals/`,
    VILLAGES: `${API_BASE_URL}/locations/villages/`,
  },
  INTERNAL: {
    ENCRYPT_TEXT: `${API_BASE_URL}/internal/encrypt-text/`,
  }
} as const;