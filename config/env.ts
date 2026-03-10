import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const Config = {
  BASE_URL: process.env.BASE_URL as string,
  API_BASE_URL: process.env.API_BASE_URL as string,
  YOPMAIL_URL: process.env.Yopmail_URL as string,
  API_EMAIL: process.env.api_email as string,
  API_PASSWORD: process.env.api_password as string,
  UI_EMAIL: process.env.ui_email as string,
  UI_PASSWORD: process.env.ui_password as string,
} as const;