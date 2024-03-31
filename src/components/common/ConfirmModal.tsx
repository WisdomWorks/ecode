import { ReactNode } from 'react'

import { cn } from '@/utils'

import { Dialog } from './Dialog'
import { Button } from '@mui/material'

interface Props {
  description?: ReactNode
  disableButton?: boolean
  isOpen: boolean
  onClose?: () => void
  onConfirm: () => void
  title?: string
  variant?: 'confirm' | 'delete'
}

export const ConfirmModal = ({
  description,
  disableButton,
  isOpen,
  onClose,
  onConfirm,
  title,
  variant = 'delete',
}: Props) => {
  return (
    <Dialog onClose={onClose} open={isOpen} variant="confirm">
      <div className="">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-base">{description}</p>
        <div className="mt-4 flex justify-end gap-2">
          {onClose && (
            <Button
              className="rounded-lg bg-gray-500 px-4 py-2 text-white"
              disabled={disableButton}
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button
            className={cn('rounded-lg bg-red-500 px-4 py-2 text-white', {
              'bg-primary-500': variant === 'confirm',
            })}
            disabled={disableButton}
            onClick={onConfirm}
          >
            {variant === 'delete' ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
