import { Controller, UseControllerProps } from 'react-hook-form'

import { TipTap } from '../tiptap/TipTap'

type Props<TForm extends object> = UseControllerProps<TForm>

export const FormTipTap = <TForm extends object>({
  control,
  name,
}: Props<TForm>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => {
        return <TipTap onChange={onChange} />
      }}
    />
  )
}
