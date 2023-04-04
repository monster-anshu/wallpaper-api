import type { NextFunction, Request, Response } from 'express';
import { HttpException, HttpResponse } from '@utils/response';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const isSuccess: boolean = error.isSuccess || false;
    const data: unknown = error.data || null;
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).send(new HttpResponse(data, message, status, isSuccess));
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
