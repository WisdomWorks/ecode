import { TRouterPath } from '@/types'

import { CourseMenuBar } from './CourseMenuBar'
import { StaticMenuBar } from './StaticMenuBar'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export type TMenu = {
  ID?: string
  Icon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
  label: string
  to?: TRouterPath
}

export const activeClassName = '[&_>span]:text-white bg-primary-500 text-white'

export const MenuBar = () => {
  return (
    <>
      <div className="flex flex-col gap-8  overflow-y-auto px-6 py-8">
        <StaticMenuBar />
        <CourseMenuBar />
      </div>
    </>
  )
}
