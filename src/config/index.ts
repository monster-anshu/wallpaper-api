import { config } from 'dotenv';
config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT = 'dev',
  LOG_DIR = '',
  ORIGIN,
  FSA_CLIENT_EMAIL,
  FSA_PROJECT_ID,
  FSA_PRIVATE_KEY,
  FIREBASE_BUCKET,
  JWT_KEY,
  MONGO_URL,
  NODE_MAILER_PASSWORD,
  NODE_MAILER_USERNAME,
} = process.env;
