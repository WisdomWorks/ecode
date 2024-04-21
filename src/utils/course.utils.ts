import { TGetTestCaseRunCode } from '@/apis'
import { HtmlIcon, ReactIcon } from '@/components/common/icons'
import { ExerciseType, testCaseStatus } from '@/constants'

import { TOptionCreateExercise, TOptionTemplate } from '../types/exercise.types'
import {
  CodeRounded,
  InsertDriveFileRounded,
  MenuBookRounded,
  QuizRounded,
} from '@mui/icons-material'
import { isAfter } from 'date-fns'

export const optionsCreateExercise: TOptionCreateExercise[] = [
  {
    title: 'Create Quiz Exercise',
    description:
      'Comprehension assessment with multiple-choice or short answers ',
    Icon: QuizRounded,
    type: ExerciseType.QUIZ,
  },
  {
    title: 'Create Code Exercise',
    description: 'Automated code assessment with test cases and feedback',
    Icon: CodeRounded,
    type: ExerciseType.CODE,
  },
  {
    title: 'Create Essay Exercise',
    description: 'In-depth written responses, ideal for critical thinking',
    Icon: MenuBookRounded,
    type: ExerciseType.ESSAY,
  },
  {
    title: 'Create File Exercise',
    description: 'Submission as a file',
    Icon: InsertDriveFileRounded,
    type: ExerciseType.FILE,
  },
]

export const templateOptions: TOptionTemplate[] = [
  {
    title: 'Vanilla Template',
    description:
      'Web application with HTML, CSS, and JavaScript. No frameworks or libraries',
    Icon: HtmlIcon,
    type: 'static',
  },
  {
    title: 'ReactJS Template',
    description: 'Web application with ReactJS',
    Icon: ReactIcon,
    type: 'react',
  },
]

export enum CreateCodeOption {
  Manually = 'Manually',
  Template = 'Template',
}

export enum MaterialType {
  File = 'file',
  Url = 'string',
}

export const checkIsOnGoing = (startTime: string, endTime: string) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const now = new Date()

  return isAfter(now, start) && isAfter(end, now)
}

export const getTestCaseStatus = (
  testResult?: TGetTestCaseRunCode | null,
  currentCase?: number,
) => {
  if (!testResult) return ''

  if (['CE', 'IE'].includes(testResult.status)) {
    return testCaseStatus[testResult.status]
  }

  if (typeof currentCase === 'number' && currentCase >= 0) {
    const status = testResult.testCases.at(currentCase)?.status
    if (status) return testCaseStatus[status]
  }

  return ''
}
