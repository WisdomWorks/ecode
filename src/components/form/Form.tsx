import { PropsWithChildren } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

type Props<TForm extends object> = {
  className?: string
  form: UseFormReturn<TForm>
  onSubmit: SubmitHandler<TForm>
}

export const Form = <TForm extends object>({
  children,
  className,
  form,
  onSubmit,
}: PropsWithChildren<Props<TForm>>) => {
  const { handleSubmit } = form

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  )
}
