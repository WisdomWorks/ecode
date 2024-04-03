import { useState } from 'react'

import { ExerciseType } from '@/constants'

import { useCourseContext } from '../../context/course.context'
import { TopicContainer } from '../TopicContainer'
import { CreateExercise } from './CreateExercise'

export const Exercise = () => {
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null)
  const [topicIdForExercise, setTopicIdForExercise] = useState<string>('')
  const { refetchTopics } = useCourseContext()

  if (exerciseType)
    return (
      <CreateExercise
        exerciseType={exerciseType}
        refetchTopics={refetchTopics}
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
