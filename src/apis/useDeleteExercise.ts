import { AxiosResponseError, callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

type TParams = {
  exerciseId: string
  type: string
}

export const useDeleteExercise = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, TParams>({
    mutationKey: ['delete-exercises'],
    mutationFn: async ({ exerciseId, type }) => {
      return await callAPI(`/exercises/${exerciseId}` as Path, 'delete', {
        params: {
          type,
        },
      })
    },
  })
}
