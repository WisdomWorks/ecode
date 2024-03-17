import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useEnrollCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CourseEnrollmentRequest']
  >({
    mutationKey: ['enroll-course'],
    mutationFn: async data => {
      return await callAPI('/courses/enrollment', 'post', {
        data,
      })
    },
  })
}
