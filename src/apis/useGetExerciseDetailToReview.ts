import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export interface GetExerciseDetailToReviewProps {
  exerciseId: string
  type: string
  userId: string
}

export const useGetExerciseDetailToReview = ({
  exerciseId,
  type,
  userId,
}: GetExerciseDetailToReviewProps) => {
  return useQuery<AxiosResponse, AxiosError<AxiosResponseError>>({
    queryKey: ['exercise-detail-to-review'],
    queryFn: async () => {
      return await callAPI(`/exercises/submit/user/${userId}` as Path, 'get', {
        params: {
          type,
          exerciseId,
          userId,
        },
      })
    },
  })
}
