import { useState } from 'react'

interface Props {
  defaultCode?: string
}

export const useCode = ({ defaultCode = '' }: Props) => {
  const [code, setCode] = useState(defaultCode)

  return {
    code,
    setCode,
  }
}
