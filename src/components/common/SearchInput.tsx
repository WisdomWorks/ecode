import { cn } from '@/utils'

import { Search } from '@mui/icons-material'
import { IconButton, TextField, TextFieldProps } from '@mui/material'

type Props = TextFieldProps

export const SearchInput = ({
  className,
  label = 'Search something',
  onChange,
  type = 'text',
  value,
  variant = 'outlined',
  ...rest
}: Props) => {
  return (
    <div className={cn('flex flex-col w-full', className)}>
      <span className="text-sm font-bold">{label}</span>
      <TextField
        {...rest}
        InputProps={{
          endAdornment: (
            <IconButton className="h-full rounded-l-none rounded-r-lg bg-primary-500 px-3 text-white">
              <Search />
            </IconButton>
          ),
        }}
        className={cn('[&_.MuiInputBase-root]:pr-0', className)}
        fullWidth
        onChange={onChange}
        type={type}
        value={value}
        variant={variant}
      />
    </div>
  )
}
