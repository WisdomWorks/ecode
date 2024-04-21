import { useState } from 'react'

import { SandpackComponent } from '@/components/code/SandpackComponent'
import { ButtonTooltip } from '@/components/common'
import { useToggle } from '@/hooks'
import { beforeLoadProtected } from '@/utils'

import { CreateTemplateOptionalModal } from './CreateTemplateOptionalModal'
import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react'
import { ChangeCircle } from '@mui/icons-material'
import { createFileRoute } from '@tanstack/react-router'

export const SandPackContainer = () => {
  const [template, setTemplate] = useState<SandpackPredefinedTemplate | null>(
    null,
  )
  const [open, toggleOpen] = useToggle(true)

  if (!template)
    return (
      <CreateTemplateOptionalModal
        isOpen={open}
        setTemplate={setTemplate}
        toggleModal={toggleOpen}
      />
    )

  return (
    <div className="h-full">
      <SandpackComponent template={template} />
      <ButtonTooltip
        iconButtonProps={{
          children: <ChangeCircle className="text-6xl" />,
          className:
            'absolute bottom-4 left-4 text-primary-400 hover:text-primary-500 hover:rotate-90 transition-all duration-300 ease-in-out',
          onClick: () => {
            setTemplate(null)
            toggleOpen()
          },
        }}
        isIconButton
        tooltipProps={{
          title: 'Change Template',
          placement: 'right',
        }}
      />
    </div>
  )
}

export const Route = createFileRoute('/web-app/')({
  component: SandPackContainer,
  beforeLoad: beforeLoadProtected,
})
