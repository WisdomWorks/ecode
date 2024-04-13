import { EmptyContentIcon } from './icons'

interface Props {
  label?: string
}

export const EmptyContent = ({ label = 'No content' }: Props) => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <EmptyContentIcon className="h-80 w-96" />
      <p className="text-lg font-bold capitalize text-neutral-900">{label}</p>
    </div>
  )
}
