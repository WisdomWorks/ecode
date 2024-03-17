import { ComponentType } from 'react'

import { useAppStore } from '@/context/useAppStore'

import { Navigate, useParams } from '@tanstack/react-router'

export const withPermissionOnCourse = (Component: ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithPermissionOnCourse = (props: any) => {
    const courses = useAppStore(state => state.courses)
    const params = useParams({
      from: '/course/$courseId/',
    })

    if (!courses?.some(course => course.courseId === params.courseId)) {
      return (
        <Navigate search={{ courseId: params.courseId }} to="/enroll-course" />
      )
    }

    return <Component {...props} />
  }

  return WithPermissionOnCourse
}
