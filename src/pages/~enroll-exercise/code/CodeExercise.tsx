import { Panel, PanelGroup } from 'react-resizable-panels'

import { ResizeHandle } from '@/components/layout'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { CodeConsole } from './components/CodeConsole'
import { TestCases } from './components/TestCases'
import { Topic } from './components/Topic'
import { useState } from 'react'

interface Props {
  exercise: CodeExerciseSchema
  isTimeOut: boolean
}

export const CodeExercise = ({ exercise, isTimeOut }: Props) => {
  const { description, testCases } = exercise
  const [testResult, setTestResult] = useState()
  const [currentTab, setCurrentTab] = useState(0)

  const getTestResult = (result: any) => {
    if (result?.status != 'IE' && result?.status != 'CE') {
      setTestResult(result?.testCases)
    } else {
      setTestResult(result)
    }
  }

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={40}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={60} minSize={60}>
            <Topic topic={description} />
          </Panel>

          <ResizeHandle direction="vertical" />

          <Panel defaultSize={40}>
            <TestCases
              testCases={testCases}
              testResult={testResult}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </Panel>
        </PanelGroup>
      </Panel>
      <ResizeHandle />

      <Panel defaultSize={60} minSize={40}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={80} minSize={80}>
            <CodeConsole
              exercise={exercise}
              getTestResult={getTestResult}
              setCurrentTab={setCurrentTab}
            />
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
