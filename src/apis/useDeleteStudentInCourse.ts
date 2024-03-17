import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  courseId: string
  studentId: string
}

export const useDeleteStudentInCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['RemoveStudentFromCourseRequest']
  >({
    mutationKey: ['deleteStudentInCourse'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: async (data: Props) => {
      return await callAPI('/courses/student', 'delete', {
        data,
      })
    },
  })
}
