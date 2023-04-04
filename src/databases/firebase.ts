import admin from 'firebase-admin';
import { FSA_CLIENT_EMAIL, FSA_PRIVATE_KEY, FSA_PROJECT_ID, FIREBASE_BUCKET } from '@config';
import { logger } from '@utils/logger';
const clientEmail = FSA_CLIENT_EMAIL;
const projectId = FSA_PROJECT_ID;
const privateKey = FSA_PRIVATE_KEY;

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail,
    privateKey,
    projectId,
  }),
});

logger.info('Connecting to firebase app ');
export const bucket = admin.storage().bucket(FIREBASE_BUCKET);
