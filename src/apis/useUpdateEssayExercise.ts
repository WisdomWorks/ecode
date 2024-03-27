import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateEssayExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['UpdateEssayExerciseRequest'] & {
      exerciseId: string
    }
  >({
    mutationKey: ['UpdateEssayExerciseRequest'],
    mutationFn: async data => {
      return await callAPI('/exercises/essay', 'put', {
        data,
        params: {
          exerciseId: data.exerciseId,
        },
      })
    },
  })
}
