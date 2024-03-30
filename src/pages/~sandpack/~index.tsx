import { SandpackComponent } from '@/components/code/SandpackComponent'
import { beforeLoadProtected } from '@/utils'

import { createFileRoute } from '@tanstack/react-router'

export const SandPackContainer = () => {
  return <SandpackComponent />
}

export const Route = createFileRoute('/sandpack/')({
  component: SandPackContainer,
  beforeLoad: beforeLoadProtected,
})
