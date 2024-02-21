// import Logo from '@/assets/logo.png'
import { menus } from '@/constants'

import { KeyboardArrowUp, Logout } from '@mui/icons-material'
import { Avatar, Button, Drawer, MenuItem } from '@mui/material'
import { Link } from '@tanstack/react-router'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

export const SideBar = () => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })

  return (
    <Drawer
      classes={{ paper: 'bg-neutral-800 w-[18rem] p-4' }}
      hideBackdrop
      variant="permanent"
    >
      <div className="flex h-full flex-col justify-between text-white ">
        <div>
          {/* <Link>
            <img alt="logo" src={Logo} />
          </Link> */}

          <div className="flex flex-col gap-4 text-base text-white">
            {menus.map(menu => {
              const { Icon, label, to } = menu

              return (
                <Link
                  activeProps={{
                    className:
                      'font-bold text-primary-500 bg-transparent [&_div]:bg-primary-500',
                  }}
                  className="flex cursor-pointer items-center justify-start gap-2 whitespace-nowrap transition-all"
                  key={label}
                  to={to as string}
                >
                  <div className="size-1 h-8 rounded-sm transition-all"></div>
                  <Icon className="size-6 fill-current" />
                  <span className="pointer-events-none text-xl italic">
                    {label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <Button
            className="flex w-full justify-between rounded-2xl bg-white py-3"
            endIcon={<KeyboardArrowUp className="size-6 text-neutral-700" />}
            variant="contained"
            {...bindHover(popupState)}
          >
            <div className="flex items-center">
              <Avatar className="size-7">A</Avatar>
              <span className="ml-2 text-sm font-bold text-neutral-900">
                Admin
              </span>
            </div>
          </Button>

          <HoverMenu
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            {...bindMenu(popupState)}
          >
            <MenuItem>View Details</MenuItem>
            <MenuItem>
              <Logout />
              <span className="ml-2">Logout</span>
            </MenuItem>
          </HoverMenu>
        </div>
      </div>
    </Drawer>
  )
}
