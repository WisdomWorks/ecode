import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  submissionId: string
}

type TResponse = {
  message: string
  status: string
  testCases: {
    extendedFeedback: string
    feedback: string
    id: string
    memory: number
    output: string
    points: number
    status: string
    submissionId: string
    testCaseId: number
    time: number
    total: number
  }[]
}

export const useGetTestCaseRunCode = ({ submissionId }: Props) => {
  return useQuery<AxiosResponse<TResponse>, AxiosError<AxiosResponseError>>({
    queryKey: ['run-code', submissionId],
    queryFn: async () => {
      return await callAPI(`/exercises/code/run/${submissionId}` as Path, 'get')
    },
    enabled: false,
  })
}
