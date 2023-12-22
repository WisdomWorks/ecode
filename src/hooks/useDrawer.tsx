import { useState } from 'react'

export const useDrawer = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  const toggleDrawer = () => setIsOpenDrawer(prev => !prev)

  return { isOpenDrawer, toggleDrawer }
}
