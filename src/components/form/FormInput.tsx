import { ChangeEvent } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { cn } from '@/utils'

import { TextField, TextFieldProps } from '@mui/material'

export type TFormInputProps<TForm extends FieldValues> = TextFieldProps &
  UseControllerProps<TForm> & {
    extraOnchange?: (e: ChangeEvent<HTMLInputElement>) => void
  }

export const FormInput = <TForm extends FieldValues>({
  className,
  control,
  inputProps,
  label,
  name,
  placeholder = 'Enter something here...',
  required,
  type = 'text',
  ...rest
}: TFormInputProps<TForm>) => {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController<TForm>({
    name,
    control,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    rest.extraOnchange?.(e)
  }

  return (
    <div className={cn('flex flex-col w-full', className)}>
      <span className="text-sm font-bold">
        {label}
        {!!required && <span className="text-danger-500">*</span>}
      </span>
      <TextField
        {...rest}
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
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  )
}
