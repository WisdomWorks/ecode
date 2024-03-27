import { useCheckRole } from '@/hooks'

import { TeacherView } from './TeacherView.'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const ExerciseInformationDetail = () => {
  const { exerciseId } = useParams({
    from: '/course/$courseId/exercise-detail/$exerciseId',
  })
  const { isTeacher } = useCheckRole()

  if (isTeacher) return <TeacherView exerciseId={exerciseId} />
}

export const Route = createFileRoute(
  '/course/$courseId/exercise-detail/$exerciseId',
)({
  component: ExerciseInformationDetail,
})
