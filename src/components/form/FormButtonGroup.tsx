import { cn } from '@/utils'

import { Button, ButtonProps } from '@mui/material'

type TButton = ButtonProps & {
  isShow?: boolean
  label?: string
}

type Props = {
  buttons: TButton[]
  className?: string
}

export const FormButtonGroup = ({ buttons, className }: Props) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {buttons.map((button, index) => {
        const {
          className,
          isShow = true,
          label,
          onClick,
          type,
          ...rest
        } = button
        if (!isShow) return null

        return (
          <Button
            {...rest}
            className={className}
            key={index}
            onClick={onClick}
            type={type}
          >
            {label || ''}
          </Button>
        )
      })}
    </div>
  )
}
