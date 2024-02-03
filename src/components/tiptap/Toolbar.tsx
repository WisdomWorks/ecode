import { useToolbarTipTap } from '@/hooks/useToolbarTiptap'
import { cn } from '@/utils'

import { Divider, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { type Editor } from '@tiptap/react'

interface Props {
  editor: Editor | null
}

export const ToolbarTipTap = ({ editor }: Props) => {
  const { toolbarOptions } = useToolbarTipTap(editor)

  const { block, format, heading, order } = toolbarOptions

  if (!editor) return null

  return (
    <ToggleButtonGroup
      className="mb-2 flex max-w-sm flex-wrap rounded-lg border border-gray-300 px-1"
      exclusive
      size="small"
    >
      {heading.map(({ extraValue, icon, onClick, value }) => (
        <ToggleButton
          aria-label={`${value}-${
            extraValue ? JSON.stringify(extraValue) : ''
          }`}
          className={cn('border-none w-9', {
            'bg-gray-300': editor.isActive(value, extraValue),
          })}
          color="primary"
          key={`${value}- ${JSON.stringify(extraValue)}`}
          onClick={onClick}
          value={value}
        >
          {icon}
        </ToggleButton>
      ))}
      <Divider
      // className="mx-1 my-2 bg-gray-400"
      // flexItem
      // orientation="vertical"
      />

      {format.map(({ icon, onClick, value }) => (
        <ToggleButton
          aria-label={value}
          className={cn('border-none w-9', {
            'bg-gray-300': editor.isActive(value),
          })}
          color="primary"
          key={value}
          onClick={onClick}
          value={value}
        >
          {icon}
        </ToggleButton>
      ))}
      {/* <Divider
        className="mx-1 my-2 bg-gray-400"
        flexItem
        orientation="vertical"
      /> */}

      {block.map(({ icon, onClick, value }) => (
        <ToggleButton
          aria-label={value}
          className={cn('border-none w-9', {
            'bg-gray-300': editor.isActive(value),
          })}
          color="primary"
          key={value}
          onClick={onClick}
          value={value}
        >
          {icon}
        </ToggleButton>
      ))}
      {/* <Divider
        className="mx-1 my-2 bg-gray-400"
        flexItem
        orientation="vertical"
      /> */}
      {order.map(({ icon, onClick, value }) => (
        <ToggleButton
          aria-label={value}
          className={cn('border-none', {
            'bg-gray-300': editor.isActive(value),
          })}
          color="primary"
          key={value}
          onClick={onClick}
          value={value}
        >
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
