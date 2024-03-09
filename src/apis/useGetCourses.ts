import { Schema } from '@/types'

import { callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'

type TCourse = Schema['CreateCourseRequest']

const fetchCourses = async (): Promise<TCourse> => {
  const response = await callAPI('/courses', 'get')

  return response.data
}

export const useGetCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })
}
