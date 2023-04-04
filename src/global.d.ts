import type { IAdmin } from '@interfaces/models.interface';

declare global {
  namespace Express {
    export interface Request {
      admin: IAdmin & { _id: string };
    }
  }
}
