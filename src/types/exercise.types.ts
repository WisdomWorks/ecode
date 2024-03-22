import { ExerciseType } from '@/constants'
import { CreateCodeOption } from '@/utils/course.utils'

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
