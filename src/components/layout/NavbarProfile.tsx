import { KeyboardArrowDown, Logout } from '@mui/icons-material'
import { Avatar, MenuItem } from '@mui/material'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

export const NavbarProfile = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'navbarMenu',
  })

  return (
    <>
      <div
        className="flex cursor-pointer items-center gap-3"
        {...bindHover(popupState)}
      >
        <Avatar className="bg-orange-400" variant="rounded">
          A
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">Nguyen Van A</span>
          <span className="text-xs font-normal text-neutral-400">
            email@example.com
          </span>
        </div>
        <KeyboardArrowDown className="text-white" />
      </div>

      <HoverMenu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...bindMenu(popupState)}
      >
        <MenuItem>View Details</MenuItem>
        <MenuItem className="mt-2 rounded-md bg-danger-500 transition-all hover:bg-danger-600">
          <Logout className="text-white" />
          <span className="ml-2 text-white">Logout</span>
        </MenuItem>
      </HoverMenu>
    </>
  )
}
