import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    Schema['UpdateCourseRequest']
  >({
    mutationFn: (course: Schema['UpdateCourseRequest']) => {
      return callAPI('/courses', 'put', {
        data: course,
      })
    },
  })
}
