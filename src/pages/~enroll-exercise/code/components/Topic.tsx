import { TipTap } from '@/components/tiptap/TipTap'

import { LightbulbOutlined } from '@mui/icons-material'

interface Props {
  topic: string
}

export const Topic = ({ topic }: Props) => {
  return (
    <div className="rounded-md border border-gray-300 mx-1 h-full">
      <div className="rounded-md bg-gray-100 px-3 pt-1 h-8 flex">
        <LightbulbOutlined className=" text-lg mr-2 mt-1 text-green-500" />
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
