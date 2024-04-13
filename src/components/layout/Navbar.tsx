import Logo from '@/assets/logo.png'

import { NavbarProfile } from './NavbarProfile'
import { Divider } from '@mui/material'

export const Navbar = () => {
  return (
    <div className="flex size-full items-center justify-between px-16 shadow-l">
      <div className="flex items-center">
        <div className="mr-20">
          <img alt="Logo" className="h-12 w-full object-contain" src={Logo} />
        </div>
        <div className="flex gap-6">
          <span className="text-4xl font-bold text-white">Code-E</span>
          <Divider
            className="w-[3px] bg-neutral-300"
            flexItem
            orientation="vertical"
          />
        </div>
      </div>

      <NavbarProfile />
    </div>
  )
}
