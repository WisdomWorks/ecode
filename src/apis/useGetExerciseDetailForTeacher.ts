import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface Props {
  exerciseId: string
}

export const useGetExerciseDetailForTeacher = ({ exerciseId }: Props) => {
  return useQuery<AxiosResponse, AxiosResponseError>({
    queryKey: ['GetExerciseDetailForTeacher', exerciseId],
    queryFn: async () => {
      return await callAPI(`/exercises/${exerciseId}` as Path, 'get')
    },
    enabled: !!exerciseId,
  })
}
