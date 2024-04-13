import { ReactNode } from 'react'
import { useController, UseControllerProps, useWatch } from 'react-hook-form'

import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material'

interface Props<TForm extends object> extends UseControllerProps<TForm> {
  options: { label: ReactNode; value: string }[] & CheckboxProps
}

export const FormCheckboxGroup = <TForm extends object>({
  control,
  name,
  options,
}: Props<TForm>) => {
  const {
    field: { onChange, ref, value },
  } = useController<TForm>({
    name,
    control,
  })

  const checkboxIds = useWatch({ control, name: name })

  const handleChange = (value: string) => {
    const newArray = [...checkboxIds] as string[]
    const item = value

    //Ensure array isnt empty
    if (newArray.length > 0) {
      //Attempt to find an item in array with matching id
      const index = newArray.findIndex(x => x === item)

      // If theres no match add item to the array

      if (typeof item === 'string') {
        if (index === -1) {
          newArray.push(item)
        } else {
          //If there is a match and the value is empty, remove the item from the array
          newArray.splice(index, 1)
        }
      }
    } else {
      //If the array is empty, add the item to the array
      newArray.push(item)
    }

    //Overwrite existing array with newArray}
    onChange(newArray)
  }

  const isChecked = (valueOption: string) => {
    const valueArray = Array.isArray(value) ? value : ([value] as string[])
    return valueArray.includes(valueOption)
  }

  return (
    <FormControl>
      <FormGroup>
        {options.map((option, index) => (
          <FormGroup key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked(option.value)}
                  inputRef={ref}
                  onChange={() => handleChange(option.value)}
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
