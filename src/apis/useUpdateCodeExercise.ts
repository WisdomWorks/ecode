import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateCodeExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['UpdateCodeExerciseRequest']
  >({
    mutationKey: ['createCodeExercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/code', 'put', {
        data,
      })
    },
  })
}
