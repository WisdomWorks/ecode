import { TColumn } from '@/types'
import { cn } from '@/utils'

import {
  MaterialReactTable,
  MRT_RowData,
  MRT_TableOptions,
} from 'material-react-table'

interface Props<T extends MRT_RowData> extends MRT_TableOptions<T> {
  columns: TColumn<T>[]
  containerClassName?: string
  data: T[]
}

export const Table = <T extends MRT_RowData>({
  columns,
  containerClassName,
  data,
  initialState,
  ...rest
}: Props<T>) => {
  return (
    <MaterialReactTable
      {...rest}
      columns={columns}
      data={data}
      initialState={{
        showGlobalFilter: true,
        showColumnFilters: true,
        ...initialState,
      }}
      muiTableContainerProps={{
        className: cn('max-h-[680px] min-h-[680px]', containerClassName),
      }}
    />
  )
}
