import { Panel, PanelGroup } from 'react-resizable-panels'

import { ResizeHandle } from '@/components/layout'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { CodeConsole } from './components/CodeConsole'
import { TestCases } from './components/TestCases'
import { Topic } from './components/Topic'

interface Props {
  exercise: CodeExerciseSchema
  isTimeOut: boolean
}

export const CodeExercise = ({ exercise, isTimeOut }: Props) => {
  console.log('exercise', exercise)

  const { description, testCases } = exercise

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={40}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={60} minSize={60}>
            <Topic topic={description} />
          </Panel>

          <ResizeHandle direction="vertical" />

          <Panel defaultSize={40}>
            <TestCases testCases={testCases} />
          </Panel>
        </PanelGroup>
      </Panel>
      <ResizeHandle />

      <Panel defaultSize={60} minSize={40}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={80} minSize={80}>
            <CodeConsole exercise={exercise} />
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
