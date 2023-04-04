import validateZod from '@utils/zod';
import type { Handler } from 'express';
import { ZodObject } from 'zod';
const validationMiddleware = <T extends {}>(schema: ZodObject<T>, from: 'body' | 'params' | 'query' = 'body') => {
  const handler: Handler = (req, res, next) => {
    try {
      const data = req[from];
      validateZod(data, schema);
      next();
    } catch (error) {
      next(error);
    }
  };
  return handler;
};
export default validationMiddleware;
