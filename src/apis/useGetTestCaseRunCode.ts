import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  submissionId: string
}

export const useGetTestCaseRunCode = ({ submissionId }: Props) => {
  return useQuery<AxiosResponse, AxiosError<AxiosResponseError>>({
    queryKey: ['run-code', submissionId],
    queryFn: async () => {
      return await callAPI(`/exercises/code/run/${submissionId}` as Path, 'get')
    },
    enabled: false,
  })
}
