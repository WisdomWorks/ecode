import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useCreateMaterial = () => {
  return useMutation<AxiosResponse, AxiosResponseError, FormData>({
    mutationKey: ['createMaterial'],
    mutationFn: async (formData: FormData) => {
      return await callAPI('/materials', 'post', {
        data: formData,
      })
    },
  })
}
