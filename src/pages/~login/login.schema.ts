import { z } from 'zod'

export const LoginRequestSchema = z.object({
  userName: z.string().min(1, {
    message: 'Username is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})
