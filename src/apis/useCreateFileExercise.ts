import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useCreateFileExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['CreateFileExerciseRequest']
  >({
    mutationKey: ['createFileExercise'],
    mutationFn: async data => {
      return await callAPI('/exercises/file', 'post', {
        data,
      })
    },
  })
}
