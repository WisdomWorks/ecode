import { ExerciseSchema } from '@/types/exercise.types'

import { AxiosResponseError, callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  courseId: string
}

export const useGetExercises = ({ courseId }: Props) => {
  return useQuery<
    AxiosResponse<ExerciseSchema[]>,
    AxiosError<AxiosResponseError>
  >({
    queryKey: ['get-exercises', courseId],
    queryFn: async () => {
      return await callAPI('/exercises', 'get', {
        params: {
          courseId,
        },
      })
    },
  })
}
