import { TCourse, TUser } from '@/types'

import { create } from 'zustand'

interface AppStore {
  courses?: TCourse[] | []
  setCourses: (courses: TCourse[]) => void
  setUser: (user: TUser) => void
  user: TUser | null
}

export const useAppStore = create<AppStore>()(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  courses: [],
  setCourses: courses => set(() => ({ courses })),
}))
