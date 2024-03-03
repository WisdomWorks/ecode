import { useController, UseControllerProps } from 'react-hook-form'

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material'

interface Props<TForm extends object> extends UseControllerProps<TForm> {
  options: { label: string; value: string }[] & CheckboxProps
}

export const FormCheckboxGroup = <TForm extends object>({
  control,
  name,
  options,
}: Props<TForm>) => {
  const {
    field: { onChange, value },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <FormControl>
      <FormGroup>
        {options.map((option, index) => (
          <FormGroup key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  {...option}
                  checked={value === option.value}
                  name={option.value}
                  onChange={onChange}
                />
              }
              label={option.label}
            />
          </FormGroup>
        ))}
      </FormGroup>
    </FormControl>
  )
}
