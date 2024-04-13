import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateGroupInCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateGroupRequest']
  >({
    mutationKey: ['createGroupInCourse'],
    mutationFn: async data => {
      return await callAPI('/groups', 'post', {
        data,
      })
    },
  })
}
