import { useCallback } from 'react'

import { usePreviewExercise } from '@/apis'
import { Loading } from '@/components/common'

import { useCourseContext } from '../../context/course.context'
import { ArrowBackIos } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'

interface Props {
  exerciseId: string
}
export const StudentView = ({ exerciseId }: Props) => {
  const { course } = useCourseContext()

  const { courseId } = useParams({ from: '/course/$courseId/' })
  const navigate = useNavigate()

  const { data, isLoading } = usePreviewExercise({ exerciseId })

  const handleBack = useCallback(() => {
    navigate({
      to: '/course/$courseId',
      params: { courseId },
      state(prev) {
        return { ...prev, tab: 1 }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading) return <Loading />

  const exercise = data?.data

  if (!exercise) return null

  console.log('exercise', course)

  const { durationTime, endTime, exerciseName, startTime, type } = exercise

  return (
    <div>
      <div className="flex w-full justify-start">
        <Button onClick={handleBack} variant="text">
          <ArrowBackIos className="size-4" />
          Back to Exercise
        </Button>
      </div>

      <div className="mt-3 flex flex-col gap-4">
        <h1>{exerciseName}</h1>
        <p>Start: {startTime}</p>
        <p>End: {endTime}</p>
        <p>Duration: {durationTime} minutes</p>
        <p>Type: {type}</p>
      </div>
    </div>
  )
}
