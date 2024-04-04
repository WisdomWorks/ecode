import { CodeExerciseSchema } from '@/types/exercise.types'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import { useState } from 'react'
import { Button } from '@mui/material'
import { set } from 'lodash'

interface Props {
  testCases: CodeExerciseSchema['testCases']
}

export const TestCases = ({ testCases }: Props) => {
  const [currentInput, setCurrentInput] = useState(testCases[0].input)
  const [currentOutput, setCurrentOutput] = useState(testCases[0].output)
  const [currentCase, setCurrentCase] = useState(0)

  const handleChangeTestcase = (index: number) => {
    setCurrentCase(index)
    setCurrentInput(testCases[index].input)
    setCurrentOutput(testCases[index].output)
  }

  return (
    <div className="rounded-md border border-gray-300 mx-1 h-full overflow-y-auto max-h-full">
      <div className="rounded-md bg-gray-100 px-3 pt-1 h-8 flex">
        <VerifiedUserOutlinedIcon className=" text-lg mr-2 mt-1 text-green-500" />
        <p className="mb-3 text-base font-bold capitalize">Testcase</p>
      </div>
      {testCases.map((testCase, index) => (
        <div key={index}>
          <div className="m-3">
            <Button
              variant={currentCase === index ? 'outlined' : 'outlined'}
              color="success"
              className="rounded-lg py-1 px-3"
              onClick={() => handleChangeTestcase(index)}
            >
              Case {index + 1}
            </Button>
          </div>
          <div className=" flex-col m-4">
            <p className=" font-bold">Input</p>
            <div className=" bg-gray-100 py-2 px-3 rounded-lg my-2">
              {currentInput}
            </div>
          </div>
          <div className=" flex-col m-4">
            <p className=" font-bold">Output</p>
            <div className=" bg-gray-100 py-2 px-3 rounded-lg my-2">
              {currentOutput}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
