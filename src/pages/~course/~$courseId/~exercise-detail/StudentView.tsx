import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IEnrollExercise, useEnrollExercise, usePreviewExercise } from '@/apis'
import { Loading } from '@/components/common'
import { Form, FormInputPassword } from '@/components/form'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage } from '@/hooks'
import { formatDDMMyyyyHHmm } from '@/utils'
import { checkIsOnGoing } from '@/utils/course.utils'

import { ArrowBackIos } from '@mui/icons-material'
import { Alert, Button, Chip } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'

interface Props {
  exerciseId: string
}
export const StudentView = ({ exerciseId }: Props) => {
  const { setErrorMessage } = useToastMessage()

  const { courseId } = useParams({ from: '/course/$courseId/' })
  const user = useAppStore(state => state.user)

  const navigate = useNavigate()

  const { data, isLoading } = usePreviewExercise({
    exerciseId,
    studentId: user?.userId || '',
  })
  const { isPending, mutate } = useEnrollExercise()

  const form = useForm<IEnrollExercise>({
    defaultValues: {
      studentId: user?.userId,
      exerciseId,
      key: '',
    },
  })

  const handleBack = useCallback(() => {
    navigate({
      to: '/course/$courseId',
      params: { courseId },
      state(prev) {
        return { ...prev, tab: 1 }
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading) return <Loading />

  const exercise = data?.data

  if (!exercise) return null

  const handleSubmit: SubmitHandler<IEnrollExercise> = dataForm => {
    mutate(
      { ...dataForm },
      {
        onError: error =>
          setErrorMessage(error.response?.data.message || 'The key is invalid'),
        onSuccess: data => {
          navigate({
            to: '/enroll-exercise/$exerciseId',
            params: {
              exerciseId: data.data.exerciseId || '',
            },
            state: prev => ({
              ...prev,
              keyExercise: dataForm.key,
            }),
          })
        },
      },
    )
  }

  const { control, watch } = form

  const { available, durationTime, endTime, exerciseName, startTime, type } =
    exercise

  const isOnGoing = checkIsOnGoing(startTime, endTime)

  return (
    <>
      <div className="flex w-full justify-start">
        <Button onClick={handleBack} variant="text">
          <ArrowBackIos className="size-4" />
          Back to Exercise
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <div className="mt-4 flex flex-col gap-2">
          <div className="mb-2 flex items-center gap-4">
            <Chip
              className="capitalize"
              color="primary"
              label={type}
              variant="outlined"
            />
            <h3 className="text-2xl text-neutral-900">{exerciseName}</h3>
          </div>

          <div className="flex items-end gap-4">
            <span className="w-[6rem] text-lg font-bold">Start time:</span>
            <span className="font-medium text-neutral-800">
              {formatDDMMyyyyHHmm(new Date(startTime))}
            </span>
          </div>

          <div className="flex items-end gap-4">
            <span className="w-[6rem] text-lg font-bold">End time:</span>
            <span className="font-medium text-neutral-800">
              {formatDDMMyyyyHHmm(new Date(endTime))}
            </span>
          </div>

          <div className="flex items-end gap-4">
            <span className="w-[6rem] text-lg font-bold">Duration:</span>
            <span className="font-medium text-neutral-800">
              {durationTime} minutes
            </span>
          </div>
        </div>

        <Form
          className="flex w-1/2 flex-col gap-2"
          form={form}
          onSubmit={handleSubmit}
        >
          <h3 className="mb-2">Attempt the exercise</h3>

          <Alert
            severity={!available ? 'error' : isOnGoing ? 'info' : 'warning'}
          >
            {!available
              ? 'You have attempted more than the allowed number of times'
              : isOnGoing
                ? 'Enter the key to start the exercise'
                : 'The exercise is not available now'}
          </Alert>
          <FormInputPassword
            control={control}
            disabled={!isOnGoing || isPending || !available}
            label="Enter the enrollment key"
            name="key"
          />
          <div className="flex justify-end">
            <Button
              className="submitBtn"
              disabled={!isOnGoing || isPending || !watch('key') || !available}
              type="submit"
            >
              Attempt
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}
