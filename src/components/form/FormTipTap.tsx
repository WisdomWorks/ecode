import { Controller, useController, UseControllerProps } from 'react-hook-form'

import { cn } from '@/utils'

import { TFormTipTap, TipTap } from '../tiptap/TipTap'

type Props<TForm extends object> = TFormTipTap &
  UseControllerProps<TForm> & {
    className?: string
    label?: string
    required?: boolean
  }

export const FormTipTap = <TForm extends object>({
  className,
  control,
  label,
  name,
  required,
  ...rest
}: Props<TForm>) => {
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <span className="text-sm font-bold">
        {label}
        {!!required && <span className="text-danger-500">*</span>}
      </span>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => {
          return <TipTap {...rest} onChange={onChange} />
        }}
      />
      {!!error?.message && <span className="textError">{error.message}</span>}
    </div>
  )
}
