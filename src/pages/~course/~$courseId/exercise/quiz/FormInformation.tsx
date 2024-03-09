import { useFormContext } from 'react-hook-form'

import { FormDateTimePicker, FormInput } from '@/components/form'

import { Divider } from '@mui/material'

export const FormInformation = () => {
  const { control } = useFormContext()
  return (
    <>
      <div className="col-span-6 flex justify-center gap-2">
        <FormDateTimePicker
          control={control}
          label="Start date"
          name="startTime"
          required
        />
        <div className="flex h-full items-center justify-center">
          <Divider
            className="h-[0.75px] w-3 bg-neutral-900"
            orientation="vertical"
          />
        </div>
        <FormDateTimePicker
          control={control}
          label="End Date"
          name="endTime"
          required
        />
      </div>

      <h3 className="col-span-12 text-xl font-bold">Questions</h3>
      <div className="col-span-12 flex items-center gap-2">
        <span className="text-sm font-bold">Default number of questions:</span>
        <FormInput
          className="w-20"
          control={control}
          inputProps={{ min: 2, max: 5, className: 'text-center' }}
          name="noOfQuestions"
          type="number"
        />
      </div>
    </>
  )
}
