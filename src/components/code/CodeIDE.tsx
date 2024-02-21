import { cn } from '@/utils'

import { java } from '@codemirror/lang-java'
import CodeMirror, {
  BasicSetupOptions,
  EditorView,
  Extension,
} from '@uiw/react-codemirror'

interface Props {
  className?: string
  onChange?: (value: string) => void
  value: string
}

const basicSetup: BasicSetupOptions = {}
const extensions: Extension[] = [java(), EditorView.lineWrapping]

export const CodeIDE = ({ className, onChange, value }: Props) => {
  return (
    <>
      <CodeMirror
        basicSetup={basicSetup}
        className={cn('h-full overflow-auto', className)}
        editable
        extensions={extensions}
        onChange={onChange}
        theme="dark"
        value={value}
      />
    </>
  )
}
