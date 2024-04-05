import { useAppStore } from '@/context/useAppStore'

import { Chip } from '@mui/material'

export const ProfileTab = () => {
  const user = useAppStore(state => state.user)

  if (!user) return null
  const { email, role, username } = user

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-bold text-neutral-900">
          Personal information
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="w-[6rem] text-lg font-bold">Username:</span>
          <span className="font-medium text-neutral-800">{username}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="w-[6rem] text-lg font-bold">Email:</span>
          <span className="font-medium text-neutral-800">{email}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="w-[6rem] text-lg font-bold">Role:</span>
          <Chip
            className="capitalize"
            color="primary"
            label={role}
            variant="outlined"
          />
        </div>
      </div>
    </div>
  )
}
