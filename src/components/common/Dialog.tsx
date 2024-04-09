import { cn } from '@/utils'

import { Close } from '@mui/icons-material'
import { IconButton, Modal, ModalProps } from '@mui/material'

interface Props extends ModalProps {
  isShowCloseButton?: boolean
  variant?: 'confirm'
}

export const Dialog = ({
  children,
  className,
  isShowCloseButton,
  onClose,
  variant,
  ...rest
}: Props) => {
  return (
    <Modal {...rest} onClose={onClose}>
      <>
        <div
          className={cn(
            'absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-white p-6 shadow-xl',
            className,
            { 'w-fit': variant === 'confirm' },
          )}
        >
          {isShowCloseButton && (
            <div className="flex w-full justify-end">
              <IconButton onClick={e => onClose?.(e, 'escapeKeyDown')}>
                <Close />
              </IconButton>
            </div>
          )}
          {children}
        </div>
      </>
    </Modal>
  )
}
