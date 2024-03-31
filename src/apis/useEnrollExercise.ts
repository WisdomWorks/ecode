import { EssayExerciseSchema, QuizExerciseSchema } from '@/types/exercise.types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export interface IEnrollExercise {
  exerciseId: string
  key: string
  studentId: string
}

type Response = EssayExerciseSchema | QuizExerciseSchema

export const useEnrollExercise = () => {
  return useMutation<
    AxiosResponse<Response>,
    AxiosError<AxiosResponseError>,
    IEnrollExercise
  >({
    mutationKey: ['enroll-exercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/detail', 'post', { data })
    },
  })
}
