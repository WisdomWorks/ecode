import { TTopic } from '@/types/exercise.types'

import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

interface Props {
  courseId: string
  isTeacher: boolean
}

export const useGetTopicsForTeacher = ({ courseId, isTeacher }: Props) => {
  return useQuery<TTopic[], AxiosError<AxiosResponseError>, TTopic[]>({
    queryKey: ['topics', courseId],
    queryFn: async ({ queryKey }) => {
      const res = await callAPI(`/topics` as Path, 'get', {
        params: {
          courseId: queryKey[1],
        },
      })

      return res.data
    },
    enabled: isTeacher && !!courseId,
  })
}
