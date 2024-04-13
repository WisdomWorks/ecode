import languagesJSON from '@/codee.language.json'
import { TLanguage } from '@/types'
import { uuid } from '@/utils'

export enum ExerciseType {
  CODE = 'code',
  ESSAY = 'essay',
  FILE = 'file',
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

export const programmingLanguages = languagesJSON.map(item => {
  const {
    fields: { common_name, ...rest },
    pk,
  } = item

  return {
    ID: pk,
    label: common_name,
    ...rest,
  }
})

export const testCaseStatus = {
  AC: 'Accepted',
  WA: 'Wrong Answer',
  TLE: 'Time Limit Exceeded',
  MLE: 'Memory Limit Exceeded',
  OLE: 'Output Limit Exceeded',
  IR: 'Invalid Return',
  RTE: 'Runtime Error',
  CE: 'Compile Error',
  IE: 'Internal Error',
  SC: 'Short Circuited',
  AB: 'Aborted',
}
