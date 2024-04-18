import { Schema } from '@/types'

import { AxiosResponseError, callAPI } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useExportCourseScore = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    Schema['ExportScoresRequest']
  >({
    mutationKey: ['exportCourseScore'],
    mutationFn: async data => {
      return await callAPI('/exercises/export-scores', 'post', {
        data,
        responseType: 'blob',
      })
    },
  })
}
