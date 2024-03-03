import { TRouterPath } from '@/types'

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
