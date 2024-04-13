import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

type Params = {
  courseId: string
  userId: string
}

export const useUnenrollCourse = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, Params>({
    mutationKey: ['unenrollCourse'],
    mutationFn: async params => {
      return await callAPI('/courses/unEnrollment', 'delete', {
        params,
      })
    },
  })
}
