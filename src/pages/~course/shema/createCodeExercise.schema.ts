import { isBefore, isPast } from 'date-fns'
import { z } from 'zod'

export const CreateCodeExerciseSchema = z
  .object({
    exerciseId: z.string().optional(),
    topicId: z.string().min(1, { message: 'Topic is required' }),
    exerciseName: z.string().min(1, { message: 'Title is required' }),
    startDate: z.date(),
    endDate: z.date(),
    durationObj: z.date(),
    key: z.string().min(1, { message: 'Enrollment key is required' }),
    points: z.number(),
    description: z.string().min(1, { message: 'Question is required' }),
    reAttempt: z.any().refine(value => +value >= 1, {
      message: 'Attempt limit must be greater than 0',
    }),
    allowedLanguageIds: z
      .array(z.object({ key: z.string() }))
      .nonempty({ message: 'Language is required' }),
    testCases: z
      .array(
        z.object({
          testcaseId: z.string().optional(),
          input: z.string().min(1, { message: 'Input is required' }),
          output: z.string().min(1, { message: 'Output is required' }),
          points: z
            .number()
            .optional()
            .refine(
              value => {
                return Number(value) >= 0 && Number(value) <= 10
              },
              {
                message: 'Points must be between 1 and 10',
              },
            ),
          isShownTestCase: z.boolean().optional(),
          defaultTestCase: z.boolean().optional(),
        }),
      )
      .nonempty({ message: 'Test case is required' }),
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
