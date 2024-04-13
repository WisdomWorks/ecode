import { AxiosResponseError, callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteMaterial = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, string>({
    mutationKey: ['delete-material'],
    mutationFn: async materialId => {
      return await callAPI(`/materials/${materialId}` as Path, 'delete')
    },
  })
}
