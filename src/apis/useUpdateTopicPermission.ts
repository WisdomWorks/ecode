import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useUpdateTopicPermission = () => {
  return useMutation<
    AxiosResponse,
    AxiosResponseError,
    {
      groupIds: string[]
      showAll: boolean
      topicId: string
    }
  >({
    mutationKey: ['updateTopicPermission'],
    mutationFn: async data => {
      return await callAPI('/topics/view', 'post', {
        data,
      })
    },
  })
}
