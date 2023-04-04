import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    SECRET_KEY: str(),
    LOG_FORMAT: str(),
    ORIGIN: str(),
    FSA_CLIENT_EMAIL: str(),
    FSA_PROJECT_ID: str(),
    FSA_PRIVATE_KEY: str(),
    FIREBASE_BUCKET: str(),
    JWT_KEY: str(),
    MONGO_URL: str(),
    NODE_MAILER_PASSWORD: str(),
    NODE_MAILER_USERNAME: str(),
  });
};

export default validateEnv;
