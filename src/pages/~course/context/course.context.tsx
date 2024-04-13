import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

import { useGetTopicsByUserId, useGetTopicsForTeacher } from '@/apis'
import { useCheckRole } from '@/hooks'
import { TTopic } from '@/types/exercise.types'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

interface CourseContextType {
  courseId: string
  loading: boolean
  refetchTopics?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  setTopics: (topics: TTopic[]) => void
  topics: TTopic[] | []
}

export const CourseContext = createContext<CourseContextType | null>(null)

export const CourseProvider = ({ children }: PropsWithChildren<object>) => {
  const { courseId } = useParams({ from: '/course/$courseId/' })
  const [topics, setTopics] = useState<TTopic[]>([])

  const { isStudent, isTeacher, user } = useCheckRole()
  const {
    data: topicOfStudent,
    isLoading: getTopicsOfStudentLoading,
    isRefetching: isRefetchingTopicsOfStudent,
    refetch: refetchTopicsOfStudent,
  } = useGetTopicsByUserId({
    isStudent,
    courseId,
    userId: user?.userId || '',
  })

  const {
    data: topicsOfTeacher,
    isLoading: getTopicOfTeacherLoading,
    isRefetching: isRefetchingTopicsOfTeacher,
    refetch: refetchTopicsOfTeacher,
  } = useGetTopicsForTeacher({
    courseId,
    isTeacher,
  })

  useEffect(() => {
    if (isStudent) {
      setTopics(topicOfStudent || [])
    }
    if (isTeacher) {
      setTopics(topicsOfTeacher || [])
    }
  }, [topicOfStudent, topicsOfTeacher, isStudent, isTeacher])

  const loading =
    getTopicsOfStudentLoading ||
    getTopicOfTeacherLoading ||
    isRefetchingTopicsOfStudent ||
    isRefetchingTopicsOfTeacher

  return (
    <CourseContext.Provider
      value={{
        courseId,
        loading,
        refetchTopics: isStudent
          ? refetchTopicsOfStudent
          : refetchTopicsOfTeacher,
        setTopics,
        topics,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCourseContext = () => {
  const context = useContext(CourseContext)

  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider')
  }

  return context
}
