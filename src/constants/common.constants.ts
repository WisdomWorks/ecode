import { TLanguage } from '@/types'
import { uuid } from '@/utils'

export enum ExerciseType {
  CODE = 'code',
  ESSAY = 'essay',
  QUIZ = 'quiz',
}

export const languages: TLanguage[] = [
  {
    ID: uuid(),
    label: 'Java',
  },
  {
    ID: uuid(),
    label: 'Javascript',
  },
  {
    ID: uuid(),
    label: 'Python',
  },
]

export const primitiveType = [
  'int',
  'short',
  'long',
  'float',
  'double',
  'byte',
  'char',
  'boolean',
  'String',
]
