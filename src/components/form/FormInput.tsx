import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { cn } from '@/utils'

import { TextField, TextFieldProps } from '@mui/material'

type Props<TForm extends FieldValues> = TextFieldProps &
  UseControllerProps<TForm>

export const FormInput = <TForm extends FieldValues>({
  className,
  control,
  inputProps,
  label,
  name,
  placeholder = 'Enter something here...',
  required,
  type = 'text',
}: Props<TForm>) => {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <span className="text-sm font-bold">
        {label}
        {!!required && <span className="text-danger-500">*</span>}
      </span>
      <TextField
        className="[&_.MuiInputBase-root]:rounded-xl"
        error={!!error}
        fullWidth
        helperText={error?.message}
        inputProps={{
          className: 'text-sm disabled:bg-neutral-200',
          ...inputProps,
        }}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  )
}
