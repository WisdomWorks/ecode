import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type GradeCodeParams = {
  comment?: string
  score: number
  submissionId: string
}

export const useGradeCodeExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    GradeCodeParams
  >({
    mutationKey: ['gradeCodeExericse'],
    mutationFn: async data => {
      return await callAPI('/exercises/code/grade', 'put', {
        data,
      })
    },
  })
}
