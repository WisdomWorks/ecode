import { Role } from '@/constants'
import { TUser } from '@/types'

import { callAPI } from './axios'
import { useQuery } from '@tanstack/react-query'

const fetchUsersByRole = async (role: Role): Promise<TUser[]> => {
  const res = await callAPI(`/users`, 'get', {
    params: {
      role,
    },
  })
  return res.data
}

export const useGetUsersByRole = ({ role }: { role: Role }) => {
  return useQuery({
    queryKey: ['users', role],
    queryFn: () => fetchUsersByRole(role),
  })
}
