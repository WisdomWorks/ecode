import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useChangePW = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['ChangePasswordRequest']
  >({
    mutationKey: ['changePW'],
    mutationFn: async data => {
      return await callAPI('/users/change-password', 'put', {
        data,
      })
    },
  })
}
