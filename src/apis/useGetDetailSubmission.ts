import { AxiosResponseError, callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export interface GetDetailSubmissionProps {
  submissionId: string
  type: string
}

export interface GetDetailSubmissionResponse {
  exercise: Exercise
  submissions: CodeSubmissions | Submissions
}

interface Submissions {
  dateGrade: string
  dateSubmit: string
  exerciseId: string
  fileUrl: string
  reviewable: boolean
  score: number
  studentId: string
  submission: QuizSubmission[] | string
  submissionId: string
  teacherComment: string
}
export interface QuizSubmission {
  answers: Answer[]
  questionId: string
  quizAnswerId: string
}

interface Answer {
  choiceId: string
  content: string
}

interface Exercise {
  allowedLanguageIds: string[]
  createdDate: string
  description: string
  durationTime: number
  endTime: string
  exerciseDescription: string
  exerciseId: string
  exerciseName: string
  key: string
  points: number
  publicGroupIds: string[]
  question: string
  questions: Question[]
  reAttempt: number
  showAll: boolean
  startTime: string
  testCases?: TestCase[]
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

export interface TestCase {
  exerciseId: string
  input: string
  output: string
  points: number
  testcaseId: string
}

export interface CodeSubmissions {
  casePoints: number
  caseTotal: number
  currentTestcase: number
  dateGrade: string
  dateSubmit: string
  error: string
  exerciseId: string
  fileUrl: string
  graded: boolean
  judgeService: string
  judgedOn: string
  languageId: string
  locked: boolean
  lockedAfter: number[]
  longStatus: string
  memory: number
  pretested: boolean
  result: string
  reviewable: boolean
  score: number | null
  shortStatus: string
  source: string
  status: string
  studentId: string
  submission: null
  submissionId: string
  teacherComment: string
  time: number
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
