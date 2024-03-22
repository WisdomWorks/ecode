import { AxiosResponseError, callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteTopic = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, string>({
    mutationKey: ['delete-topic'],
    mutationFn: async topicId => {
      return await callAPI(`/topics/${topicId}` as Path, 'delete')
    },
  })
}
