import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: 'Old password is required' }),

    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      )
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }

    return false
  })
