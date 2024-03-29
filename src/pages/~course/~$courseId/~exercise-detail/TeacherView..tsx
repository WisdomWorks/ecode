import { useGetExerciseDetailForTeacher } from '@/apis'

import { CreateExercise } from '../~exercise/CreateExercise'

interface Props {
  exerciseId: string
}

export const TeacherView = ({ exerciseId }: Props) => {
  const { data, isLoading, isRefetching } = useGetExerciseDetailForTeacher({
    exerciseId,
  })
  const exercise = data?.data

  if (isLoading || isRefetching) return null
  const { topicId, type } = exercise

  return (
    <CreateExercise
      exercise={exercise}
      exerciseType={type}
      isUpdate
      topicId={topicId}
    />
  )
}
