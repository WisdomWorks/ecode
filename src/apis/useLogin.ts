import { Schema, TCourse, TUser } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type TResponseAuth = {
  courses: TCourse[]
  token: string
  user: TUser
}

export const useLogin = () => {
  return useMutation<
    AxiosResponse<TResponseAuth>,
    AxiosError<AxiosResponseError>,
    Schema['LoginRequest']
  >({
    mutationKey: ['login'],
    mutationFn: async data => {
      return await callAPI('/auth/login/user', 'post', {
        data,
      })
    },
  })
}
