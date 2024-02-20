import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { FileRoutesByPath } from '@tanstack/react-router'
import { MRT_ColumnDef, MRT_RowData } from 'material-react-table'
export type TColumn<T extends MRT_RowData> = MRT_ColumnDef<T>

export type TRouterPath = keyof FileRoutesByPath | '/'
export interface IMenu {
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
  label: string
  to: TRouterPath
}

export type BaseEntity = {
  ID: string
}
