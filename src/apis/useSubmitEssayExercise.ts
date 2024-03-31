import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type EssaySubmission = {
  exerciseId: string
  studentId: string
  submission: string
}

export const useSubmitEssayExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    EssaySubmission
  >({
    mutationKey: ['submitEssayExercise'],
    mutationFn: async data => {
      return callAPI('/exercises/essay/submit', 'post', {
        data,
      })
    },
  })
}
