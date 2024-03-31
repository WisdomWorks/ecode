import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type TQuizSubmission = {
  exerciseId: string
  studentId: string
  submission: TSubmission[]
}

export type TSubmission = {
  answers: Answer[]
  questionId: string
}

export type Answer = {
  choiceId: string
  content: string
}

export const useSubmitQuizExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    TQuizSubmission
  >({
    mutationKey: ['submitEssayExercise'],
    mutationFn: async data => {
      return callAPI('/exercises/quiz/submit', 'post', {
        data,
      })
    },
  })
}
