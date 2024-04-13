import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type GradeParams = {
  comment?: string
  score: number
  submissionId: string
}

export const useGradeFileExercise = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    GradeParams
  >({
    mutationKey: ['gradeFile'],
    mutationFn: async data => {
      return await callAPI('/exercises/file/grade', 'put', {
        data,
      })
    },
  })
}
