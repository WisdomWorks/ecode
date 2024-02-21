import { useMemo } from 'react'

import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Terminal,
} from '@mui/icons-material'
import { type Editor } from '@tiptap/react'

type Type = 'block' | 'format' | 'heading' | 'order'

type TToolbar = {
  className?: string
  extraValue?: Record<string, number | string>
  icon: JSX.Element
  onClick: () => void
  type: Type
  value: string
}

type ToolbarOption = {
  [key in Type]: TToolbar[]
}

export const useToolbarTipTap = (editor: Editor | null) => {
  const toolbarOptions = useMemo<ToolbarOption>(
    () => ({
      heading: [
        {
          icon: <span className="font-bold">H1</span>,
          value: 'heading',
          extraValue: { level: 1 },
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run(),
          type: 'heading',
        },
        {
          icon: <span className="font-bold">H2</span>,
          value: 'heading',
          extraValue: { level: 2 },
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run(),
          type: 'heading',
        },
        {
          icon: <span className="font-bold">H3</span>,
          value: 'heading',
          extraValue: { level: 3 },
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run(),
          type: 'heading',
        },
        {
          icon: <span className="font-bold">H4</span>,
          value: 'heading',
          extraValue: { level: 4 },
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 4 }).run(),
          type: 'heading',
        },
        {
          icon: <span className="font-bold">H5</span>,
          value: 'heading',
          extraValue: { level: 5 },
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 5 }).run(),
          type: 'heading',
        },
        {
          icon: <span className="font-bold">H6</span>,
          value: 'heading',
          extraValue: { level: 6 },
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 6 }).run(),
          type: 'heading',
        },
      ],
      format: [
        {
          icon: <FormatBold />,
          value: 'bold',
          onClick: () => editor?.chain().focus().toggleBold().run(),
          type: 'format',
        },
        {
          icon: <FormatItalic />,
          value: 'italic',
          onClick: () => editor?.chain().focus().toggleItalic().run(),
          type: 'format',
        },
        {
          icon: <FormatUnderlined />,
          value: 'underline',
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
          type: 'format',
        },
        {
          icon: <FormatStrikethrough />,
          value: 'strike',
          onClick: () => editor?.chain().focus().toggleStrike().run(),
          type: 'format',
        },
        {
          icon: <Code />,
          value: 'code',
          onClick: () => editor?.chain().focus().toggleCode().run(),
          type: 'format',
        },
      ],
      block: [
        {
          icon: <FormatQuote />,
          value: 'blockquote',
          onClick: () => editor?.chain().focus().toggleBlockquote().run(),
          type: 'block',
        },

        {
          icon: <Terminal />,
          value: 'codeBlock',
          onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
          type: 'block',
        },
      ],
      order: [
        {
          icon: <FormatListBulleted />,
          value: 'bulletList',
          onClick: () => editor?.chain().focus().toggleBulletList().run(),
          type: 'order',
        },
        {
          icon: <FormatListNumbered />,
          value: 'orderedList',
          onClick: () => editor?.chain().focus().toggleOrderedList().run(),
          type: 'order',
        },
      ],
    }),

    [editor],
  )

  return { toolbarOptions }
}
