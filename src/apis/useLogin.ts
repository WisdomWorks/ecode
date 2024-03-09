import { useMutation } from 'react-query'

import { Schema } from '@/types'

import { callAPI } from './axios'
import { AxiosError, AxiosResponse } from 'axios'

export const useLogin = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<{ message: string }>,
    Schema['LoginRequest']
  >({
    mutationKey: ['login'],
    mutationFn: async data => {
      return await callAPI('/auth/login', 'post', {
        data,
      })
    },
  })
}
