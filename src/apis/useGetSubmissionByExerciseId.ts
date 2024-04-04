import { TUser } from '@/types'

import { callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  exerciseId: string
  type: string
}

export type TStudentSubmissionResponse = {
  student: TUser
  submissions: {
    dateSubmit: string
    exerciseId: string
    score: number
    submission: string
    submissionId: string
    teacherComment: string
  }
}

export const useGetSubmissionByExerciseId = ({ exerciseId, type }: Props) => {
  return useQuery<AxiosResponse<TStudentSubmissionResponse[]>, AxiosError>({
    queryKey: ['submission', exerciseId],
    queryFn: async () => {
      return await callAPI(
        `/exercises/${exerciseId}/all-submission` as Path,
        'get',
        {
          params: {
            type,
          },
        },
      )
    },
  })
}
