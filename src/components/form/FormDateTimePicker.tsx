import { useMemo, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { cn, ddMMyyyyHHmm } from '@/utils'

import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'

export type TFormDateTimePickerProps<TForm extends FieldValues> =
  DateTimePickerProps<TForm> &
    UseControllerProps<TForm> & {
      required?: boolean
    }

export const FormDateTimePicker = <TForm extends FieldValues>({
  className,
  control,
  disablePast,
  label = 'Select Date',
  name,
  required,
  ...rest
}: TFormDateTimePickerProps<TForm>) => {
  const [error, setError] = useState<string | null>(null)
  const {
    field: { onChange, value },
    fieldState: { error: errorZod },
  } = useController({
    name,
    control,
  })

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'disablePast':
        return 'Past date is not allowed'

      default:
        break
    }
  }, [error])

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <span className="text-sm font-bold">
        {label}
        {!!required && <span className="text-danger-500">*</span>}
      </span>
      <DateTimePicker
        {...rest}
        className={cn(
          'w-full [&_.MuiInputBase-root]:rounded-xl [&_.MuiFormHelperText-root]:text-danger-500',
          className,
        )}
        disablePast={disablePast}
        format={ddMMyyyyHHmm}
        label=""
        name={name}
        onChange={onChange}
        onError={newError => setError(newError)}
        slotProps={{
          textField: {
            helperText: errorMessage || errorZod?.message,
          },
        }}
        value={value}
      />
    </div>
  )
}
