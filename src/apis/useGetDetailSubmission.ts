import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export interface GetDetailSubmissionProps {
  submissionId: string
  type: string
}

type GetDetailSubmissionResponse = {
  dateGrade: string
  dateSubmit: string
  exerciseId: string
  reviewable: boolean
  score: number
  studentId: string
  submission: string
  submissionId: string
  teacherComment: string
}

export const useGetDetailSubmission = ({
  submissionId,
  type,
}: GetDetailSubmissionProps) => {
  return useQuery<
    AxiosResponse<GetDetailSubmissionResponse>,
    AxiosError<AxiosResponseError>
  >({
    queryKey: ['get-detail-submission', submissionId],
    queryFn: async () => {
      return await callAPI(`/exercises/submit/${submissionId}` as Path, 'get', {
        params: {
          type,
        },
      })
    },
    enabled: !!submissionId && !!type,
  })
}
