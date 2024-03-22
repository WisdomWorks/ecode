import { createContext, useContext } from 'react'

import { Schema } from '@/types'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

export type TopicSchema = Schema['CreateTopicRequest'] & {
  topicId: string
}

export type MaterialSchema = Schema['CreateMaterialRequest'] & {
  materialId: string
  storageUrl?: string
}

export type TTopic = TopicSchema & {
  materials: MaterialSchema[]
}

interface CourseContextType {
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
})

export const useCourseContext = () => {
  return useContext(CourseContext)
}
