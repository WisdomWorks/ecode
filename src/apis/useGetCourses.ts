import { callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'

type TCourse = {
  courseName: string
  description: string
  semester: string
}

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
