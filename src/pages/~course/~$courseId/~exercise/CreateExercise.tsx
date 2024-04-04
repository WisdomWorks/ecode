import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'

import { ExerciseType } from '@/constants'
import {
  CodeExerciseSchema,
  EssayExerciseSchema,
  QuizExerciseSchema,
} from '@/types/exercise.types'

import { CreateCodeExercise } from './code/CreateCodeExercise'
import { CreateEssayExercise } from './essay/CreateEssayExercise'
import { CreateQuizExercise } from './quiz/CreateQuizExercise'
import { ArrowBackIos } from '@mui/icons-material'
import { Button } from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'

interface Props {
  exercise?: CodeExerciseSchema | EssayExerciseSchema | QuizExerciseSchema
  exerciseType: ExerciseType | string
  isUpdate?: boolean
  refetchTopics?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  setExerciseType?: Dispatch<SetStateAction<ExerciseType | null>>
  topicId: string
}

export const CreateExercise = ({
  exercise,
  exerciseType,
  isUpdate = false,
  refetchTopics,
  setExerciseType,
  topicId,
}: Props) => {
  const navigate = useNavigate()
  const { courseId } = useParams({ from: '/course/$courseId/' })

  const handleBack = useCallback(() => {
    if (setExerciseType && !isUpdate) {
      setExerciseType(null)
      refetchTopics?.()
      return
    }
    navigate({
      to: '/course/$courseId',
      params: { courseId },
      state(prev) {
        return { ...prev, tab: 1 }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Component = useMemo(() => {
    const commonProps = {
      topicId,
      setExerciseType,
      isUpdate,
      handleBack,
    }
    switch (exerciseType) {
      case ExerciseType.CODE:
        return (
          <CreateCodeExercise
            {...commonProps}
            exercise={exercise as CodeExerciseSchema}
          />
        )
      case ExerciseType.ESSAY:
        return (
          <CreateEssayExercise
            {...commonProps}
            exercise={exercise as EssayExerciseSchema}
          />
        )
      case ExerciseType.QUIZ:
        return (
          <CreateQuizExercise
            {...commonProps}
            exercise={exercise as QuizExerciseSchema}
          />
        )
      default:
        return null
    }
  }, [exercise, exerciseType, handleBack, isUpdate, setExerciseType, topicId])

  return (
    <>
      <div className="flex w-full justify-start">
        <Button onClick={handleBack} variant="text">
          <ArrowBackIos className="size-4" />
          Back to Exercise
        </Button>
      </div>
      {Component}
    </>
  )
}
