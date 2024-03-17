import { ReactNode } from 'react'

import { Dialog } from './Dialog'
import { Button } from '@mui/material'

interface Props {
  description?: ReactNode
  isOpen: boolean
  onClose?: () => void
  onConfirm: () => void
  title?: string
}

export const ConfirmModal = ({
  description,
  isOpen,
  onClose,
  onConfirm,
  title,
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
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
