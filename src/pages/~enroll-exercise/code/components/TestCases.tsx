import { useState } from 'react'

import { TGetTestCaseRunCode } from '@/apis'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { TestCaseList } from './TestCaseList'
import { TestCaseResultTab } from './TestCaseResultTab'
import { DoubleArrowOutlined } from '@mui/icons-material'
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
  const [currentCase, setCurrentCase] = useState(0)

  const handleChangeTestCase = (index: number) => {
    setCurrentCase(index)
  }

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

      {currentTab === 1 && (
        <TestCaseResultTab currentCase={currentCase} testResult={testResult} />
      )}

      <TestCaseList
        currentCase={currentCase}
        currentTab={currentTab}
        handleChangeTestCase={handleChangeTestCase}
        testCases={testCases}
        testResult={testResult}
      />
    </div>
  )
}
