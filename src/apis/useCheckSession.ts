import { useAppStore } from '@/context/useAppStore'

import { AxiosResponseError, callAPI } from './axios'
import { TResponseAuth } from './useLogin'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCheckSession = () => {
  const user = useAppStore(state => state.user)
  return useQuery<AxiosResponse<TResponseAuth>, AxiosError<AxiosResponseError>>(
    {
      queryKey: ['login'],
      queryFn: async data => {
        return await callAPI('/auth/check-session/user', 'get', {
          data,
        })
      },
      retry: false,
      enabled: !user,
    },
  )
}
