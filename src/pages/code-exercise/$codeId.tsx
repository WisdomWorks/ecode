import { Panel, PanelGroup } from 'react-resizable-panels'

import { ResizeHandle } from '@/components/layout/ResizeHandle'

import { CodeConsole } from './@components/CodeConsole'
import { Topic } from './@components/Topic'
import { createFileRoute } from '@tanstack/react-router'

const TOPIC =
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.'

const CodeEditorContainer = () => {
  console.log(Route.useParams())

  return (
    <PanelGroup className="h-screen" direction="horizontal">
      <Panel defaultSize={40}>
        <Topic topic={TOPIC} />
      </Panel>
      <ResizeHandle />

      <Panel defaultSize={60} minSize={40}>
        <PanelGroup direction="vertical">
          <Panel defaultSize={80} minSize={80}>
            <CodeConsole />
          </Panel>
          <ResizeHandle direction="vertical" />

          <Panel defaultSize={20}>Test case</Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}

export default CodeEditorContainer

export const Route = createFileRoute('/code-exercise/$codeId')({
  component: CodeEditorContainer,
})
