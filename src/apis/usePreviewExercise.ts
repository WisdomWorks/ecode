import { ExerciseSchema } from '@/types/exercise.types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  exerciseId: string
  studentId: string
}

type TReposponse = ExerciseSchema & { available: boolean }

export const usePreviewExercise = ({ exerciseId, studentId }: Props) => {
  return useQuery<AxiosResponse<TReposponse>, AxiosError<AxiosResponseError>>({
    queryKey: ['exercise', exerciseId, studentId],
    queryFn: async ({ queryKey }) => {
      return await callAPI(`/exercises/preview/${queryKey[1]}` as Path, 'get', {
        params: {
          studentId: queryKey[2],
        },
      })
    },
  })
}
