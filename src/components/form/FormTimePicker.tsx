import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { cn, HHmmss } from '@/utils'

import { TimePicker, TimePickerProps } from '@mui/x-date-pickers'

export type TFormTimePickerProps<TForm extends FieldValues> =
  TimePickerProps<TForm> &
    UseControllerProps<TForm> & {
      required?: boolean
    }

export const FormTimePicker = <TForm extends FieldValues>({
  className,
  control,
  label = 'Select Time',
  name,
  required,
  ...rest
}: TFormTimePickerProps<TForm>) => {
  const {
    field: { onChange, value },
    fieldState: { error: errorZod },
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
      <TimePicker
        {...rest}
        className={cn(
          'w-full [&_.MuiInputBase-root]:rounded-xl [&_.MuiFormHelperText-root]:text-danger-500',
          className,
        )}
        format={HHmmss}
        label=""
        name={name}
        onChange={onChange}
        slotProps={{
          textField: {
            helperText: errorZod?.message,
          },
        }}
        value={value}
      />
    </div>
  )
}
