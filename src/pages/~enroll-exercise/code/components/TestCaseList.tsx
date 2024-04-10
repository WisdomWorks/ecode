import { ResultTestCase, TGetTestCaseRunCode } from '@/apis'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Check, Clear } from '@mui/icons-material'
import { Button, ButtonProps } from '@mui/material'

interface Props {
  currentCase: number
  currentTab: number
  handleChangeTestCase: (index: number) => void
  isReview?: boolean
  resultTestCases?: ResultTestCase[]
  testCases: CodeExerciseSchema['testCases']
  testResult: TGetTestCaseRunCode | null
}

export const TestCaseList = ({
  currentCase,
  currentTab,
  handleChangeTestCase,
  isReview,
  resultTestCases,
  testCases,
  testResult,
}: Props) => {
  const testCasesFinalResult = isReview
    ? resultTestCases
    : testResult?.testCases

  const getButtonProps = (index: number) => {
    const nonReviewTab = currentCase === 0 && !isReview

    if (nonReviewTab) {
      return { color: 'success', Icon: undefined }
    }

    const isAC = testCasesFinalResult?.at(index)?.status === 'AC'
    return {
      color: isAC ? 'success' : 'error',
      Icon: isAC ? Check : Clear,
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 p-3">
        {testCases.map((tc, index) => {
          const props = getButtonProps(index)
          // eslint-disable-next-line react/prop-types
          const { Icon, color } = props
          return (
            <Button
              className="whitespace-nowrap rounded-lg px-3 py-1"
              color={color as ButtonProps['color']}
              key={tc.testcaseId}
              onClick={() => handleChangeTestCase(index)}
              startIcon={Icon ? <Icon /> : null}
              variant={currentCase === index ? 'outlined' : 'text'}
            >
              Case {index + 1} {isReview ? `(${tc.points} pts)` : ''}
            </Button>
          )
        })}
      </div>

      <div className=" m-4 flex-col">
        <p className=" font-bold">Input</p>
        <div className=" my-2 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
          {testCases.at(currentCase)?.input}
        </div>
      </div>
      <div className=" m-4 flex-col">
        <p className=" font-bold">Expected Ouput</p>
        <div className=" my-2 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
          {testCases.at(currentCase)?.output}
        </div>
      </div>
      {currentTab != 0 && (
        <>
          <div className=" m-4 flex-col">
            <p className=" font-bold">Stdout</p>
            <div className=" my-2 min-h-9 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
              {testResult?.testCases[currentCase]?.output}
            </div>
          </div>
        </>
      )}
    </>
  )
}
