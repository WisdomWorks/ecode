import { TColumn } from '@/types'

import {
  MaterialReactTable,
  MRT_RowData,
  MRT_TableOptions,
} from 'material-react-table'

interface Props<T extends MRT_RowData> extends MRT_TableOptions<T> {
  columns: TColumn<T>[]
  data: T[]
}

export const Table = <T extends MRT_RowData>({
  columns,
  data,

  ...rest
}: Props<T>) => {
  return <MaterialReactTable {...rest} columns={columns} data={data} />
}
