import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateEssayExercise, useUpdateEssayExercise } from '@/apis'
import { Form } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { CreateExerciseInformation } from '@/pages/~course/components'
import { CreateEssayExerciseSchema } from '@/pages/~course/shema/createEssayExercise.schema'
import { Schema } from '@/types'
import { EssayExerciseSchema } from '@/types/exercise.types'
import {
  defaultDurationObj,
  defaultTimeWithoutSecond,
  getDateByMinutes,
} from '@/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { getHours, getMinutes } from 'date-fns'

type TCreateEssay = Schema['CreateEssayExerciseRequest'] & {
  durationObj: Date
  endDate: Date
  exerciseId: string
  startDate: Date
}

interface Props {
  exercise?: EssayExerciseSchema
  handleBack: () => void
  isUpdate?: boolean
  topicId: string
}

export const CreateEssayExercise = ({
  exercise,
  handleBack,
  isUpdate = false,
  topicId,
}: Props) => {
  const { isPending: createPending, mutate: createEssay } =
    useCreateEssayExercise()
  const { isPending: updatePending, mutate: updateEssay } =
    useUpdateEssayExercise()

  const defaultValues = useMemo(
    () => ({
      exerciseId: exercise?.exerciseId || '',
      topicId,
      startTime: '',
      endTime: '',
      reAttempt: exercise?.reAttempt || 1,
      key: exercise?.key || '',
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

  const form = useForm<TCreateEssay>({
    defaultValues,
    resolver: zodResolver(CreateEssayExerciseSchema),
  })

  const onSubmit: SubmitHandler<TCreateEssay> = data => {
    const { durationObj, endDate, reAttempt, startDate, ...rest } = data

    const durationTime = getHours(durationObj) * 60 + getMinutes(durationObj)
    const startTime = startDate.toISOString()
    const endTime = endDate.toISOString()

    if (isUpdate) {
      updateEssay(
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

    createEssay(
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
        {isUpdate ? 'Update ' : 'Create '} Essay Exercise
      </h2>
      <CreateExerciseInformation control={control} />

      <Typography className="col-span-12" variant="h5">
        Exercise Question
      </Typography>
      <FormTipTap
        className="col-span-12"
        classNameEditor="min-h-[12rem]"
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
