import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export type GradeEssayParams = {
  essaySubmissionId: string
  score: number
}

export const useGradeEssay = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    GradeEssayParams
  >({
    mutationKey: ['gradeEssay'],
    mutationFn: async params => {
      return await callAPI('/exercises/essay/grade', 'put', {
        params,
      })
    },
  })
}
