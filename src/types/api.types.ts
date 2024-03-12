import { components } from '@/generated/schema'

export type Schema = components['schemas']

export type TUser = {
  createdDate: string
  email: string
  name: string
  role: string
  updatedDate: string
  userId: string
  username: string
}
