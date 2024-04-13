import { TCourse } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'

import { formatDDMMyyyyHHmm } from './dates.utils'
import { ChipProps } from '@mui/material'
import { isAfter, isBefore } from 'date-fns'

export const getCourseLabel = (course?: TCourse) => {
  if (!course) return ''
  const { courseName, semester, teacher } = course

  let label = `${courseName} - ${semester}`
  label = teacher ? `${label} - ${teacher.username}` : label

  return label
}

export const getTimeExerciseLabel = (
  exercise: ExerciseSchema,
): {
  color: ChipProps['color']
  label: string
} => {
  const { endTime, startTime } = exercise

  const now = new Date()
  const startTimeObj = new Date(startTime)
  const endTimeObj = new Date(endTime)

  if (isBefore(now, startTimeObj)) {
    const label = `Start in ${formatDDMMyyyyHHmm(startTimeObj)}`

    return {
      color: 'info',
      label,
    }
  }

  if (isAfter(now, endTimeObj)) {
    const label = 'Expired'

    return {
      color: 'error',
      label,
    }
  }
  return {
    color: 'success',
    label: 'On going',
  }
}
