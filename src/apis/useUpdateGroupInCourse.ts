import { AxiosResponseError, callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useUpdateGroupInCourse = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    { groupId: string; groupName: string }
  >({
    mutationKey: ['updateGroup'],
    mutationFn: async ({ groupId, groupName }) => {
      return await callAPI(`/groups/${groupId}` as Path, 'put', {
        data: {
          groupName,
        },
      })
    },
  })
}
