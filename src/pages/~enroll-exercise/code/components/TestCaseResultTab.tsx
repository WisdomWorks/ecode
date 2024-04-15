import { TGetTestCaseRunCode } from '@/apis'
import { cn } from '@/utils'
import { getTestCaseStatus } from '@/utils/course.utils'

interface Props {
  currentCase: number
  testResult: TGetTestCaseRunCode | null
  usingAiGrading?: boolean
}

export const TestCaseResultTab = ({
  currentCase,
  testResult,
  usingAiGrading,
}: Props) => {
  if (!testResult)
    return (
      <div className="flex size-full justify-center pt-5 text-gray-500">
        <p>You must run code first</p>
      </div>
    )

  if (usingAiGrading) return null

  return (
    <div className="ml-3 mt-3">
      <p
        className={cn('text-lg font-bold text-red-500', {
          'text-green-500': testResult.testCases[currentCase]?.status === 'AC',
        })}
      >
        {getTestCaseStatus(testResult, currentCase)}
      </p>
      {testResult.message && (
        <div className="my-3 mr-3 whitespace-pre-line rounded-sm bg-red-50 p-2 text-sm text-red-500">
          {testResult.message}
        </div>
      )}
    </div>
  )
}
