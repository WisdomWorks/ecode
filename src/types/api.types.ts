import { components } from '@/generated/schema'

export type Schema = components['schemas']

export type TUser = {
  createdDate: string
  email: string
  name: string
  role: string
  updatedDate: string
  userId: string
  userName?: string
  username?: string
}

export type TCourse = {
  courseId?: string
  courseName: string
  description: string
  enrollKey?: string
  semester: string
  students: TUser[] | [] | null
  teacher: TUser | null
  teacherName?: string
}

export type TGroup = {
  courseId: string
  createDate?: string
  groupId: string
  groupName: string
  updateDate?: string
}
