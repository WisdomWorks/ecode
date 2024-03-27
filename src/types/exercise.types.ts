import { ExerciseType } from '@/constants'
import { CreateCodeOption } from '@/utils/course.utils'

import { Schema, TGroup } from './api.types'
import { TLanguage } from './common.types'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface TOptionCreateExercise {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>
  description: string
  title: string
  type: ExerciseType
}

export interface TInput {
  dataType?: string
  dataValue: string
}

export interface TTestCase {
  inputs: TInput[]
  output: string
}

export interface TCreateCodeExerciseForm {
  createCodeOption: CreateCodeOption
  isSameInputDataType: boolean
  language: TLanguage | null
  mainFunctionName: string
  noOfParameters: number
  template: string
  templateFile: File | null
  testCase: TTestCase[]
  title: string
}

export type TopicSchema = Schema['CreateTopicRequest'] & {
  groups: Pick<TGroup, 'groupId' | 'groupName'>[]
  showAll: boolean
  topicId: string
}

export type MaterialSchema = Schema['CreateMaterialRequest'] & {
  groups: Pick<TGroup, 'groupId' | 'groupName'>[]
  materialId: string
  showAll: boolean
  storageUrl?: string
  topicId: string
}

export type ExerciseSchema = Schema['CreateEssayExerciseRequest'] & {
  exerciseId: string
  groups: Pick<TGroup, 'groupId' | 'groupName'>[]
  showAll: boolean
  type: string
}

export type EssayExerciseSchema = ExerciseSchema & {
  question: string
}

export type QuizExerciseSchema = Schema['CreateQuizExerciseRequest'] & {
  exerciseId?: string
}

export type TTopic = TopicSchema & {
  exercises: ExerciseSchema[]
  materials: MaterialSchema[]
}
