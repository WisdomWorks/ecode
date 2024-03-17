import { callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await callAPI('/auth/logout', 'post')
    },
    onSuccess: () => window.location.replace('/login'),
  })
}
