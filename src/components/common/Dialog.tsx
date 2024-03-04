import { cn } from '@/utils'

import { Modal, ModalProps } from '@mui/material'

interface Props extends ModalProps {
  variant?: 'confirm'
}

export const Dialog = ({ children, className, variant, ...rest }: Props) => {
  return (
    <Modal {...rest}>
      <div
        className={cn(
          'absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-white p-6 shadow-xl',
          className,
          { 'w-1/4': variant === 'confirm' },
        )}
      >
        {children}
      </div>
    </Modal>
  )
}
