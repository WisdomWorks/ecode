import { CodeSubmission, GetDetailSubmissionResponse } from '@/apis'
import { CodeExercise } from '@/pages/~enroll-exercise/code/CodeExercise'
import { CodeExerciseSchema } from '@/types/exercise.types'

interface Props {
  exercise: GetDetailSubmissionResponse['exercise']
  submissions: CodeSubmission
}

export const DetailCode = ({ exercise, submissions }: Props) => {
  return (
    <CodeExercise
      exercise={exercise as CodeExerciseSchema}
      isTimeOut={false}
      isUpdate
      submissions={submissions}
    />
  )
}
