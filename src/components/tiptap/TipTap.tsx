import { ToolbarTipTap } from './Toolbar'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import './index.css'

type Props = {
  defaultValue?: string
  onChange: (value: string) => void
}

export const TipTap = ({ defaultValue = '', onChange }: Props) => {
  const editor = useEditor({
    content: defaultValue,
    extensions: [StarterKit.configure(), Underline],
    editorProps: {
      attributes: {
        class: 'border border-gray-300 p-2 rounded-lg',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  return (
    <>
      <ToolbarTipTap editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}
