import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useCreateGroupInCourse,
  useDeleteGroup,
  useUpdateGroupInCourse,
} from '@/apis'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Form, FormInput } from '@/components/form'
import { useToastMessage, useToggle } from '@/hooks'
import { TCourse, TGroup } from '@/types'
import { cn } from '@/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Cancel,
  Delete,
  Done,
  Edit,
  GroupAddOutlined,
  Groups as GroupsIcon,
} from '@mui/icons-material'
import { Button, IconButton, TextField, Typography } from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { z } from 'zod'

interface Props {
  courseDetail?: TCourse
  groupDetailId: string
  groups: TGroup[]
  refetchGroups: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  setGroupDetailId: Dispatch<SetStateAction<string>>
}

interface TForm {
  groupName: string
}

export const Groups = ({
  courseDetail,
  groupDetailId,
  groups,
  refetchGroups,
  setGroupDetailId,
}: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const [deleteGroupId, setDeleteGroupId] = useState('')
  const [editGroupId, setEditGroupId] = useState('')
  const [groupNameUpdate, setGroupNameUpdate] = useState('')

  const { isPending: isCreateNewGroupLoading, mutate: createNewGroup } =
    useCreateGroupInCourse()
  const { mutate: updateGroup } = useUpdateGroupInCourse()

  const { mutate: deleteGroup } = useDeleteGroup()

  const [showInput, toggleShowInput] = useToggle()
  const [showModalDelete, toggleModalDelete] = useToggle()
  const [showEditGroup, toggleEditGroup] = useToggle()

  const form = useForm<TForm>({
    defaultValues: {
      groupName: '',
    },
    resolver: zodResolver(
      z.object({
        groupName: z.string().min(1, { message: 'Group name is required' }),
      }),
    ),
  })

  const handleSubmit: SubmitHandler<TForm> = data => {
    createNewGroup(
      {
        courseId: String(courseDetail?.courseId),
        groupName: data.groupName,
      },
      {
        onSuccess: () => {
          form.reset()
          refetchGroups()
          toggleShowInput()
        },
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Something went wrong',
          ),
      },
    )
  }

  const handleDeleteGroup = () => {
    deleteGroup(
      { groupId: deleteGroupId },
      {
        onSuccess: () => {
          refetchGroups()
          toggleModalDelete()
          setSuccessMessage('Group deleted successfully')
        },
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Something went wrong',
          ),
      },
    )
  }

  const handleUpdateGroup = () => {
    updateGroup(
      { groupId: editGroupId, groupName: groupNameUpdate },
      {
        onSuccess: () => {
          refetchGroups()
          toggleEditGroup()
          setGroupNameUpdate('')
          setSuccessMessage('Group updated successfully')
        },
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Something went wrong',
          ),
      },
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={toggleShowInput}
          startIcon={<GroupAddOutlined />}
          variant="outlined"
        >
          Add new group
        </Button>
      </div>

      {groups.map(group => {
        const { groupId, groupName } = group
        const isEdit = editGroupId === groupId && showEditGroup

        return (
          <div className="flex justify-between" key={groupId}>
            {isEdit ? (
              <TextField
                onChange={e => setGroupNameUpdate(e.target.value)}
                size="small"
                value={groupNameUpdate}
              />
            ) : (
              <div
                className={cn(
                  'solid flex w-full cursor-pointer items-center gap-2 rounded-lg border p-2 transition-al',
                  {
                    'hover:bg-success-400': !isEdit,
                    'bg-success-400': groupDetailId === groupId,
                  },
                )}
                onClick={() => setGroupDetailId(groupId)}
              >
                <GroupsIcon />

                <Typography>{groupName}</Typography>
              </div>
            )}
            {isEdit ? (
              <>
                <IconButton onClick={handleUpdateGroup}>
                  <Done className="text-success-500" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    toggleEditGroup()
                    setEditGroupId('')
                    setGroupNameUpdate('')
                  }}
                >
                  <Cancel className="text-red-500" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  onClick={() => {
                    toggleEditGroup()
                    setEditGroupId(groupId)
                  }}
                >
                  <Edit className="text-primary-500" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setDeleteGroupId(groupId)
                    toggleModalDelete()
                  }}
                >
                  <Delete className="text-red-500" />
                </IconButton>
              </>
            )}
          </div>
        )
      })}

      {!groups.length && <div>No groups in this course</div>}

      <Form className="flex gap-2" form={form} onSubmit={handleSubmit}>
        {showInput && (
          <>
            <FormInput
              control={form.control}
              label="Group Name"
              name="groupName"
              placeholder="Fill the group name"
            />
            <div className="flex items-center">
              <Button
                disabled={isCreateNewGroupLoading}
                startIcon={<Done />}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </div>
          </>
        )}
      </Form>

      {showModalDelete && (
        <ConfirmModal
          description="Do you want to delete this group?"
          isOpen={showModalDelete}
          onClose={toggleModalDelete}
          onConfirm={handleDeleteGroup}
          title="Delete Group"
        />
      )}
    </>
  )
}
