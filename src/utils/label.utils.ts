import { TCourse } from '@/types'

export const getCourseLabel = (course?: TCourse) => {
  if (!course) return ''
  const { courseName, semester, teacher } = course

  return `${courseName} - ${semester} - ${teacher.username}`
}
