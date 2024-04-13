import { CircularProgress } from '@mui/material'

export const Loading = () => {
  return (
    <div className="z-50 flex size-full items-center justify-center text-primary-500">
      <CircularProgress color="inherit" />
    </div>
  )
}
