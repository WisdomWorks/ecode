import { TCourse } from '@/types'

export const getCourseLabel = (course?: TCourse) => {
  if (!course) return ''
  const { courseName, semester, teacher } = course

  let label = `${courseName} - ${semester}`
  label = teacher ? `${label} - ${teacher.username}` : label

  return label
}
