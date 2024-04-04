interface Props {
  errorMessage?: string
}

export const Console = ({ errorMessage }: Props) => {
  return (
    <div className="overflow-auto p-4">
      {errorMessage && (
        <span className="text-sm text-danger-500">{errorMessage}</span>
      )}
    </div>
  )
}
