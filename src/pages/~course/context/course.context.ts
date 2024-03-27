import { createContext, useContext } from 'react'

import { TTopic } from '@/types/exercise.types'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface CourseContextType {
  courseId: string
  loading: boolean
  refetchTopics?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  setTopics: (topics: TTopic[]) => void
  topics: TTopic[] | []
}

export const CourseContext = createContext<CourseContextType>({
  setTopics: () => {},
  topics: [],
  loading: false,
  courseId: '',
})

export const useCourseContext = () => {
  return useContext(CourseContext)
}
