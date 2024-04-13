import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useUpdateExercisePermission = () => {
  return useMutation<
    AxiosResponse,
    AxiosResponseError,
    {
      exerciseId: string
      groupIds: string[]
      showAll: boolean
    }
  >({
    mutationKey: ['UpdateExercisePermission'],
    mutationFn: async data => {
      return await callAPI('/exercises/view', 'post', {
        data,
      })
    },
  })
}
