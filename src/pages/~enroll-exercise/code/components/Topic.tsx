import { TipTap } from '@/components/tiptap/TipTap'

import { LightbulbOutlined } from '@mui/icons-material'

interface Props {
  topic: string
}

export const Topic = ({ topic }: Props) => {
  return (
    <div className="h-full overflow-y-auto rounded-md border border-gray-300 dark:rounded-none dark:border-none">
      <div className="flex h-8 rounded-md bg-gray-100 px-3 pt-1 dark:rounded-none dark:bg-darkMode-800">
        <LightbulbOutlined className=" mr-2 mt-1 text-lg text-green-500" />
        <p className="mb-3 text-base font-bold capitalize dark:text-white">
          Description
        </p>
      </div>
      <TipTap
        classNameEditor="border-none dark:text-white"
        defaultValue={topic}
        editable={false}
      />
    </div>
  )
}
