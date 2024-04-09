import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useSubmitFileExercise = () => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, FormData>({
    mutationKey: ['submitFileExercise'],
    mutationFn: async (formData: FormData) => {
      return callAPI('/exercises/file/submit', 'post', {
        data: formData,
      })
    },
  })
}
