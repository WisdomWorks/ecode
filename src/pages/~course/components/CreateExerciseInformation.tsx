import { Control, FieldValues, Path } from 'react-hook-form'

import { FormInput, FormInputPassword } from '@/components/form'
import { FormTimePicker } from '@/components/form/FormTimePicker'
import { ExerciseType } from '@/constants'

import { DateTimeExercise } from './DateTimeExercise'
import { ArrowDownward } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'

interface Props<T extends FieldValues> {
  control: Control<T>
  exerciseType?: ExerciseType
}

export const CreateExerciseInformation = <T extends FieldValues>({
  control,
  exerciseType,
}: Props<T>) => {
  return (
    <Accordion className="col-span-12" defaultExpanded>
      <AccordionSummary
        aria-controls="panel1-content"
        className="p-0"
        expandIcon={<ArrowDownward />}
        id="panel1-header"
      >
        <Typography variant="h5">Exercise Information</Typography>
      </AccordionSummary>

      <AccordionDetails className="grid grid-cols-12 gap-2">
        <FormInput
          className="col-span-6"
          control={control}
          label="Exercise Title"
          name={'exerciseName' as Path<T> & (string | undefined)}
          required
        />
        {exerciseType !== ExerciseType.FILE && (
          <FormInputPassword
            className="col-span-4"
            control={control}
            label="Enrollment Key"
            name={'key' as Path<T> & (string | undefined)}
            required
          />
        )}
        <FormInput
          className="col-span-2"
          control={control}
          label="Attempt Limit"
          name={'reAttempt' as Path<T> & (string | undefined)}
          required
          type="number"
        />

        <DateTimeExercise className="col-span-8" control={control} />
        <FormTimePicker
          ampm={false}
          className="col-span-2"
          control={control}
          label="Duration"
          name={'durationObj' as Path<T> & (string | undefined)}
          required
        />
      </AccordionDetails>
    </Accordion>
  )
}
