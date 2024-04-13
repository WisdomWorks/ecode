import { useSnackbar } from 'notistack'

export const useToastMessage = () => {
  const { enqueueSnackbar } = useSnackbar()

  const setSuccessMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' })
  }

  const setErrorMessage = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' })
  }

  return {
    setSuccessMessage,
    setErrorMessage,
  }
}
