import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { OptionSelector, OptionSelectProps } from '../selector/OptionSelector'

type Props<TForm extends FieldValues, TData> = OptionSelectProps<TData> &
  UseControllerProps<TForm>

export const FormSelector = <TForm extends FieldValues, TData>({
  className,
  clearOnBlur = true,
  control,
  getOptionLabel,
  label = 'Select Option',
  multiple,
  name,
  options = [],
  renderInput,
  required,
}: Props<TForm, TData>) => {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController<TForm>({
    name,
    control,
  })

  return (
    <OptionSelector<TData>
      className={className}
      clearOnBlur={clearOnBlur}
      error={!!error}
      getOptionLabel={getOptionLabel}
      helperText={error?.message}
      label={label}
      multiple={multiple}
      onBlur={onBlur}
      onChange={(_, data) => onChange(data)}
      options={options}
      renderInput={renderInput}
      required={required}
      value={value}
    />
  )
}
