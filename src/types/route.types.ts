import { TabProps } from '@mui/material'
import { FileRoutesByPath } from '@tanstack/react-router'

export type TRouterPath = keyof FileRoutesByPath | '/'

export interface ITab extends TabProps {
  to: TRouterPath
}
