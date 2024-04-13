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
            <IconButton className="h-full rounded-l-none rounded-r-lg bg-transparent px-3">
              <Search />
            </IconButton>
          ),
        }}
        className={cn('[&_.MuiInputBase-root]:pr-0', className)}
        fullWidth
        inputProps={{
          className: 'p-0 px-5 py-3',
        }}
        onChange={onChange}
        placeholder="Search"
        type={type}
        value={value}
        variant={variant}
      />
    </div>
  )
}
