import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useGetOTPResetPW = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    { userName: string }
  >({
    mutationKey: ['getOTPResetPW'],
    mutationFn: async data => {
      return await callAPI('/auth/send-otp', 'post', {
        data,
      })
    },
  })
}
