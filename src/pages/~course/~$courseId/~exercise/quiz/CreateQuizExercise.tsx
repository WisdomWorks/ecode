import { useMemo } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useCreateQuizExercise, useUpdateQuizExercise } from '@/apis'
import { Form } from '@/components/form'
import { useToastMessage } from '@/hooks'
import { CreateExerciseInformation } from '@/pages/~course/components'
import { CreateQuizExerciseSchema } from '@/pages/~course/shema/createQuizExercise.schema'
import { Schema } from '@/types'
import { QuizExerciseSchema } from '@/types/exercise.types'
import {
  defaultDurationObj,
  defaultTimeWithoutSecond,
  getDateByMinutes,
} from '@/utils'

import { FormQuestion } from './FormQuestion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { getHours, getMinutes } from 'date-fns'

export type TQuestion = Schema['QuizQuestion'] & {
  isMultipleChoice?: boolean
}

export type TCreateQuiz = Omit<
  Schema['CreateQuizExerciseRequest'],
  'questions'
> & {
  durationObj: Date
  endDate: Date
  exerciseId: string
  noOfQuestions: number
  questions: TQuestion[]
  startDate: Date
}

const defaultQuestion: TQuestion = {
  title: '',
  isMultipleChoice: false,
  choices: [],
  answers: [],
  description: '',
}

interface Props {
  exercise?: QuizExerciseSchema
  handleBack: () => void
  isUpdate?: boolean
  topicId: string
}

export const CreateQuizExercise = ({
  exercise,
  handleBack,
  isUpdate = false,
  topicId,
}: Props) => {
  const { setErrorMessage } = useToastMessage()

  const { isPending: isPendingCreate, mutate: createExercise } =
    useCreateQuizExercise()
  const { isPending: isPendingUpdate, mutate: updateExercise } =
    useUpdateQuizExercise({
      exerciseId: exercise?.exerciseId || '',
    })

  const defaultValues = useMemo(
    () => ({
      questions: exercise?.questions.map(question => ({
        ...question,
        isMultipleChoice: question.answers.length > 1,
      })) || [defaultQuestion],
      noOfQuestions: 4,
      exerciseId: exercise?.exerciseId || '',
      topicId,
      startTime: '',
      endTime: '',
      key: exercise?.key || '',
      exerciseName: exercise?.exerciseName || '',
      durationTime: exercise?.durationTime || 0,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise, topicId],
  )

  const form = useForm<TCreateQuiz>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateQuizExerciseSchema),
  })

  // console.log(form.formState.errors)

  const onSubmit: SubmitHandler<TCreateQuiz> = data => {
    const { durationObj, endDate, questions, startDate, ...rest } = data

    const questionDoNotHaveTitle = questions.findIndex(
      question => !question.title,
    )
    if (questionDoNotHaveTitle > -1) {
      return setErrorMessage(
        `Please fill the title in question ${questionDoNotHaveTitle + 1}`,
      )
    }

    const questionDoNotHaveChoices = questions.findIndex(
      question =>
        question.choices.some(choice => !choice.content) ||
        !question.choices.length,
    )
    if (questionDoNotHaveChoices > -1) {
      return setErrorMessage(
        `Please fill all choices in question ${questionDoNotHaveChoices + 1}`,
      )
    }

    const questionDoNotHaveAnswers = questions.findIndex(
      question =>
        question.answers.some(answer => !answer.content) ||
        !question.answers.length,
    )
    if (questionDoNotHaveAnswers > -1) {
      return setErrorMessage(
        `Please choose the answer in question ${questionDoNotHaveAnswers + 1}`,
      )
    }

    const durationTime = getHours(durationObj) * 60 + getMinutes(durationObj)
    const startTime = startDate.toISOString()
    const endTime = endDate.toISOString()

    if (isUpdate) {
      updateExercise(
        {
          ...rest,
          durationTime,
          startTime,
          endTime,
          questions,
        },
        {
          onSuccess: () => {
            handleBack()
          },
        },
      )
      return
    }

    createExercise(
      {
        ...rest,
        durationTime,
        startTime,
        endTime,
        questions,
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
    <FormProvider {...form}>
      <Form
        className="mt-4 grid grid-cols-12 gap-4"
        form={form}
        onSubmit={onSubmit}
      >
        <h2 className="col-span-12 text-2xl font-bold">
          {isUpdate ? 'Update ' : 'Create '} Quiz Exercise
        </h2>
        <CreateExerciseInformation control={control} />

        <Typography className="col-span-12" variant="h5">
          Exercise Question
        </Typography>

        <FormQuestion defaultQuestion={defaultQuestion} />

        <div className="col-span-12 flex justify-end">
          <Button
            className="submitBtn"
            disabled={isPendingCreate || isPendingUpdate}
            type="submit"
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </FormProvider>
  )
}
