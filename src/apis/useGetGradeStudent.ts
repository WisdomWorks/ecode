import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Params {
  courseId: string
  userId: string
}

export type GradeStudent = {
  dateGrade: string
  dateSubmission: string
  exerciseId: string
  exerciseTitle: string
  score: number
  studentId: string
  submissionId: string
  type: string
}

export const useGetGradeStudent = ({ courseId, userId }: Params) => {
  return useQuery<
    AxiosResponse<GradeStudent[]>,
    AxiosError<AxiosResponseError>
  >({
    queryKey: ['grade', courseId, userId],
    queryFn: async () => {
      return await callAPI(
        `/exercises/all-submission/user/${userId}` as Path,
        'get',
        {
          params: {
            courseId,
          },
        },
      )
    },
  })
}
