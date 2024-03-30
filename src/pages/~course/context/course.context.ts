import { createContext, useContext } from 'react'

import { TCourse } from '@/types'
import { TTopic } from '@/types/exercise.types'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface CourseContextType {
  course: TCourse | null
  courseId: string
  loading: boolean
  refetchTopics?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  setCourse: (course: TCourse) => void
  setTopics: (topics: TTopic[]) => void
  topics: TTopic[] | []
}

export const CourseContext = createContext<CourseContextType>({
  setTopics: () => {},
  setCourse: () => {},
  topics: [],
  loading: false,
  courseId: '',
  course: null,
})

export const useCourseContext = () => {
  return useContext(CourseContext)
}
