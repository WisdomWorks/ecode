import { ExerciseType } from '@/constants'
import { CreateCodeExercise } from '@/pages/~course/components'

interface Props {
  exerciseType: ExerciseType | string
}

export const CreateExercise = ({ exerciseType }: Props) => {
  if (exerciseType === ExerciseType.CODE) {
    return <CreateCodeExercise />
  }

  return (
    <div>
      <h1>CreateExercise</h1>
    </div>
  )
}
