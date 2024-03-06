import { isBefore, isPast } from 'date-fns'
import { z } from 'zod'

export const CreateEssayExerciseSchema = z
  .object({
    title: z.string().min(1, { message: 'Title is required' }),
    topic: z.string().min(1, { message: 'Topic is required' }),
    startDate: z.date(),
    endDate: z.date(),
  })
  .superRefine(({ endDate, startDate }, ctx) => {
    if (isPast(startDate) || isPast(endDate)) {
      const error = isPast(startDate) ? 'startDate' : 'endDate'

      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Past date is not allowed',
        path: [error],
      })
    }

    if (isBefore(endDate, startDate)) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date must be after start date',
        path: ['endDate'],
      })
    }
  })
