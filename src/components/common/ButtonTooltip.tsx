import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps,
} from '@mui/material'

interface Props {
  buttonProps?: ButtonProps
  iconButtonProps?: IconButtonProps
  isIconButton?: boolean
  tooltipProps: Omit<TooltipProps, 'children'>
}

export const ButtonTooltip = ({
  buttonProps,
  iconButtonProps,
  isIconButton = false,
  tooltipProps,
}: Props) => {
  return (
    <Tooltip {...tooltipProps} arrow>
      {isIconButton ? (
        <IconButton {...iconButtonProps} />
      ) : (
        <Button {...buttonProps} />
      )}
    </Tooltip>
  )
}
