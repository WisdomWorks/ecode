import { AxiosResponseError, callAPI, Path } from './axios'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useDeleteStudentInGroup = ({ groupId }: { groupId: string }) => {
  return useMutation<AxiosResponse, AxiosError<AxiosResponseError>, string[]>({
    mutationKey: ['deleteStudentInGroup'],
    mutationFn: async data => {
      return await callAPI(`/groups/${groupId}/student` as Path, 'delete', {
        data,
      })
    },
  })
}
