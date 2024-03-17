import { AxiosResponseError, callAPI } from './axios'
import { TResponseAuth } from './useLogin'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCheckSession = () => {
  return useQuery<AxiosResponse<TResponseAuth>, AxiosError<AxiosResponseError>>(
    {
      queryKey: ['login'],
      queryFn: async data => {
        return await callAPI('/auth/check-session/user', 'get', {
          data,
        })
      },
      retry: false,
    },
  )
}
