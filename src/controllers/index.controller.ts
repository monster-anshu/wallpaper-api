import { HttpResponse } from '@utils/response';
import type { Handler } from 'express';

export default class IndexController {
  public index: Handler = (req, res, next) => {
    try {
      res.json(new HttpResponse('Hello World'));
    } catch (error) {
      next(error);
    }
  };
}
