import { SplitLayout } from '@/components'

import { CodeConsole } from './right-panel/CodeConsole'

const CodeEditorContainer = () => {
  return (
    <div className="h-screen">
      <SplitLayout>
        <div
          style={{
            width: '40%',
          }}
        >
          left panel
        </div>
        <div
          style={{
            width: '60%',
            minWidth: '0',
          }}
        >
          <SplitLayout mode="vertical">
            <div
              style={{
                height: '70%',
              }}
            >
              <CodeConsole />
            </div>

            <div
              style={{
                height: '30%',
              }}
            >
              Test case
            </div>
          </SplitLayout>
        </div>
      </SplitLayout>
    </div>
  )
}

export default CodeEditorContainer
