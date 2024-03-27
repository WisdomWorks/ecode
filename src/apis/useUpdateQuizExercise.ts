import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateQuizExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['UpdateQuizExerciseRequest']
  >({
    mutationKey: ['createQuizExercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/quiz', 'put', {
        data,
      })
    },
  })
}
