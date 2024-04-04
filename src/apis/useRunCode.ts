import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

type Response = {
  submissionId: string
}

export const useRunCode = () => {
  return useMutation<
    AxiosResponse<Response>,
    AxiosError<AxiosResponseError>,
    Schema['SubmitCodeExerciseRequest']
  >({
    mutationKey: ['submit-code-exercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/code/run', 'post', {
        data,
      })
    },
  })
}
