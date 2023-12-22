import { cn } from '@/utils'

import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material'

export type OptionSelectProps<T extends object> = Omit<
  AutocompleteProps<T, false, false, false>,
  'renderInput'
> & {
  label?: string
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode
}

export const OptionSelector = <T extends object>({
  blurOnSelect = true,
  className,
  label = 'Select Option',
  options,
  onChange,
  onBlur,
  value,
  renderInput = params => <TextField {...params} label={label} />,
  ...props
}: OptionSelectProps<T>) => {
  return (
    <Autocomplete
      {...props}
      blurOnSelect={blurOnSelect}
      className={cn('bg-white', className)}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      renderInput={renderInput}
      value={value}
    />
  )
}
