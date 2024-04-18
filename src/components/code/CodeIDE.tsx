import { cn } from '@/utils'

import { java } from '@codemirror/lang-java'
import CodeMirror, {
  BasicSetupOptions,
  EditorView,
  Extension,
  ReactCodeMirrorProps,
} from '@uiw/react-codemirror'

interface Props extends ReactCodeMirrorProps {
  themeCodeEditor?: string
}

const basicSetup: BasicSetupOptions = {}
const extensions: Extension[] = [java(), EditorView.lineWrapping]

export const CodeIDE = ({
  className,
  onChange,
  themeCodeEditor,
  value,
  ...rest
}: Props) => {
  return (
    <>
      <CodeMirror
        {...rest}
        basicSetup={basicSetup}
        className={cn('h-full overflow-auto text-sm', className)}
        extensions={extensions}
        onChange={onChange}
        theme={themeCodeEditor as ReactCodeMirrorProps['theme']}
        value={value}
      />
    </>
  )
}
