import { useState } from 'react'

import { CodeExerciseSchema } from '@/types/exercise.types'

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import { Button } from '@mui/material'

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
    <div className="mx-1 h-full max-h-full overflow-y-auto rounded-md border border-gray-300">
      <div className="flex h-8 rounded-md bg-gray-100 px-3 pt-1">
        <VerifiedUserOutlinedIcon className=" mr-2 mt-1 text-lg text-green-500" />
        <p className="mb-3 text-base font-bold capitalize">
          {testCases.length} Pre Test Case
        </p>
      </div>
      <div className="flex">
        {testCases.map((testCase, index) => (
          <div className="m-3" key={index}>
            <Button
              className="rounded-lg px-3 py-1"
              color="success"
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
        <p className=" font-bold">Output</p>
        <div className=" my-2 whitespace-pre-line rounded-lg bg-gray-100 px-3 py-2">
          {currentOutput}
        </div>
      </div>
    </div>
  )
}
