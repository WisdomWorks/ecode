import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useAddStudentsToGroups = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateGroupStudentRequest']
  >({
    mutationKey: ['addStudentsToGroup'],
    mutationFn: async data => {
      return await callAPI('/groups/student', 'post', {
        data,
      })
    },
  })
}
