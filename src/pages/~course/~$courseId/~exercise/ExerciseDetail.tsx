import { PropsWithChildren, useMemo } from 'react'

import { useDeleteExercise } from '@/apis'
import { ButtonTooltip } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { ExerciseType } from '@/constants'
import { useCheckRole, useToggle } from '@/hooks'
import { ExerciseSchema } from '@/types/exercise.types'
import { getTimeExerciseLabel } from '@/utils'

import { PermissionModal } from '../../components/PermissionModal'
import { useCourseContext } from '../../context/course.context'
import {
  CodeRounded,
  DeleteOutline,
  EditOutlined,
  LinkOutlined,
  MenuBookRounded,
  QuizRounded,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import { Chip } from '@mui/material'
import { Link, useParams } from '@tanstack/react-router'

interface Props {
  exercise: ExerciseSchema
  index: number
}

const LinkToExerciseDetail = ({
  children,
  className = '',
  exerciseId,
  isTeacher = false,
}: PropsWithChildren<{
  className?: string
  exerciseId: string
  isTeacher?: boolean
}>) => {
  const params = useParams({ from: '/course/$courseId/' })
  return (
    <Link
      className={className}
      params={{
        exerciseId,
        courseId: params.courseId,
      }}
      to="/course/$courseId/exercise-detail/$exerciseId"
    >
      {children}
      {isTeacher && <EditOutlined className="cursor-pointer text-black" />}
    </Link>
  )
}

export const ExerciseDetail = ({ exercise, index }: Props) => {
  const { refetchTopics } = useCourseContext()
  const { isTeacher } = useCheckRole()

  const { exerciseId, exerciseName, groups, showAll, type } = exercise

  const { mutate: deleteExercise } = useDeleteExercise()

  const [openModalDelete, toggleModalDelete] = useToggle()
  const [onOpenSettingPermissionModal, toggleSettingPermissionModal] =
    useToggle()

  const Icon = useMemo(() => {
    switch (type) {
      case ExerciseType.QUIZ:
        return QuizRounded
      case ExerciseType.CODE:
        return CodeRounded
      case ExerciseType.ESSAY:
        return MenuBookRounded
      default:
        return LinkOutlined
    }
  }, [type])

  const handleDelete = () => {
    deleteExercise(
      {
        exerciseId,
        type,
      },
      {
        onSuccess: () => refetchTopics?.(),
      },
    )
    toggleModalDelete()
  }

  const exerciseLabel = getTimeExerciseLabel(exercise)

  const ContainerComponent = isTeacher ? 'div' : LinkToExerciseDetail

  return (
    <div
      className={`flex w-full items-center gap-4 rounded-lg ${
        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <ContainerComponent
        className="flex w-full cursor-pointer gap-4 rounded-lg px-5 py-3 outline-1 transition-all hover:bg-primary-350 hover:text-white"
        exerciseId={exerciseId}
      >
        <Icon className="mt-1 size-6" />
        <div>
          <div className=" flex items-center">
            <p className="text-lg capitalize">{exerciseName}</p>
            <Chip
              className="ml-3"
              color={exerciseLabel.color}
              label={exerciseLabel.label}
              size="small"
              sx={{
                fontSize: '0.6rem',
              }}
              variant="outlined"
            />
          </div>
          <div className="mt-1 flex gap-2 font-light capitalize italic tracking-wider">
            <p className=" text-sm">{type} exercise</p>
          </div>
        </div>
      </ContainerComponent>

      {isTeacher && (
        <div className="flex items-center gap-4">
          <ButtonTooltip
            iconButtonProps={{
              children: (
                <RemoveRedEyeOutlined className="cursor-pointer text-black" />
              ),
              onClick: toggleSettingPermissionModal,
            }}
            isIconButton
            tooltipProps={{
              title: 'View permission',
            }}
          />

          <ButtonTooltip
            iconButtonProps={{
              children: (
                <LinkToExerciseDetail exerciseId={exerciseId} isTeacher />
              ),
            }}
            isIconButton
            tooltipProps={{
              title: 'Edit exercise',
            }}
          />

          <ButtonTooltip
            iconButtonProps={{
              children: (
                <DeleteOutline className="cursor-pointer text-red-500" />
              ),
              onClick: toggleModalDelete,
            }}
            isIconButton
            tooltipProps={{
              title: 'Delete exercise',
            }}
          />
        </div>
      )}

      {openModalDelete && (
        <ConfirmModal
          description={'Do you want to delete this exercise on this topic?'}
          isOpen={openModalDelete}
          onClose={toggleModalDelete}
          onConfirm={handleDelete}
          title="Delete Exercise"
        />
      )}

      {onOpenSettingPermissionModal && (
        <PermissionModal
          currentGroupPermission={groups}
          exercise={exercise}
          isOpen={onOpenSettingPermissionModal}
          isShowAll={showAll}
          toggleModal={toggleSettingPermissionModal}
          variant="exercise"
        />
      )}
    </div>
  )
}
