import { z } from 'zod';

export default class AdminValidation {
  readonly login = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  readonly signup = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
  });

  readonly forgotPassword = z.object({
    email: z.string().email(),
  });

  readonly resetPassword = z.object({
    email: z.string().email(),
    code: z.number().int().positive().min(100000).max(999999),
    password: z.string().min(8),
  });
}
