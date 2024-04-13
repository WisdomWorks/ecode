import { Control, FieldValues, Path } from 'react-hook-form'

import { FormDateTimePicker } from '@/components/form'
import { cn } from '@/utils'

import { Divider } from '@mui/material'

interface Props<T extends FieldValues> {
  className?: string
  control: Control<T>
  endDateName?: string
  startDateName?: string
}

export const DateTimeExercise = <T extends FieldValues>({
  className,
  control,
  endDateName = 'endDate',
  startDateName = 'startDate',
}: Props<T>) => {
  return (
    <div className={cn('flex justify-center gap-2', className)}>
      <FormDateTimePicker
        ampm={false}
        control={control}
        label="Start Date"
        name={startDateName as Path<T> & (string | undefined)}
        required
      />
      <div className="mt-12 flex h-full justify-center">
        <Divider
          className="h-[0.75px] w-3 bg-neutral-900"
          orientation="vertical"
        />
      </div>
      <FormDateTimePicker
        ampm={false}
        control={control}
        label="End Date"
        name={endDateName as Path<T> & (string | undefined)}
        required
      />
    </div>
  )
}
