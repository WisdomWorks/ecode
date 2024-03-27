import { useEffect } from 'react'

export const useConfirmTabClose = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {}

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
}
