import { cn } from '@/utils'

import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material'

export type OptionSelectProps<T> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean>,
  'renderInput'
> & {
  error?: boolean
  helperText?: string
  label?: string
  placeholder?: string
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode
  required?: boolean
}

export const OptionSelector = <T,>({
  blurOnSelect = true,
  className,
  defaultValue,
  error,
  helperText,
  label = 'Select Option',
  multiple = false,
  onBlur,
  onChange,
  options,
  placeholder = 'Select Option',
  required,
  value,
  ...props
}: OptionSelectProps<T>) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full [&_.MuiChip-root]:bg-success-500',
        className,
      )}
    >
      <span className="text-sm font-bold">
        {label}
        {!!required && <span className="text-danger-500">*</span>}
      </span>
      <Autocomplete
        {...props}
        blurOnSelect={blurOnSelect}
        className={className}
        defaultValue={defaultValue}
        fullWidth
        multiple={multiple}
        onBlur={onBlur}
        onChange={onChange}
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              className: 'text-sm disabled:bg-neutral-200 ',
            }}
            className="[&_.MuiInputBase-root]:rounded-xl"
            error={error}
            helperText={helperText}
            placeholder={placeholder}
          />
        )}
        value={value}
      />
    </div>
  )
}
