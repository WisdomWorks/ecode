import { useGetGradeStudent } from '@/apis'
import { useAppStore } from '@/context/useAppStore'

import { useParams } from '@tanstack/react-router'

export const GradeTab = () => {
  const user = useAppStore(state => state.user)
  const { courseId } = useParams({ from: '/course/$courseId/' })

  const { data } = useGetGradeStudent({
    CourseId: courseId,
    userId: user?.userId || '',
  })

  console.log(data)

  return <>Gtade tab</>
}
