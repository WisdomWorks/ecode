import { TRouterPath, TUser } from '@/types'

import { QueryClient } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

export const removeUnderscorePath = (path: TRouterPath) => {
  return String(path)
    .split('/')
    .filter(path => !path.includes('_'))
    .join('/')
}

export const getLastPath = (path: TRouterPath | string) => {
  const paths = String(path).split('/')
  return paths[paths.length - 1]
}

export const beforeLoadProtected = ({
  context,
}: {
  context: {
    queryClient: QueryClient
    user?: TUser
  }
}) => {
  if (!context.user) {
    throw redirect({
      to: '/login',
    })
  }
}
