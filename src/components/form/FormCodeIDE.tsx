import { Controller, UseControllerProps } from 'react-hook-form'

import { CodeIDE } from '../code/CodeIDE'
import { ReactCodeMirrorProps } from '@uiw/react-codemirror'

type Props<TForm extends object> = ReactCodeMirrorProps &
  UseControllerProps<TForm> & {
    themeCodeEditor?: string
  }

export const FormCodeIDE = <TForm extends object>({
  control,
  editable,
  name,
  themeCodeEditor,
}: Props<TForm>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <CodeIDE
          editable={editable}
          onChange={onChange}
          themeCodeEditor={themeCodeEditor}
          value={value}
        />
      )}
    />
  )
}
