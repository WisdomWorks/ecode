import { TGetTestCaseRunCode } from '@/apis'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Check, Clear } from '@mui/icons-material'
import { Button } from '@mui/material'

interface Props {
  currentCase: number
  currentTab: number
  handleChangeTestCase: (index: number) => void
  testCases: CodeExerciseSchema['testCases']
  testResult: TGetTestCaseRunCode | null
}

export const TestCaseList = ({
  currentCase,
  currentTab,
  handleChangeTestCase,
  testCases,
  testResult,
}: Props) => {
  return (
    <>
      <div className="flex">
        {testCases.map((_, index) => (
          <div className="m-3" key={index}>
            <Button
              className="rounded-lg px-3 py-1"
              color={
                currentTab === 0
                  ? 'success'
                  : testResult?.testCases.at(index)?.status === 'AC'
                    ? 'success'
                    : 'error'
              }
              onClick={() => handleChangeTestCase(index)}
              startIcon={
                currentTab !== 0 &&
                (testResult?.testCases.at(index)?.status === 'AC' ? (
                  <Check />
                ) : (
                  <Clear />
                ))
              }
              variant={currentCase === index ? 'outlined' : 'text'}
            >
              Case {index + 1}
            </Button>
          </div>
        ))}
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
