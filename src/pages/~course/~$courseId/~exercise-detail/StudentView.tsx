import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IEnrollExercise, useEnrollExercise, usePreviewExercise } from '@/apis'
import { Loading } from '@/components/common'
import { Form, FormInputPassword } from '@/components/form'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage } from '@/hooks'
import { formatDDMMyyyyHHmm } from '@/utils'
import { checkIsOnGoing } from '@/utils/course.utils'

import {
  ArrowBackIos,
  QuizRounded,
  CodeRounded,
  MenuBookRounded,
  LinkOutlined,
} from '@mui/icons-material'
import { Alert, Button, Divider } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ExerciseType } from '@/constants'

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

  const Icon = () => {
    switch (type) {
      case ExerciseType.QUIZ:
        return <QuizRounded className="mt-1 size-6" />
      case ExerciseType.CODE:
        return <CodeRounded className="mt-1 size-6" />
      case ExerciseType.ESSAY:
        return <MenuBookRounded className="mt-1 size-6" />
      default:
        return <LinkOutlined className="mt-1 size-6" />
    }
  }

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
            <Icon />
            <h3 className="text-2xl text-neutral-900">{exerciseName}</h3>
          </div>

          <Divider />

          <div className="mb-2 flex items-center gap-4">
            <Alert
              severity={!available ? 'error' : isOnGoing ? 'info' : 'warning'}
              className=" w-full"
            >
              {!available
                ? 'You have attempted more than the allowed number of times'
                : isOnGoing
                  ? 'Enter the key to start the exercise'
                  : 'The exercise is not available now'}
            </Alert>
          </div>

          <div className="flex items-end gap-4">
            <span className="w-[5rem] text-base font-bold">Start time:</span>
            <span className=" text-sm text-neutral-600">
              {formatDDMMyyyyHHmm(new Date(startTime))}
            </span>
          </div>

          <div className="flex items-end gap-4">
            <span className="w-[5rem] text-base font-bold">End time:</span>
            <span className=" text-sm text-neutral-600">
              {formatDDMMyyyyHHmm(new Date(endTime))}
            </span>
          </div>

          {/* <div className="flex items-end gap-4">
            <span className="w-[5rem] text-base font-bold">Duration:</span>
            <span className=" text-sm text-neutral-600">
              {durationTime} minutes
            </span>
          </div> */}
        </div>

        <Form
          className="flex w-full flex-col justify-center items-center mt-3"
          form={form}
          onSubmit={handleSubmit}
        >
          <h3 className="mb-2">Attempt the exercise</h3>
          <span className=" text-sm text-neutral-400">
            {durationTime} minutes
          </span>

          <FormInputPassword
            control={control}
            disabled={!isOnGoing || isPending || !available}
            label="Enter the enrollment key"
            name="key"
            className="w-1/2 my-5"
          />
          <Button
            className="submitBtn w-1/2"
            disabled={!isOnGoing || isPending || !watch('key') || !available}
            type="submit"
          >
            Attempt
          </Button>
        </Form>
      </div>
    </>
  )
}
