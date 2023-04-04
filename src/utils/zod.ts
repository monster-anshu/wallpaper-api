import { HttpException } from '@utils/response';
import { fromZodError } from 'zod-validation-error';
import { ZodObject } from 'zod';

export default function validateZod<T extends {}>(data: Object, schema: ZodObject<T>) {
  const validationResult = schema.strict().safeParse(data);
  if (!validationResult.success) {
    const error = fromZodError(validationResult.error);
    throw new HttpException(422, error.message);
  }
  return validationResult.data;
}
