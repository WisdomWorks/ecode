import { ToolbarTipTap } from './Toolbar'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { EditorOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import './index.css'

export type TFormTipTap = Partial<EditorOptions> & {
  classNameEditor?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export const TipTap = ({
  classNameEditor = '',
  defaultValue,
  editable = true,
  onChange,
  ...rest
}: TFormTipTap) => {
  const editor = useEditor({
    ...rest,
    content: defaultValue,
    editable: editable,
    extensions: [StarterKit.configure(), Underline],
    editorProps: {
      attributes: {
        class: `border border-gray-300 p-2 rounded-lg ${classNameEditor}`,
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  })

  return (
    <>
      {editable && <ToolbarTipTap editor={editor} />}
      <EditorContent editor={editor} />
    </>
  )
}
