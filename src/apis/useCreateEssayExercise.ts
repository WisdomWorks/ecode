import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateEssayExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateEssayExerciseRequest']
  >({
    mutationKey: ['createEssayExercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/essay', 'post', {
        data,
      })
    },
  })
}
