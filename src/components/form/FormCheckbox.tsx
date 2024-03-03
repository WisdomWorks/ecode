import { useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, FormControl, FormControlLabel } from '@mui/material'

interface Props<TForm extends object> extends UseControllerProps<TForm> {
  label?: string
}

export const FormCheckbox = <TForm extends object>({
  control,
  label,
  name,
}: Props<TForm>) => {
  const {
    field: { onChange, value },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <FormControl>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} />}
        label={label}
        name={name}
      />
    </FormControl>
  )
}
