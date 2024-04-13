import { TCourse } from '@/types'
import { getCourseLabel } from '@/utils'

import { describe, expect, it } from 'vitest'

describe('getCourseLabel', () => {
  it('should return an empty string when course is undefined', () => {
    const label = getCourseLabel()
    expect(label).toBe('')
  })

  it('should return the correct label when course is provided without a teacher', () => {
    const course: TCourse = {
      courseName: 'Introduction to Programming',
      description: 'Learn the basics of programming',
      semester: 'Fall 2023',
      students: [],
      teacher: null,
    }

    const label = getCourseLabel(course)
    expect(label).toBe('Introduction to Programming - Fall 2023')
  })

  it('should return the correct label when course is provided with a teacher', () => {
    const course: TCourse = {
      courseName: 'Data Structures and Algorithms',
      description: 'Study fundamental data structures and algorithms',
      semester: 'Spring 2023',
      students: [],
      teacher: {
        createdDate: '2022-01-01',
        email: 'teacher@example.com',
        name: 'John Doe',
        role: 'teacher',
        updatedDate: '2022-01-01',
        userId: '1234',
        username: 'johndoe',
      },
    }

    const label = getCourseLabel(course)
    expect(label).toBe('Data Structures and Algorithms - Spring 2023 - johndoe')
  })
})
