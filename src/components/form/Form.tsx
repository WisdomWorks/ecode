import {
  Children,
  createElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react'
import {
  Control,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

import { GridProps } from '@mui/material'

type Props<TForm extends FieldValues> = Omit<GridProps, 'onSubmit'> & {
  className?: string
  form: UseFormReturn<TForm>
  onSubmit: SubmitHandler<TForm>
}

const processChild = <TForm extends FieldValues>(
  child: ReactNode,
  control?: Control<TForm, unknown>,
): ReactNode => {
  if (!isValidElement(child)) {
    return child
  }

  const { props, type } = child as ReactElement

  const { children, name } = props

  if (children) {
    const processedChildren = Children.map(children, nestedChild =>
      processChild(nestedChild, control),
    )
    return createElement(type, { ...props }, processedChildren)
  }

  if (name) {
    return createElement(type, {
      ...props,
      control,
      key: name,
    })
  }

  return child
}

export const Form = <TForm extends FieldValues>({
  children,
  className,
  form,
  onSubmit,
}: PropsWithChildren<Props<TForm>>) => {
  const { control, handleSubmit } = form

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {Children.map(children, child => processChild(child, control))}
    </form>
  )
}
