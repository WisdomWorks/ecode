import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateFileExercise, useUpdateFileExercise } from '@/apis'
import { Form } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { ExerciseType } from '@/constants'
import { CreateExerciseInformation } from '@/pages/~course/components'
import { CreateFileExerciseSchema } from '@/pages/~course/shema/createFileExercise.schema'
import { Schema } from '@/types'
import { FileExerciseSchema } from '@/types/exercise.types'
import {
  defaultDurationObj,
  defaultTimeWithoutSecond,
  getDateByMinutes,
} from '@/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { getHours, getMinutes } from 'date-fns'

type TCreateFile = Schema['CreateFileExerciseRequest'] & {
  durationObj: Date
  endDate: Date
  exerciseId: string
  startDate: Date
}

interface Props {
  exercise?: FileExerciseSchema
  handleBack: () => void
  isUpdate?: boolean
  topicId: string
}

export const CreateFileExercise = ({
  exercise,
  handleBack,
  isUpdate = false,
  topicId,
}: Props) => {
  const { isPending: createPending, mutate: createFile } =
    useCreateFileExercise()
  const { isPending: updatePending, mutate: updateFile } =
    useUpdateFileExercise()

  const defaultValues = useMemo(
    () => ({
      exerciseId: exercise?.exerciseId || '',
      topicId,
      startTime: '',
      endTime: '',
      reAttempt: exercise?.reAttempt || 1,
      exerciseName: exercise?.exerciseName || '',
      durationTime: exercise?.durationTime || 0,
      question: exercise?.question || '',
      durationObj: exercise?.durationTime
        ? getDateByMinutes(exercise.durationTime)
        : defaultDurationObj,
      startDate: exercise?.startTime
        ? new Date(exercise.startTime)
        : defaultTimeWithoutSecond,
      endDate: exercise?.endTime
        ? new Date(exercise.endTime)
        : defaultTimeWithoutSecond,
    }),
    [exercise, topicId],
  )

  const form = useForm<TCreateFile>({
    defaultValues,
    resolver: zodResolver(CreateFileExerciseSchema),
  })

  const onSubmit: SubmitHandler<TCreateFile> = data => {
    const { durationObj, endDate, reAttempt, startDate, ...rest } = data

    const durationTime = getHours(durationObj) * 60 + getMinutes(durationObj)
    const startTime = startDate.toISOString()
    const endTime = endDate.toISOString()

    if (isUpdate) {
      updateFile(
        {
          ...rest,
          reAttempt: Number(reAttempt),
          durationTime,
          startTime,
          endTime,
        },
        {
          onSuccess: () => {
            handleBack()
          },
        },
      )
      return
    }

    createFile(
      {
        ...rest,
        reAttempt: Number(reAttempt),
        durationTime,
        startTime,
        endTime,
      },
      {
        onSuccess: () => {
          handleBack()
        },
      },
    )
  }

  const { control } = form

  return (
    <Form
      className="mt-4 grid grid-cols-12 gap-4"
      form={form}
      onSubmit={onSubmit}
    >
      <h2 className="col-span-12 text-2xl font-bold">
        {isUpdate ? 'Update ' : 'Create '} File Exercise
      </h2>
      <CreateExerciseInformation
        control={control}
        exerciseType={ExerciseType.FILE}
      />

      <Typography className="col-span-12" variant="h5">
        Exercise Question
      </Typography>
      <FormTipTap
        className="col-span-12"
        classNameEditor="min-h-[12rem] max-h-[15rem] overflow-auto"
        control={control}
        label="Question"
        name="question"
        required
      />
      <div className="col-span-3"></div>

      <div className="col-span-12 flex justify-end">
        <Button
          className="submitBtn"
          disabled={createPending || updatePending}
          type="submit"
          variant="contained"
        >
          {isUpdate ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  )
}
