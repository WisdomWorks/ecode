import { PropsWithChildren } from 'react'

import { useCheckRole } from '@/hooks'

import {
  Add,
  BookmarkBorderOutlined,
  DeleteOutline,
  EditOutlined,
  RemoveRedEyeOutlined,
  TuneOutlined,
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
  toggleModalCreateExercise?: () => void
  toggleModalSettingPermission: () => void
  topicName: string
}

export const Topic = ({
  children,
  description,
  isMaterial,
  onDeleteTopic,
  onUpdateTopic,
  toggleModalCreate,
  toggleModalSettingPermission,
  topicName,
}: PropsWithChildren<Props>) => {
  const { isTeacher } = useCheckRole()

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'navbarMenu',
  })

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex w-full gap-4">
          <BookmarkBorderOutlined className="size-9" />
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-col">
              <h2 className="capitalize">{topicName}</h2>
              <p className="italic tracking-wide">{description}</p>
            </div>

            {children}
          </div>
        </div>
        {isTeacher && (
          <IconButton
            {...bindHover(popupState)}
            className="text-sm text-neutral-900"
          >
            <TuneOutlined className="size-7" />
          </IconButton>
        )}
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
          <Add className=" text-black" />
          {isMaterial ? 'Create material' : 'Create exercise'}
        </MenuItem>
        <MenuItem
          className="flex items-center gap-2"
          onClick={toggleModalSettingPermission}
        >
          <RemoveRedEyeOutlined className="text-black" />
          Setting permission
        </MenuItem>
        <MenuItem className="flex items-center gap-2" onClick={onUpdateTopic}>
          <EditOutlined className="text-black" />
          Edit topic
        </MenuItem>
        <MenuItem
          className="flex items-center gap-2 text-danger-500"
          onClick={onDeleteTopic}
        >
          <DeleteOutline className="text-danger-500" />
          Delete topic
        </MenuItem>
      </HoverMenu>
    </>
  )
}
