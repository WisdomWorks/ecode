import { Sandpack } from '@codesandbox/sandpack-react'
import { createFileRoute } from '@tanstack/react-router'

export const SandPackContainer = () => {
  return <Sandpack template="react" theme="dark" />
}

export const Route = createFileRoute('/sandpack/')({
  component: SandPackContainer,
})
