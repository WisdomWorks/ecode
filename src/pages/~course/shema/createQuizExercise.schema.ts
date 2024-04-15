import { isBefore, isPast } from 'date-fns'
import { uniqBy } from 'lodash'
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
    reAttempt: z.any().refine(value => +value >= 1, {
      message: 'Attempt limit must be greater than 0',
    }),
    createOption: z.string().optional(),
    questions: z.array(
      z.object({
        questionId: z.string().optional(),
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
  .superRefine(({ createOption, endDate, questions, startDate }, ctx) => {
    if (isPast(endDate)) {
      const error = 'endDate'

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Past date is not allowed',
        path: [error],
      })
    }

    if (isBefore(endDate, startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date must be after start date',
        path: ['endDate'],
      })
    }

    if (createOption === 'manual') {
      questions.forEach((value, index) => {
        const choices = value.choices.filter(item => item.content)
        const uniqChoices = uniqBy(choices, 'content')

        if (choices.length !== uniqChoices.length) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Choices must be unique answer',
            path: ['questions', index, 'choices'],
          })
        }
      })
    }
  })
