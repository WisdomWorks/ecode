import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateQuizExerciseByExcel = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, FormData>({
    mutationKey: ['createQuizExerciseByExcel'],
    mutationFn: async formData => {
      return await callAPI('/exercises/quiz/excel', 'post', {
        data: formData,
      })
    },
  })
}
