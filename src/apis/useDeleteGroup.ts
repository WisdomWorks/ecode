import { AxiosResponseError, callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteGroup = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<AxiosResponseError>,
    { groupId: string }
  >({
    mutationKey: ['deleteGroup'],
    mutationFn: async ({ groupId }) => {
      return await callAPI(`/groups/${groupId}` as Path, 'delete')
    },
  })
}
