import { isBefore, isPast } from 'date-fns'
import { z } from 'zod'

export const CreateEssayExerciseSchema = z
  .object({
    exerciseId: z.string(),
    topicId: z.string().min(1, { message: 'Topic is required' }),
    exerciseName: z.string().min(1, { message: 'Title is required' }),
    question: z.string().min(1, { message: 'Question is required' }),
    startDate: z.date(),
    endDate: z.date(),
    durationObj: z.date(),
    key: z.string().min(1, { message: 'Enrollment key is required' }),
    reAttempt: z.any().refine(value => +value >= 1, {
      message: 'Attempt limit must be greater than 0',
    }),
    usingAiGrading: z.boolean(),
  })
  .superRefine(({ endDate, startDate }, ctx) => {
    if (isPast(endDate)) {
      const error = 'endDate'

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
