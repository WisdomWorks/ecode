import { useState } from 'react'

import { CodeExerciseSchema } from '@/types/exercise.types'
import { testcaseStatus } from '@/constants'

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import { Button, Divider } from '@mui/material'
import { DoubleArrowOutlined, Check, Clear } from '@mui/icons-material'
import { Loading } from '@/components/common'

interface Props {
  testCases: CodeExerciseSchema['testCases']
  testResult: any
  currentTab: number
  setCurrentTab: (index: number) => void
}

export const TestCases = ({
  testCases,
  testResult,
  currentTab,
  setCurrentTab,
}: Props) => {
  const [currentInput, setCurrentInput] = useState(testCases[0].input)
  const [currentOutput, setCurrentOutput] = useState(testCases[0].output)
  const [currentCase, setCurrentCase] = useState(0)
  // const [currentTab, setCurrentTab] = useState(0)

  const handleChangeTestcase = (index: number) => {
    setCurrentCase(index)
    setCurrentInput(testCases[index].input)
    setCurrentOutput(testCases[index].output)
  }

  console.log(testResult)
  return (
    <div className="mx-1 h-full max-h-full overflow-y-auto rounded-md border border-gray-300">
      <div className="flex h-8 rounded-md bg-gray-100 px-3 py-1">
        <Button
          variant="text"
          color="success"
          startIcon={<VerifiedUserOutlinedIcon className="text-green-500" />}
          onClick={() => setCurrentTab(0)}
        >
          Test Case
        </Button>
        <Divider className="bg-gray-100 mx-3" orientation="vertical" />
        <Button
          variant="text"
          color="success"
          startIcon={<DoubleArrowOutlined className="text-green-500" />}
          onClick={() => setCurrentTab(1)}
        >
          Test result
        </Button>
      </div>

      {!testResult && currentTab == 1 ? (
        <>
          <div className="flex w-full h-full justify-center pt-5 text-gray-500">
            <p>You must run code first</p>
          </div>
        </>
      ) : (
        <>
          {currentTab != 0 && (
            <div className="ml-3 mt-3">
              <p
                className={`font-bold text-lg ${
                  testResult[currentCase]?.status == 'AC'
                    ? 'text-green-500'
                    : ' text-red-500'
                }`}
              >
                {testResult?.status == 'IE' || testResult?.status == 'CE'
                  ? testcaseStatus[
                      testResult?.status as keyof typeof testcaseStatus
                    ]
                  : testcaseStatus[
                      testResult[currentCase]
                        ?.status as keyof typeof testcaseStatus
                    ]}
              </p>
              {testResult?.message && (
                <div className="whitespace-pre-line text-red-500 bg-red-50 text-sm rounded-sm p-2 mr-3 my-3">
                  {testResult?.message}
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
                      : testResult[currentCase]?.status == 'AC'
                        ? 'success'
                        : 'error'
                  }
                  startIcon={
                    currentTab != 0 &&
                    (testResult[currentCase]?.status == 'AC' ? (
                      <Check />
                    ) : (
                      <Clear />
                    ))
                  }
                  onClick={() => handleChangeTestcase(index)}
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
            <div className=" m-4 flex-col">
              <p className=" font-bold">Output</p>
              <div className=" my-2 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2 min-h-9">
                {testResult[currentCase]?.output}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
