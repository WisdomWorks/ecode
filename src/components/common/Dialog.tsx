import { cn } from '@/utils'

import { Modal, ModalProps } from '@mui/material'

export const Dialog = ({ children, className, ...rest }: ModalProps) => {
  return (
    <Modal {...rest}>
      <div
        className={cn(
          'absolute left-1/2 top-1/2 flex w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-white p-6 shadow-xl',
          className,
        )}
      >
        {children}
      </div>
    </Modal>
  )
}
