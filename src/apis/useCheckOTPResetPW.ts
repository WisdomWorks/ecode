import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCheckOTPResetPW = () => {
  return useMutation<
    AxiosResponse<{ userId: string }>,
    AxiosError<AxiosResponseError>,
    { otp: string }
  >({
    mutationKey: ['checkOTPResetPW'],
    mutationFn: async data => {
      return await callAPI('/auth/check-otp', 'post', {
        data,
      })
    },
  })
}
