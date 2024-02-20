import { Controller, UseControllerProps } from 'react-hook-form'

import { CodeIDE } from '../code/CodeIDE'

type Props<TForm extends object> = UseControllerProps<TForm>

export const FormCodeIDE = <TForm extends object>({
  control,
  name,
}: Props<TForm>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <CodeIDE onChange={onChange} value={value} />
      )}
    />
  )
}
