import { useLogout } from '@/apis'
import { useAppStore } from '@/context/useAppStore'

import {
  AssignmentIndOutlined,
  KeyboardArrowDown,
  Logout,
} from '@mui/icons-material'
import { Avatar, MenuItem } from '@mui/material'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

export const NavbarProfile = () => {
  const user = useAppStore(state => state.user)
  const { mutate: logout } = useLogout()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'navbarMenu',
  })

  const handleLogout = () => logout()

  return (
    <>
      <div
        className="flex cursor-pointer items-center gap-3"
        {...bindHover(popupState)}
      >
        <Avatar className="bg-orange-400" variant="rounded">
          {user?.name.charAt(0)}
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold capitalize text-white">
            {user?.name} - {user?.username}
          </span>
          <span className="text-xs font-normal text-neutral-400">
            {user?.email}
          </span>
        </div>
        <KeyboardArrowDown className="text-white" />
      </div>

      <HoverMenu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...bindMenu(popupState)}
      >
        <MenuItem className="cursor-pointer rounded-md text-sm">
          <AssignmentIndOutlined className="mr-4" />
          View Details
        </MenuItem>
        <MenuItem
          className="mt-2 cursor-pointer rounded-md text-sm transition-all hover:bg-red-100"
          onClick={handleLogout}
        >
          <Logout className="mr-4 text-red-600" />
          <span className="ml-2 text-red-600">Logout</span>
        </MenuItem>
      </HoverMenu>
    </>
  )
}
