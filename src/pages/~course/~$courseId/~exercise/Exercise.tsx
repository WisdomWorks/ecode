import { useState } from 'react'

import { ExerciseType } from '@/constants'

import { TopicContainer } from '../TopicContainer'
import { CreateExercise } from './CreateExercise'

export const Exercise = () => {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null)
  const [topicIdForExercise, setTopicIdForExercise] = useState<string>('')

  if (exerciseType)
    return (
      <CreateExercise
        exerciseType={exerciseType}
        setExerciseType={setExerciseType}
        topicId={topicIdForExercise}
      />
    )

  return (
    <div>
      <TopicContainer
        setExerciseType={setExerciseType}
        setTopicIdForExercise={setTopicIdForExercise}
        variant="exercise"
      />
    </div>
  )
}
