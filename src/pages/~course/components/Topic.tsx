import { PropsWithChildren } from 'react'

import {
  Add,
  Bookmark,
  Delete,
  Edit,
  MoreHorizOutlined,
} from '@mui/icons-material'
import { IconButton, MenuItem } from '@mui/material'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

interface Props {
  description?: string
  isMaterial?: boolean
  onDeleteTopic?: () => void
  onUpdateTopic?: () => void
  toggleModalCreate?: () => void
  topicName: string
}

export const Topic = ({
  children,
  description,
  isMaterial,
  onDeleteTopic,
  onUpdateTopic,
  toggleModalCreate,
  topicName,
}: PropsWithChildren<Props>) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'navbarMenu',
  })

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex w-full gap-4">
          <Bookmark className="size-9" />
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col">
              <h1 className="capitalize">{topicName}</h1>
              <p className="italic tracking-wide">{description}</p>
            </div>

            {children}
          </div>
        </div>
        <IconButton
          {...bindHover(popupState)}
          className="text-sm text-neutral-900"
        >
          <MoreHorizOutlined className="size-9" />
        </IconButton>
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
        <MenuItem
          className="flex items-center gap-2"
          onClick={toggleModalCreate}
        >
          <Add className="text-success-450" />
          {isMaterial ? 'Create material' : 'Create exercise'}
        </MenuItem>
        <MenuItem className="flex items-center gap-2" onClick={onUpdateTopic}>
          <Edit className="text-primary-450" />
          Edit topic
        </MenuItem>
        <MenuItem className="flex items-center gap-2" onClick={onDeleteTopic}>
          <Delete className="text-danger-500" />
          Delete topic
        </MenuItem>
      </HoverMenu>
    </>
  )
}
