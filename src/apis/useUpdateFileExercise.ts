import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateFileExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['UpdateFileExerciseRequest'] & {
      exerciseId: string
    }
  >({
    mutationKey: ['updateFileExercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/file', 'put', {
        data,
        params: {
          exerciseId: data.exerciseId,
        },
      })
    },
  })
}
