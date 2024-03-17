import { Backdrop, CircularProgress } from '@mui/material'

export const BackDropLoading = () => {
  return (
    <Backdrop className="z-50 text-primary-500" open>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
