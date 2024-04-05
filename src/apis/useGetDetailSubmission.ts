import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export interface GetDetailSubmissionProps {
  submissionId: string
  type: string
}

export interface GetDetailSubmissionResponse {
  exercise: Exercise
  submissions: Submissions
}

interface Submissions {
  answers: Answer[]
  dateGrade: string
  dateSubmit: string
  exerciseId: string
  questionId: string
  quizAnswerId: string
  reviewable: boolean
  score: number
  studentId: string
  submission: string
  submissionId: string
  teacherComment: string
}

interface Answer {
  choiceId: string
  content: string
}

interface Exercise {
  createdDate: string
  durationTime: number
  endTime: string
  exerciseDescription: string
  exerciseId: string
  exerciseName: string
  key: string
  publicGroupIds: string[]
  question: string
  questions: Question[]
  reAttempt: number
  showAll: boolean
  startTime: string
  topicId: string
  type: string
  updatedDate: string
}

interface Question {
  answers: Answer2[]
  choices: Choice[]
  description: string
  questionId: string
  title: string
}

interface Choice {
  choiceId: string
  content: string
}

interface Answer2 {
  choiceId: string
  content: string
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
