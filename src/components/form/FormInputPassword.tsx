import { MouseEventHandler, useState } from 'react'
import { Path } from 'react-hook-form'

import { FormInput, TFormInputProps } from './FormInput'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'

export const FormInputPassword = <TData extends object>({
  control,
  label = 'Password',
  name,
  placeholder = 'Enter your password',
}: TFormInputProps<TData>) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword: MouseEventHandler<
    HTMLButtonElement
  > = event => {
    event.preventDefault()
  }

  return (
    <FormInput
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      control={control}
      label={label}
      name={name as Path<TData>}
      placeholder={placeholder}
      required
      type={showPassword ? 'text' : 'password'}
    />
  )
}
