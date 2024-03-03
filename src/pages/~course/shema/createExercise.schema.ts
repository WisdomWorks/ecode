import { z } from 'zod'

export const CreateCodeExerciseSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  mainFunctionName: z
    .string()
    .min(1, { message: 'Main function name is required' }),
})
