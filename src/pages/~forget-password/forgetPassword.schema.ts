import { z } from 'zod'

export const ForgetPasswordSchema = z
  .object({
    userName: z.string().min(1, { message: 'Username is required' }),
    otp: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
    activeStep: z.number(),
  })
  .superRefine(
    ({ activeStep, confirmPassword, newPassword, otp, userName }, ctx) => {
      switch (activeStep) {
        case 0:
          if (!userName) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Username is required',
              path: ['userName'],
            })
          }
          return true
        case 1:
          if (!otp) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'OTP is required',
              path: ['otp'],
            })
          }
          return true
        case 2:
          if (!newPassword) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'New password is required',
              path: ['newPassword'],
            })
          }
          if (!confirmPassword) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Confirm password is required',
              path: ['confirmPassword'],
            })
          }
          if (newPassword !== confirmPassword) {
            return ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords do not match',
              path: ['confirmPassword'],
            })
          }
          return false

        default:
          break
      }

      return false
    },
  )
