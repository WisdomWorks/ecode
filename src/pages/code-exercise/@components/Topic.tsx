import { TopicExample } from './TopicExample'

interface Props {
  topic: string
}

export const Topic = ({ topic }: Props) => {
  return (
    <div className="p-6">
      <h2 className="mb-3 text-xl font-bold capitalize">title</h2>
      <article className="mb-8 w-4/5">{topic}</article>

      <TopicExample />
      <TopicExample />
      <TopicExample />
    </div>
  )
}
