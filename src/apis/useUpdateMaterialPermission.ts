import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const useUpdateMaterialPermission = () => {
  return useMutation<
    AxiosResponse,
    AxiosResponseError,
    {
      groupIds: string[]
      materialId: string
      showAll: boolean
    }
  >({
    mutationKey: ['updateMaterialPermission'],
    mutationFn: async data => {
      return await callAPI('/materials/view', 'post', {
        data,
      })
    },
  })
}
