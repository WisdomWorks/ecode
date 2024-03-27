import { isBefore, isPast } from 'date-fns'
import { z } from 'zod'

export const CreateQuizExerciseSchema = z
  .object({
    exerciseId: z.string(),
    topicId: z.string().min(1, { message: 'Topic is required' }),
    exerciseName: z.string().min(1, { message: 'Title is required' }),
    startDate: z.date(),
    endDate: z.date(),
    durationObj: z.date(),
    key: z.string().min(1, { message: 'Enrollment key is required' }),
    questions: z.array(
      z.object({
        title: z.string().optional(),
        isMultipleChoice: z.boolean(),
        choices: z.array(
          z.object({
            choiceId: z.string().optional(),
            content: z.string().optional(),
          }),
        ),
        answers: z.array(
          z.object({
            choiceId: z.string().optional(),
            content: z.string().optional(),
          }),
        ),
        description: z.string(),
      }),
    ),
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
