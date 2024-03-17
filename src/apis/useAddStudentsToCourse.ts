import { Schema } from '@/types'

import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useAddStudentsToCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    Schema['AddStudentToCourseRequest']
  >({
    mutationKey: ['addStudentsToCourse'],
    mutationFn: async data => {
      return await callAPI('/courses/student', 'post', {
        data,
      })
    },
  })
}
