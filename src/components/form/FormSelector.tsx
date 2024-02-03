import { Controller, UseControllerProps } from 'react-hook-form'

import { OptionSelector, OptionSelectProps } from '..'

type Props<
  TForm extends object,
  TData extends object,
> = OptionSelectProps<TData> & UseControllerProps<TForm>

export const FormSelector = <TForm extends object, TData extends object>({
  className,
  clearOnBlur = true,
  control,
  getOptionLabel,
  label = 'Select Option',
  name,
  options = [],
  renderInput,
}: Props<TForm, TData>) => {
  return (
    <Controller<TForm>
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value } }) => {
        return (
          <OptionSelector<TData>
            className={className}
            clearOnBlur={clearOnBlur}
            getOptionLabel={getOptionLabel}
            label={label}
            onBlur={onBlur}
            onChange={(_, data) => onChange(data)}
            options={options}
            renderInput={renderInput}
            value={value}
          />
        )
      }}
    />
  )
}
