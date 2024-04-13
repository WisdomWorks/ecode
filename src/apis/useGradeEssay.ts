import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type GradeEssayParams = {
  comment?: string
  score: number
  submissionId: string
}

export const useGradeEssay = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    GradeEssayParams
  >({
    mutationKey: ['gradeEssay'],
    mutationFn: async data => {
      return await callAPI('/exercises/essay/grade', 'put', {
        data,
      })
    },
  })
}
