import { FunctionComponent } from 'react'

import { ExerciseType } from '@/constants'

import { Schema, TGroup } from './api.types'
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface TOptionCreateExercise {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>
  description: string
  title: string
  type: ExerciseType
}

export interface TOptionTemplate {
  Icon:
    | OverridableComponent<SvgIconTypeMap<object, 'svg'>>
    | (FunctionComponent<React.SVGProps<SVGSVGElement>> & {
        title?: string | undefined
      })
  description: string
  title: string
  type: SandpackPredefinedTemplate
}

export interface TInput {
  dataType?: string
  dataValue: string
}

export interface TTestCase {
  inputs: TInput[]
  output: string
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
  createdDate?: string
  durationTime?: number
  exerciseId: string
  groups: Pick<TGroup, 'groupId' | 'groupName'>[]
  showAll: boolean
  type: string
}

export type EssayExerciseSchema = ExerciseSchema & {
  question: string
}

export type FileExerciseSchema = ExerciseSchema & {
  question: string
}

export type QuizExerciseSchema = Omit<
  Schema['CreateQuizExerciseRequest'],
  'questions'
> & {
  exerciseId?: string
  questions: (Schema['CreateQuizExerciseRequest']['questions'][number] & {
    isMultipleChoice?: boolean
  })[]
  type?: string
}

export type CodeExerciseSchema = Schema['CreateCodeExerciseRequest'] & {
  durationTime?: number
  exerciseId?: string
  languageId?: string
  languageTemplate?: {
    [key: string]: string
  }
  type?: string
}

export type TTopic = TopicSchema & {
  exercises: ExerciseSchema[]
  materials: MaterialSchema[]
}
