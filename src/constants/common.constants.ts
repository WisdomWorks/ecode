import { TLanguage } from '@/types'
import { uuid } from '@/utils'

export enum ExerciseType {
  CODE = 'CODE',
  ESSAY = 'ESSAY',
  QUIZ = 'QUIZ',
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
