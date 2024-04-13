import { testCaseStatus } from '@/constants'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  submissionId: string
  userId: string
}

export type TGetTestCaseRunCode = {
  message?: string
  status: keyof typeof testCaseStatus
  testCases: {
    extendedFeedback?: string
    feedback?: string
    id?: string
    memory?: number
    output?: string
    points?: number
    status?: keyof typeof testCaseStatus
    submissionId?: string
    testCaseId?: number
    time?: number
    total?: number
  }[]
}

export const useGetTestCaseRunCode = ({ submissionId, userId }: Props) => {
  return useQuery<
    AxiosResponse<TGetTestCaseRunCode>,
    AxiosError<AxiosResponseError>
  >({
    queryKey: ['run-code', submissionId, userId],
    queryFn: async () => {
      return await callAPI(
        `/exercises/code/run/${submissionId}` as Path,
        'get',
        {
          params: {
            userId,
          },
        },
      )
    },
    enabled: false,
  })
}
