import * as jsonwebtoken from 'jsonwebtoken';
import { JWT_KEY } from '@config';
import { HttpException } from '@utils/response';
export interface IPayload {
  userId: string;
  time: string;
}

export function sign(payload: IPayload) {
  if (!JWT_KEY) {
    throw new HttpException(500, 'jwt key is missing');
  }
  return jsonwebtoken.sign(payload, JWT_KEY);
}

export function verify(token?: string) {
  if (!token) {
    throw new HttpException(401, 'Token is missing');
  }
  if (!JWT_KEY) {
    throw new HttpException(500, 'jwt key is missing');
  }
  let payload: IPayload | null = null;
  try {
    payload = jsonwebtoken.verify(token, JWT_KEY) as IPayload;
  } catch (error) {
    new HttpException(401, 'user is not verify');
  }
  if (!payload || !payload.userId || !payload.time) {
    throw new HttpException(401, 'Invalid token');
  }
  return payload;
}
