import { SandpackView } from './SandpackView'
import { autocompletion } from '@codemirror/autocomplete'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackStack,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import { SandpackFileExplorer } from 'sandpack-file-explorer'

export const SandpackComponent = () => {
  return (
    <SandpackProvider
      options={{
        recompileMode: 'delayed',
        initMode: 'user-visible',
      }}
      template="vite-preact"
    >
      <SandpackThemeProvider theme={nightOwl}>
        <SandpackStack>
          <SandpackLayout className="h-screen">
            <SandpackFileExplorer />
            <SandpackCodeEditor
              className="h-screen"
              closableTabs
              extensions={[autocompletion()]}
              showInlineErrors
              showLineNumbers
              showTabs
              wrapContent
            />
            <SandpackPreview
              className="h-screen"
              showNavigator
              showOpenInCodeSandbox={false}
              showRestartButton={false}
            />
            <SandpackView />
          </SandpackLayout>
        </SandpackStack>
      </SandpackThemeProvider>
    </SandpackProvider>
  )
}
