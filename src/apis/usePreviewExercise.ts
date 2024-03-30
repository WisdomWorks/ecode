import { ExerciseSchema } from '@/types/exercise.types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const usePreviewExercise = ({ exerciseId }: { exerciseId: string }) => {
  return useQuery<
    AxiosResponse<ExerciseSchema>,
    AxiosError<AxiosResponseError>
  >({
    queryKey: ['exercise', exerciseId],
    queryFn: async () => {
      return await callAPI(`/exercises/${exerciseId}/preview` as Path, 'get')
    },
    enabled: !!exerciseId,
  })
}
