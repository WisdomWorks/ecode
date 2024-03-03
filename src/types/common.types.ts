import { TRouterPath } from './route.types'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { MRT_ColumnDef, MRT_RowData } from 'material-react-table'
export type TColumn<T extends MRT_RowData> = MRT_ColumnDef<T>

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

export type TLanguage = {
  ID: string
  label: string
}
