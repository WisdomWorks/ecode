import { Role } from '@/constants'
import { useAppStore } from '@/context/useAppStore'

export const useCheckRole = () => {
  const user = useAppStore(state => state.user)

  const isTeacher = user?.role === Role.TEACHER
  const isStudent = user?.role === Role.STUDENT

  return {
    user,
    isTeacher,
    isStudent,
  }
}
