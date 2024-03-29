import { TCourse } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'

import { ChipProps } from '@mui/material'
import { differenceInDays, isAfter, isBefore } from 'date-fns'

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
    const diffDays = differenceInDays(startTimeObj, now)
    const label = diffDays === 0 ? 'Start today' : `Start in ${diffDays} days`

    return {
      color: 'info',
      label,
    }
  }

  if (isAfter(now, endTimeObj)) {
    const expiredDay = differenceInDays(now, endTimeObj)
    const label =
      expiredDay === 0 ? 'Expired today' : `Expired ${expiredDay} days`

    return {
      color: 'error',
      label,
    }
  }
  return {
    color: 'success',
    label: 'Ongoing',
  }
}
