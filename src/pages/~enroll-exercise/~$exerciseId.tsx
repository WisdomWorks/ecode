import { useEffect, useState } from 'react'

import { useEnrollExercise } from '@/apis'
import Logo from '@/assets/logo.png'
import { CountDownTimer, Loading } from '@/components/common'
import { ExerciseType } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { useRoute } from '@/hooks'
import {
  CodeExerciseSchema,
  EssayExerciseSchema,
  QuizExerciseSchema,
} from '@/types/exercise.types'
import { cn, formatDDMMyyyyHHmm, parseTimeToMilliseconds } from '@/utils'

import { CodeExercise } from './code/CodeExercise'
import { Essay } from './essay/Essay'
import { Quiz } from './quiz/Quiz'
import { CodeOutlined } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const EnrollExercise = () => {
  const { location, navigate } = useRoute()
  const { exerciseId } = useParams({ from: '/enroll-exercise/$exerciseId' })
  const [isTimeOut, setIsTimeOut] = useState(false)

  const user = useAppStore(state => state.user)

  const [exercise, setExercise] = useState<
    | ({
        timeLess?: string
      } & (CodeExerciseSchema | EssayExerciseSchema | QuizExerciseSchema))
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
    <div
      className={cn('grid h-screen w-screen grid-rows-12 overflow-hidden', {
        'gap-4': type !== ExerciseType.CODE,
      })}
    >
      <div className="row-span-2 grid grid-cols-12">
        <div className="col-span-12 h-12 border border-gray-300 bg-[#F0F0F0] px-5 py-2">
          <div className="mb-2 flex items-center gap-4">
            <img
              alt="Logo"
              className="size-7 rounded-full object-contain"
              src={Logo}
            />
            <Divider className=" bg-white" orientation="vertical" />
            <CodeOutlined className=" text-gray-400" />
            <p className="text-lg text-gray-900">{exerciseName}</p>
          </div>
        </div>
        <div className=" col-span-12 flex items-center justify-between overflow-auto rounded-lg px-7 min-h-24 shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-4">
              <span className="w-[5rem] text-base font-bold">Start time</span>
              <span className=" text-sm text-neutral-500">
                {formatDDMMyyyyHHmm(new Date(startTime))}
              </span>
            </div>

            <div className="flex items-end gap-4">
              <span className="w-[5rem] text-base font-bold">End time</span>
              <span className=" text-sm text-neutral-500">
                {formatDDMMyyyyHHmm(new Date(endTime))}
              </span>
            </div>

            <div className="flex items-end gap-4">
              <span className="w-[5rem] text-base font-bold">Duration</span>
              <span className=" text-sm text-neutral-500">
                {durationTime} minutes
              </span>
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
      </div>

      <div className="row-span-10 overflow-hidden rounded-lg shadow-2xl">
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

        {type === ExerciseType.CODE && (
          <CodeExercise
            exercise={exercise as CodeExerciseSchema}
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
