import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  exerciseId: string
}

export const useUpdateQuizExercise = ({ exerciseId }: Props) => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['UpdateQuizExerciseRequest']
  >({
    mutationKey: ['createQuizExercise', exerciseId],
    mutationFn: async data => {
      return await callAPI('/exercises/quiz', 'put', {
        data,
        params: {
          exerciseId,
        },
      })
    },
  })
}
