import { CodeExerciseSchema } from '@/types/exercise.types'

interface Props {
  testCases: CodeExerciseSchema['testCases']
}

export const TestCases = ({ testCases }: Props) => {
  return (
    <div>
      {testCases.map((testCase, index) => (
        <div key={index}>
          <div>{testCase.input}</div>
          <div>{testCase.output}</div>
        </div>
      ))}
    </div>
  )
}
