import { Dispatch, SetStateAction, useMemo } from 'react'

import { ExerciseType } from '@/constants'

import { CreateCodeExercise } from './code/CreateCodeExercise'
import { CreateEssayExercise } from './essay/CreateEssayExercise'
import { CreateQuizExercise } from './quiz/CreateQuizExercise'
import { ArrowBackIos } from '@mui/icons-material'
import { Button } from '@mui/material'

interface Props {
  exerciseType: ExerciseType | string
  setExerciseType: Dispatch<SetStateAction<ExerciseType | null>>
}

export const CreateExercise = ({ exerciseType, setExerciseType }: Props) => {
  const Component = useMemo(() => {
    switch (exerciseType) {
      case ExerciseType.CODE:
        return <CreateCodeExercise />
      case ExerciseType.ESSAY:
        return <CreateEssayExercise />
      case ExerciseType.QUIZ:
        return <CreateQuizExercise />
      default:
        return null
    }
  }, [exerciseType])

  return (
    <>
      <div className="flex w-full justify-start">
        <Button onClick={() => setExerciseType(null)} variant="text">
          <ArrowBackIos className="size-4" />
          Back to Exercise
        </Button>
      </div>
      {Component}
    </>
  )
}
