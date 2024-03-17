import { ComponentType } from 'react'

import { useCheckRole } from '@/hooks'

import { Navigate } from '@tanstack/react-router'

export const withTeacherRole = (Component: ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithTeacherRole = (props: any) => {
    const { isTeacher } = useCheckRole()

    if (!isTeacher) {
      return <Navigate to="/" />
    }

    return <Component {...props} />
  }

  return WithTeacherRole
}
