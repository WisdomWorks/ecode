import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateTopic = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateTopicRequest'] & {
      topicId: string
    }
  >({
    mutationKey: ['updateTopic'],
    mutationFn: async data => {
      return await callAPI('/topics', 'put', {
        data,
      })
    },
  })
}
