import { callAPI, configAuthorization } from '@/apis/axios'
import { TUser } from '@/types'

import { create } from 'zustand'

interface AuthState {
  checkSession: () => Promise<void>
  setUser: (user: TUser) => void
  user: TUser | null
}

export const useAuthStore = create<AuthState>()(set => ({
  user: null,
  setUser: user => set(() => ({ user })),
  checkSession: async () => {
    const data = await callAPI('/auth/check-session', 'get')
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
}))
