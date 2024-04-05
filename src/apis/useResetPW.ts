import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useResetPW = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    { password: string; userId: string }
  >({
    mutationKey: ['reset-pw'],
    mutationFn: async data => {
      return await callAPI('/auth/change-password', 'put', {
        data,
      })
    },
  })
}
