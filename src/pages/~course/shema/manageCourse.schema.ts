import { z } from 'zod'

export const ManageCourseSchema = z.object({
  courseName: z.string().min(1, { message: 'Course name is required' }),
  semester: z.string().min(1, { message: 'Semester is required' }),
  description: z.string().nullable(),
  teacher: z
    .object({
      userId: z.string(),
      name: z.string(),
    })
    .required(),
})
