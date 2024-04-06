import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Params {
  CourseId: string
  userId: string
}

export const useGetGradeStudent = ({ CourseId, userId }: Params) => {
  return useQuery<AxiosResponse, AxiosError<AxiosResponseError>>({
    queryKey: ['grade', CourseId, userId],
    queryFn: async () => {
      return await callAPI(
        `/exercises/all-submission/user/${userId}` as Path,
        'get',
        {
          params: {
            CourseId,
          },
        },
      )
    },
  })
}
