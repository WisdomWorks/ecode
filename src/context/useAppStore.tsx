import { callAPI, configAuthorization } from '@/apis/axios'
import { TCourse, TUser } from '@/types'

import { create } from 'zustand'

interface AppStore {
  checkSession: () => Promise<void>
  courses?: TCourse[] | []
  setCourses: (courses: TCourse[]) => void
  setUser: (user: TUser) => void
  user: TUser | null
}

export const useAppStore = create<AppStore>()(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  checkSession: async () => {
    const data = await callAPI('/auth/check-session/user', 'get')
    const {
      createdDate,
      email,
      name,
      role,
      token,
      updatedDate,
      userId,
      username,
    } = data.data
    configAuthorization(token)
    set({
      user: { name, role, email, userId, username, createdDate, updatedDate },
    })
  },
  courses: [],
  setCourses: courses => set(() => ({ courses })),
}))
