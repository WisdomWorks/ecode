import { TipTap } from '../../components/tiptap/TipTap'
import { FileRoute } from '@tanstack/react-router'

export const TextEditorContainer = () => {
  return (
    <div className="w-[800px] p-10">
      <TipTap onChange={value => console.log(value)} />
    </div>
  )
}

export const Route = new FileRoute('/text-editor/').createRoute({
  component: TextEditorContainer,
})
