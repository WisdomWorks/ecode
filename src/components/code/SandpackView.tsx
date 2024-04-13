import { useSandpack } from '@codesandbox/sandpack-react'

export const SandpackView = () => {
  const { sandpack } = useSandpack()

  const { files } = sandpack
  console.log(files)

  console.log(JSON.stringify(files))

  return <></>
}
