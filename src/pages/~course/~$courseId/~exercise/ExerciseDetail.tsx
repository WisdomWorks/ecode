import { useMemo } from 'react'

import { useDeleteExercise } from '@/apis'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { ExerciseType } from '@/constants'
import { useCheckRole, useToggle } from '@/hooks'
import { ExerciseSchema } from '@/types/exercise.types'

import { PermissionModal } from '../../components/PermissionModal'
import { useCourseContext } from '../../context/course.context'
import {
  CodeRounded,
  Delete,
  Edit,
  LinkOutlined,
  MenuBookRounded,
  QuizRounded,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link, useParams } from '@tanstack/react-router'

interface Props {
  exercise: ExerciseSchema
}

export const ExerciseDetail = ({ exercise }: Props) => {
  const { refetchTopics } = useCourseContext()
  const { isTeacher } = useCheckRole()
  const params = useParams({ from: '/course/$courseId/' })

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

  return (
    <div className="flex w-full items-center gap-4 ">
      <div className="flex w-2/3 cursor-pointer gap-4 rounded-lg px-5 py-3 transition-all hover:bg-primary-500 hover:text-white">
        <Icon className="size-6" />
        {isTeacher && (
          <div>
            <p>{exerciseName}</p>
            <p className="font-light capitalize italic tracking-wider">
              {type}
            </p>
          </div>
        )}
      </div>

      {isTeacher && (
        <div className="flex items-center">
          <IconButton onClick={toggleSettingPermissionModal}>
            <RemoveRedEyeOutlined className="text-warning-500" />
          </IconButton>

          <IconButton>
            <Link
              params={{
                exerciseId,
                courseId: params.courseId,
              }}
              to="/course/$courseId/exercise-detail/$exerciseId"
            >
              <Edit className="text-primary-500" />
            </Link>
          </IconButton>

          <IconButton onClick={toggleModalDelete}>
            <Delete className="text-red-500" />
          </IconButton>
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
