import { useEffect, useState } from 'react'

import { useEnrollExercise } from '@/apis'
import { CountDownTimer, Loading } from '@/components/common'
import { ExerciseType } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { useRoute } from '@/hooks'
import { EssayExerciseSchema, QuizExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm, parseTimeToMilliseconds } from '@/utils'

import { Essay } from './essay/Essay'
import { Quiz } from './quiz/Quiz'
import { Chip } from '@mui/material'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const EnrollExercise = () => {
  const { location, navigate } = useRoute()
  const { exerciseId } = useParams({ from: '/enroll-exercise/$exerciseId' })
  const [isTimeOut, setIsTimeOut] = useState(false)

  const user = useAppStore(state => state.user)

  const [exercise, setExercise] = useState<
    | ({
        timeLess?: string
      } & (EssayExerciseSchema | QuizExerciseSchema))
    | null
  >(null)
  const { isPending, mutate: getExercise } = useEnrollExercise()

  useEffect(() => {
    const keyExercise =
      'keyExercise' in location.state
        ? (location.state.keyExercise as string)
        : null

    getExercise(
      {
        exerciseId,
        key: String(keyExercise),
        studentId: user?.userId || '',
      },
      {
        onSuccess: data => setExercise(data.data),
        onError: () => navigate({ to: '/' }),
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!exercise || isPending) return <Loading />

  const { durationTime, endTime, exerciseName, startTime, timeLess, type } =
    exercise

  return (
    <div className="grid h-screen w-screen grid-rows-12 gap-4 overflow-hidden p-8">
      <div className="row-span-2 flex justify-between overflow-auto rounded-lg p-4 shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="mb-2 flex items-center gap-4">
            <Chip
              className="capitalize"
              color="primary"
              label={type}
              variant="outlined"
            />
            <h3 className="text-2xl text-neutral-900">{exerciseName}</h3>
          </div>

          <div className="">
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
        </div>

        <div>
          <CountDownTimer
            milliseconds={parseTimeToMilliseconds(timeLess || '00:00:00')}
            onEnd={() => {
              setIsTimeOut(true)
            }}
          />
        </div>
      </div>

      <div className="row-span-10 overflow-hidden rounded-lg p-4 shadow-2xl">
        {type === ExerciseType.ESSAY && (
          <Essay
            exercise={exercise as EssayExerciseSchema}
            isTimeOut={isTimeOut}
          />
        )}

        {type === ExerciseType.QUIZ && (
          <Quiz
            exercise={exercise as QuizExerciseSchema}
            isTimeOut={isTimeOut}
          />
        )}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/enroll-exercise/$exerciseId')({
  component: EnrollExercise,
})
