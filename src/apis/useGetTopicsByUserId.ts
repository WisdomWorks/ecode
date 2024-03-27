import { TTopic } from '@/types/exercise.types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface Props {
  courseId: string
  isStudent: boolean
  userId: string
}

export const useGetTopicsByUserId = ({
  courseId,
  isStudent,
  userId,
}: Props) => {
  return useQuery<TTopic[], AxiosError<AxiosResponseError>, TTopic[]>({
    queryKey: ['topics', userId, courseId],
    queryFn: async ({ queryKey }) => {
      const res = await callAPI(`/topics/user/${userId}` as Path, 'get', {
        params: {
          userId: queryKey[1],
          courseId: queryKey[2],
        },
      })

      return res.data
    },
    enabled: !!courseId && !!userId && isStudent,
  })
}
