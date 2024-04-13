import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateCodeExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateCodeExerciseRequest']
  >({
    mutationKey: ['createCodeExercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/code', 'post', {
        data,
      })
    },
  })
}
