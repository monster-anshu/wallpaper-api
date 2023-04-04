import { logger } from '@utils/logger';
import { MONGO_URL } from '@config';
import mongoose, { MongooseError } from 'mongoose';
const connection = {
  isConnected: false,
};

const connectToMongo = async () => {
  if (!MONGO_URL) {
    throw new MongooseError('Database url not found');
  }
  if (connection.isConnected) {
    logger.info('Using existing mongoDB connection');
    return;
  }
  logger.info('Using new mongoDB connection');
  const db = await mongoose
    .connect(MONGO_URL)
    .then(db => {
      logger.info('Connected to mongoDB');
      return db;
    })
    .catch(() => {
      logger.error('Connection failed to mongoDB');
    });
  if (!db) {
    connection.isConnected = false;
    return;
  }
  connection.isConnected = db.connections[0]?.readyState === 1;
};

connectToMongo();
