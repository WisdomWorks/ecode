import {
  CodeSubmission,
  GetDetailSubmissionResponse,
  ResultTestCase,
} from '@/apis'
import { CodeExercise } from '@/pages/~enroll-exercise/code/CodeExercise'
import { CodeExerciseSchema } from '@/types/exercise.types'

interface Props {
  exercise: GetDetailSubmissionResponse['exercise']
  resultTestCases?: ResultTestCase[]
  submissions: CodeSubmission
}

export const DetailCode = ({
  exercise,
  resultTestCases,
  submissions,
}: Props) => {
  return (
    <CodeExercise
      exercise={exercise as CodeExerciseSchema}
      isReview
      isTimeOut={false}
      resultTestCases={resultTestCases}
      submissions={submissions}
    />
  )
}
