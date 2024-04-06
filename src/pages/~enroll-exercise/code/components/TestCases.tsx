import { useState } from 'react'

import { TGetTestCaseRunCode } from '@/apis'
import { testcaseStatus } from '@/constants'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Check, Clear, DoubleArrowOutlined } from '@mui/icons-material'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import { Button, CircularProgress, Divider } from '@mui/material'

interface Props {
  currentTab: number
  loading: boolean
  setCurrentTab: (index: number) => void
  testCases: CodeExerciseSchema['testCases']
  testResult: TGetTestCaseRunCode | null
}

export const TestCases = ({
  currentTab,
  loading,
  setCurrentTab,
  testCases,
  testResult,
}: Props) => {
  const [currentInput, setCurrentInput] = useState(testCases[0].input)
  const [currentOutput, setCurrentOutput] = useState(testCases[0].output)
  const [currentCase, setCurrentCase] = useState(0)

  const handleChangeTestcase = (index: number) => {
    setCurrentCase(index)
    setCurrentInput(testCases[index].input)
    setCurrentOutput(testCases[index].output)
  }

  console.log(testResult)

  return (
    <div className="mx-1 h-full max-h-full overflow-y-auto rounded-md border border-gray-300">
      <div className="flex h-8  rounded-md bg-gray-100 px-3 py-1">
        <Button
          color="success"
          onClick={() => setCurrentTab(0)}
          startIcon={<VerifiedUserOutlinedIcon className="text-green-500" />}
          variant="text"
        >
          Test Case
        </Button>
        <Divider className="mx-3 bg-gray-100" orientation="vertical" />
        <Button
          color="success"
          onClick={() => setCurrentTab(1)}
          startIcon={<DoubleArrowOutlined className="text-green-500" />}
          variant="text"
        >
          Test result
        </Button>
        {loading && (
          <div className="ml-3 flex items-center">
            <CircularProgress color="inherit" size={15} />
          </div>
        )}
      </div>

      {!testResult && currentTab == 1 ? (
        <>
          <div className="flex size-full justify-center pt-5 text-gray-500">
            <p>You must run code first</p>
          </div>
        </>
      ) : (
        <>
          {currentTab != 0 && (
            <div className="ml-3 mt-3">
              <p
                className={`text-lg font-bold ${
                  testResult?.testCases[currentCase]?.status == 'AC'
                    ? 'text-green-500'
                    : ' text-red-500'
                }`}
              >
                {testResult?.status == 'IE' || testResult?.status == 'CE'
                  ? testcaseStatus[
                      testResult.status as keyof typeof testcaseStatus
                    ]
                  : testcaseStatus[
                      testResult?.testCases[currentCase]
                        ?.status as keyof typeof testcaseStatus
                    ]}
              </p>
              {testResult?.message && (
                <div className="my-3 mr-3 whitespace-pre-line rounded-sm bg-red-50 p-2 text-sm text-red-500">
                  {testResult.message}
                </div>
              )}
            </div>
          )}

          <div className="flex">
            {testCases.map((testCase, index) => (
              <div className="m-3" key={index}>
                <Button
                  className="rounded-lg px-3 py-1"
                  color={
                    currentTab == 0
                      ? 'success'
                      : testResult?.testCases[index]?.status == 'AC'
                        ? 'success'
                        : 'error'
                  }
                  onClick={() => handleChangeTestcase(index)}
                  startIcon={
                    currentTab != 0 &&
                    (testResult?.testCases[index]?.status == 'AC' ? (
                      <Check />
                    ) : (
                      <Clear />
                    ))
                  }
                  variant={currentCase == index ? 'outlined' : 'text'}
                >
                  Case {index + 1}
                </Button>
              </div>
            ))}
          </div>

          <div className=" m-4 flex-col">
            <p className=" font-bold">Input</p>
            <div className=" my-2 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
              {currentInput}
            </div>
          </div>
          <div className=" m-4 flex-col">
            <p className=" font-bold">Expected</p>
            <div className=" my-2 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
              {currentOutput}
            </div>
          </div>
          {currentTab != 0 && (
            <>
              <div className=" m-4 flex-col">
                <p className=" font-bold">Output</p>
                <div className=" my-2 min-h-9 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
                  {testResult?.testCases[currentCase]?.output}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
