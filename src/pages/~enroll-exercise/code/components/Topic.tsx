import { TipTap } from '@/components/tiptap/TipTap'

import { LightbulbOutlined } from '@mui/icons-material'

interface Props {
  topic: string
}

export const Topic = ({ topic }: Props) => {
  return (
    <div className="mx-1 h-full overflow-y-auto rounded-md border border-gray-300 ">
      <div className="flex h-8 rounded-md bg-gray-100 px-3 pt-1">
        <LightbulbOutlined className=" mr-2 mt-1 text-lg text-green-500" />
        <p className="mb-3 text-base font-bold capitalize">Description</p>
      </div>
      <TipTap
        classNameEditor="border-none"
        defaultValue={topic}
        editable={false}
      />
    </div>
  )
}
