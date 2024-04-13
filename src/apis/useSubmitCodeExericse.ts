import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useSubmitCodeExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['SubmitCodeExerciseRequest']
  >({
    mutationKey: ['submit-code-exercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/code/submit', 'post', {
        data,
      })
    },
  })
}
