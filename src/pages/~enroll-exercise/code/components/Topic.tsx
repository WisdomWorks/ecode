import { TipTap } from '@/components/tiptap/TipTap'

interface Props {
  topic: string
}

export const Topic = ({ topic }: Props) => {
  return (
    <div className="p-6">
      <h2 className="mb-3 text-xl font-bold capitalize">Exercise Topic</h2>
      <TipTap
        classNameEditor="border-none"
        defaultValue={topic}
        editable={false}
      />
    </div>
  )
}
