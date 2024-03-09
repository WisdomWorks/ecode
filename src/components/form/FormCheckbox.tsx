import { useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, FormControl, FormControlLabel } from '@mui/material'

interface Props<TForm extends object> extends UseControllerProps<TForm> {
  extraOnChange?: () => void
  label?: string
}

export const FormCheckbox = <TForm extends object>({
  control,
  extraOnChange,
  label,
  name,
}: Props<TForm>) => {
  const {
    field: { onChange, value },
  } = useController<TForm>({
    name,
    control,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (...args: any[]) => {
    onChange(...args)
    extraOnChange?.()
  }

  return (
    <FormControl>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={handleChange} />}
        label={label}
        name={name}
        onChange={extraOnChange}
      />
    </FormControl>
  )
}
