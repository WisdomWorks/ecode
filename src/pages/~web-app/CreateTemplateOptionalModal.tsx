import { Dispatch, SetStateAction } from 'react'

import { Dialog } from '@/components/common'
import { templateOptions } from '@/utils/course.utils'

import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import { ArrowForwardRounded } from '@mui/icons-material'
import { Button } from '@mui/material'

interface Props {
  isOpen: boolean
  setTemplate?: Dispatch<SetStateAction<SandpackPredefinedTemplate | null>>
  toggleModal: () => void
}

export const CreateTemplateOptionalModal = ({
  isOpen,
  setTemplate,
  toggleModal,
}: Props) => {
  const handleClickOption = (type: SandpackPredefinedTemplate) => {
    toggleModal()
    setTemplate?.(type)
  }

  return (
    <Dialog
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return
        toggleModal()
      }}
      open={isOpen}
    >
      <>
        <h3>Choose the template: </h3>
        {templateOptions.map((option, index) => {
          const { Icon, description, title, type } = option

          return (
            <Button
              className="mt-3 flex w-full cursor-pointer items-center justify-between gap-4 rounded-l border border-solid border-primary-200 bg-primary-100 px-5 py-3 text-left shadow-xs transition-all hover:bg-primary-250"
              key={index}
              onClick={() => handleClickOption(type)}
            >
              <div className="flex items-center gap-4">
                <Icon className="size-28 text-black" />
                <div>
                  <h4 className="text-lg text-neutral-800">{title}</h4>
                  <p className="mt-1 text-sm text-neutral-700">{description}</p>
                </div>
              </div>
              <ArrowForwardRounded className="size-7 rounded-full border border-solid border-primary-500 bg-white text-primary-500" />
            </Button>
          )
        })}
      </>
    </Dialog>
  )
}
