import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateTopic = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateTopicRequest']
  >({
    mutationFn: async (data: Schema['CreateTopicRequest']) => {
      return await callAPI('/topics', 'post', {
        data,
      })
    },
    mutationKey: ['createTopic'],
  })
}
