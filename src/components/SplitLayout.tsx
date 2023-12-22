import { PropsWithChildren, useCallback } from 'react'

import { cn } from '@/utils'

import { FiberManualRecordRounded } from '@mui/icons-material'
import Split, { SplitProps } from '@uiw/react-split'

export const SplitLayout = ({
  children,
  mode = 'horizontal',
  renderBar,
  ...props
}: PropsWithChildren<SplitProps>) => {
  const renderBarDefault: (
    props: React.HTMLAttributes<HTMLDivElement>,
  ) => JSX.Element = useCallback(
    ({ onMouseDown, ...props }) => (
      <div
        {...props}
        className={cn({
          'w-[10px]': mode === 'horizontal',
          'h-[10px]': mode === 'vertical',
        })}
      >
        <div
          className={cn(
            'flex h-full w-full cursor-row-resize items-center justify-center bg-gray-300  transition-all ease-linear hover:bg-gray-400',
            {
              'cursor-col-resize flex-col': mode === 'horizontal',
            },
          )}
          onMouseDown={onMouseDown}
        >
          <FiberManualRecordRounded className="text-[7px]" />
          <FiberManualRecordRounded className="text-[7px]" />
          <FiberManualRecordRounded className="text-[7px]" />
          <FiberManualRecordRounded className="text-[7px]" />
          <FiberManualRecordRounded className="text-[7px]" />
        </div>
      </div>
    ),
    [mode],
  )

  return (
    <Split
      {...props}
      mode={mode}
      renderBar={renderBar ? renderBar : renderBarDefault}
    >
      {children}
    </Split>
  )
}
