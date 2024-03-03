import { TipTap } from '../../components/tiptap/TipTap'
import { createFileRoute } from '@tanstack/react-router'

export const TextEditorContainer = () => {
  return (
    <div className="w-[800px] p-10">
      <TipTap onChange={value => console.log(value)} />
    </div>
  )
}

export const Route = createFileRoute('/text-editor/')({
  component: TextEditorContainer,
})
