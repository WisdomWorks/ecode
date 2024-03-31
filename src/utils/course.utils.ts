import { ExerciseType } from '@/constants'

import { TOptionCreateExercise } from '../types/exercise.types'
import { CodeRounded, MenuBookRounded, QuizRounded } from '@mui/icons-material'
import { isAfter } from 'date-fns'

export const optionsCreateExercise: TOptionCreateExercise[] = [
  {
    title: 'Create Quiz Exercise',
    description: 'In-depth written responses, ideal for critical thinking',
    Icon: QuizRounded,
    type: ExerciseType.QUIZ,
  },
  {
    title: 'Create Code Exercise',
    description:
      'Comprehension assessment with multiple-choice or short answers',
    Icon: CodeRounded,
    type: ExerciseType.CODE,
  },
  {
    title: 'Create Essay Exercise',
    description:
      'Comprehension assessment with multiple-choice or short answers',
    Icon: MenuBookRounded,
    type: ExerciseType.ESSAY,
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
