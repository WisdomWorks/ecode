import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useGetGroupsInCourse,
  useUpdateExercisePermission,
  useUpdateMaterialPermission,
  useUpdateTopicPermission,
} from '@/apis'
import { Dialog } from '@/components/common'
import { Form, FormButtonGroup, FormRadioGroup } from '@/components/form'
import { FormCheckboxGroup } from '@/components/form/FormCheckboxGroup'
import { useToastMessage } from '@/hooks'
import { TGroup } from '@/types'
import {
  ExerciseSchema,
  MaterialSchema,
  TopicSchema,
} from '@/types/exercise.types'

import { useCourseContext } from '../context/course.context'
import {
  Group,
  GroupAddOutlined,
  RemoveRedEyeOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material'
import { Typography } from '@mui/material'

interface Props {
  currentGroupPermission: Pick<TGroup, 'groupId' | 'groupName'>[]
  exercise?: ExerciseSchema
  isOpen: boolean
  isShowAll: boolean
  material?: MaterialSchema
  toggleModal: () => void
  topic?: TopicSchema
  variant: 'exercise' | 'material' | 'topic'
}

enum ShowCategory {
  All = 'All',
  Group = 'Group',
  Hidden = 'Hidden',
}

interface TForm {
  groupIds: string[]
  showAll: boolean
  showCategory: ShowCategory
}

export const PermissionModal = ({
  currentGroupPermission,
  exercise,
  isOpen,
  isShowAll,
  material,
  toggleModal,
  topic,
  variant,
}: Props) => {
  const { setSuccessMessage } = useToastMessage()
  const { courseId, refetchTopics } = useCourseContext()

  const { data: groupsData } = useGetGroupsInCourse({
    courseId: courseId,
  })
  const { isPending, mutate: updateTopicPermission } =
    useUpdateTopicPermission()
  const {
    isPending: isPendMaterialPermission,
    mutate: updateMaterialPermission,
  } = useUpdateMaterialPermission()
  const {
    isPending: isPendExercisePermission,
    mutate: updateExercisePermission,
  } = useUpdateExercisePermission()

  const defaultValues = useMemo(() => {
    return {
      showCategory: isShowAll
        ? ShowCategory.All
        : currentGroupPermission.length
          ? ShowCategory.Group
          : ShowCategory.Hidden,
      showAll: isShowAll,
      groupIds: currentGroupPermission.map(item => item.groupId),
    }
  }, [isShowAll, currentGroupPermission])

  const form = useForm<TForm>({
    defaultValues,
  })

  const options =
    groupsData?.data.map(group => ({
      label: (
        <div className="solid transition-al flex w-full cursor-pointer items-center gap-2 rounded-lg border p-2 hover:bg-success-400">
          <Group />
          <Typography>{group.groupName}</Typography>
        </div>
      ),
      value: group.groupId,
    })) || []

  const handleSubmit: SubmitHandler<TForm> = data => {
    const showAll = data.showCategory === ShowCategory.All

    if (variant === 'material') {
      updateMaterialPermission(
        {
          groupIds:
            data.showCategory === ShowCategory.Hidden ? [] : data.groupIds,
          showAll,
          materialId: material?.materialId || '',
        },
        {
          onSuccess: () => {
            setSuccessMessage('Update permission successfully')
            toggleModal()
            refetchTopics?.()
          },
        },
      )
      return
    }

    if (variant === 'exercise') {
      updateExercisePermission(
        {
          exerciseId: exercise?.exerciseId || '',
          groupIds:
            data.showCategory === ShowCategory.Hidden ? [] : data.groupIds,
          showAll,
        },
        {
          onSuccess: () => {
            setSuccessMessage('Update permission successfully')
            toggleModal()
            refetchTopics?.()
          },
        },
      )
      return
    }

    updateTopicPermission(
      {
        groupIds:
          data.showCategory === ShowCategory.Hidden ? [] : data.groupIds,
        showAll,
        topicId: topic?.topicId || '',
      },
      {
        onSuccess: () => {
          setSuccessMessage('Update permission successfully')
          toggleModal()
          refetchTopics?.()
        },
      },
    )
  }

  const { control, watch } = form

  const showCategory = watch('showCategory')

  return (
    <Dialog onClose={toggleModal} open={isOpen}>
      <Form form={form} onSubmit={handleSubmit}>
        <h2 className="mb-3">Setting the permission for {variant}</h2>

        <FormRadioGroup
          className="flex flex-col"
          containerClassName="flex flex-col"
          name="showCategory"
          options={[
            {
              value: ShowCategory.All,
              label: (
                <div className="flex items-center gap-2">
                  <p>Show this {variant} for all students </p>
                  <RemoveRedEyeOutlined />
                </div>
              ),
            },
            {
              value: ShowCategory.Hidden,
              label: (
                <div className="flex items-center gap-2">
                  <p>Hide this {variant} for all students</p>
                  <VisibilityOffOutlined />
                </div>
              ),
            },
            {
              value: ShowCategory.Group,
              label: (
                <div className="flex items-center gap-2">
                  <p>Show this {variant} for specific groups</p>
                  <GroupAddOutlined />
                </div>
              ),
            },
          ]}
        />

        {showCategory === ShowCategory.Group && (
          <div className="ml-8">
            <FormCheckboxGroup
              control={control}
              name="groupIds"
              options={options}
            />
          </div>
        )}

        <FormButtonGroup
          buttons={[
            {
              type: 'submit',
              label: 'Cancel',
              onClick: toggleModal,
              className: 'clearBtn',
            },
            {
              type: 'submit',
              label: 'Update',
              className: 'submitBtn',
              disabled:
                isPending ||
                isPendMaterialPermission ||
                isPendExercisePermission,
            },
          ]}
          className="justify-end"
        />
      </Form>
    </Dialog>
  )
}
