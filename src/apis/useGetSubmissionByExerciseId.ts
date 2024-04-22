import { callAPI, Path } from './axios'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

interface Props {
  exerciseId: string
  groupFilter: string[]
  type: string
}

export interface TStudentSubmissionResponse {
  exerciseId: string
  groups: Group[] | null
  report: ReportSubmissionResponse
  submissions: Submissions[]
}

export interface Submissions {
  groups: Group[]
  name: string
  submission: CodeSubmission
  testCases: TestCase[]
  userId: string
  userName: string
}

export interface CodeSubmission {
  casePoints: number
  caseTotal: number
  currentTestcase: number
  dateGrade: string
  dateSubmit: string
  error: string
  exerciseId: string
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
  score: number
  shortStatus: string
  source: string
  status: string
  studentId: string
  submissionId: string
  teacherComment: string
  time: number
}

interface TestCase {
  extendedFeedback: string
  feedback: string
  id: string
  memory: number
  output: string
  points: number
  status: string
  submissionId: string
  testCaseId: number
  time: number
  total: number
}

export interface ReportSubmissionResponse {
  ascore: number
  bscore: number
  cscore: number
  numberStudent: number
  numberSubmission: number
}

export interface Group {
  courseId: string
  createDate: string
  groupId: string
  groupName: string
  updateDate: string
}

export const useGetSubmissionByExerciseId = ({
  exerciseId,
  groupFilter,
  type,
}: Props) => {
  return useQuery<AxiosResponse<TStudentSubmissionResponse>, AxiosError>({
    queryKey: ['submission', exerciseId],
    queryFn: async () => {
      return await callAPI(
        `/exercises/${exerciseId}/all-submission` as Path,
        'get',
        {
          params: {
            type,
            groupFilter,
          },
        },
      )
    },
  })
}
