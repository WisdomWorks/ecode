import { Controller, UseControllerProps } from 'react-hook-form'

import { CodeIDE } from '../code/CodeIDE'
import { ReactCodeMirrorProps } from '@uiw/react-codemirror'

type Props<TForm extends object> = ReactCodeMirrorProps &
  UseControllerProps<TForm>

export const FormCodeIDE = <TForm extends object>({
  control,
  editable,
  name,
}: Props<TForm>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <CodeIDE editable={editable} onChange={onChange} value={value} />
      )}
    />
  )
}
