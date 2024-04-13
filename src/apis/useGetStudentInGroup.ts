import { TUser } from '@/types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useGetStudentInGroup = ({ groupId }: { groupId: string }) => {
  return useQuery<AxiosResponse<TUser[]>, AxiosError<AxiosResponseError>>({
    queryKey: ['students-group', groupId],
    queryFn: async () => {
      return await callAPI(`/groups/${groupId}/student/in-group` as Path, 'get')
    },
    enabled: !!groupId,
  })
}
