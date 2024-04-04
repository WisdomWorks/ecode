import { PanelResizeHandle } from 'react-resizable-panels'

import { cn, uuid } from '@/utils'

interface Props {
  className?: string
  direction?: 'horizontal' | 'vertical'
}

export const ResizeHandle = ({
  className = '',
  direction = 'horizontal',
}: Props) => {
  return (
    <PanelResizeHandle>
      <div
        className={cn(
          'flex items-center justify-center bg-[#F0F0F0]',
          {
            'cursor-col-resize h-full w-2': direction === 'horizontal',
            'cursor-row-resize w-full h-2': direction === 'vertical',
          },
          className,
        )}
        id={uuid()}
      >
        <svg className="size-[1em] text-white" viewBox="0 0 24 24">
          <path
            d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </PanelResizeHandle>
  )
}
