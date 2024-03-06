import { useState } from 'react'

import { ExerciseType } from '@/constants'
import { useToggle } from '@/hooks'

import { CreateExercise } from './CreateExercise'
import { CreateExerciseOptionModal } from './CreateExerciseOptionalModal'
import { Button } from '@mui/material'

export const Exercise = () => {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null)
  const [openModalCreateExercise, toggleModalCreateExercise] = useToggle()

  if (exerciseType)
    return (
      <CreateExercise
        exerciseType={exerciseType}
        setExerciseType={setExerciseType}
      />
    )

  return (
    <div>
      Exercise
      <Button onClick={toggleModalCreateExercise}>Create Exercise</Button>
      <CreateExerciseOptionModal
        isOpen={openModalCreateExercise}
        setExerciseType={setExerciseType}
        toggleModal={toggleModalCreateExercise}
      />
    </div>
  )
}
