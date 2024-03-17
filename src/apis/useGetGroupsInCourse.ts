import { TGroup } from '@/types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  courseId: string
}

export const useGetGroupsInCourse = ({ courseId }: Props) => {
  return useQuery<AxiosResponse<TGroup[]>, AxiosError<AxiosResponseError>>({
    queryKey: ['groupsInCourse', courseId],
    queryFn: async ({ queryKey }) => {
      return await callAPI(`/groups/course/${queryKey[1]}` as Path, 'get')
    },
  })
}
