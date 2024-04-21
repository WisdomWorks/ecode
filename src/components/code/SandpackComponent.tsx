import { autocompletion } from '@codemirror/autocomplete'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackStack,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react'
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import { SandpackFileExplorer } from 'sandpack-file-explorer'

interface Props {
  template?: SandpackPredefinedTemplate
}

export const SandpackComponent = ({ template = 'vanilla' }: Props) => {
  return (
    <SandpackProvider
      options={{
        recompileMode: 'delayed',
        initMode: 'user-visible',
      }}
      template={template}
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
          </SandpackLayout>
        </SandpackStack>
      </SandpackThemeProvider>
    </SandpackProvider>
  )
}
