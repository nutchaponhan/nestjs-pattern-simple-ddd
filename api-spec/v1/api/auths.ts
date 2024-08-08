import { z } from 'zod';
import { c } from '../../libs/contract';

const tokenSchema = z.object({
  token: z.string(),
  lastSignInAt: z.string(),
});

export const authsContract = c.router({
  signIn: {
    method: 'POST',
    path: '/auths/sign-in',
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    responses: {
      200: tokenSchema,
    },
  },
  signUp: {
    method: 'POST',
    path: '/auths/sign-up',
    body: z.object({
      email: z.string().email(),
      firstName: z.string(),
      lastName: z.string(),
      password: z.string(),
    }),
    responses: {
      200: tokenSchema,
    },
  },
});
