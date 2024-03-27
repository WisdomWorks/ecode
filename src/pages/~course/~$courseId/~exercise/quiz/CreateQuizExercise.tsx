import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useCreateQuizExercise, useUpdateQuizExercise } from '@/apis'
import { Form } from '@/components/form'
import { useToastMessage } from '@/hooks'
import { CreateExerciseInformation } from '@/pages/~course/components'
import { useCourseContext } from '@/pages/~course/context/course.context'
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
  const { refetchTopics } = useCourseContext()
  const { setErrorMessage } = useToastMessage()

  const { isPending: isPendingCreate, mutate: createExercise } =
    useCreateQuizExercise()
  const { isPending: isPendingUpdate, mutate: updateExercise } =
    useUpdateQuizExercise()

  const form = useForm<TCreateQuiz>({
    defaultValues: {
      questions: exercise?.questions || [defaultQuestion],
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
    },
    mode: 'onChange',
    resolver: zodResolver(CreateQuizExerciseSchema),
  })

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

    console.log(data)

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
            refetchTopics?.()
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
          refetchTopics?.()
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
          {isUpdate ? 'Update ' : 'Create '} Essay Exercise
        </h2>
        <CreateExerciseInformation control={control} />

        <Typography className="col-span-12" variant="h5">
          Exercise Question
        </Typography>

        {/* <div className="col-span-12 flex items-center gap-2">
          <span className="text-sm font-bold">
            Default number of questions:
          </span>
          <FormInput
            className="w-20"
            control={control}
            extraOnchange={e => {
              const value = e.target.value
              console.log(value)

              if (+value > 5) setValue('noOfQuestions', 5)
              if (+value < 2) setValue('noOfQuestions', 2)
            }}
            inputProps={{
              min: 2,
              max: 5,
              className: 'text-center',
            }}
            name="noOfQuestions"
            type="number"
          />
        </div> */}

        <FormQuestion defaultQuestion={defaultQuestion} />

        <div className="col-span-12 flex justify-end">
          <Button
            className="submitBtn"
            disabled={isPendingCreate || isPendingUpdate}
            type="submit"
          >
            Create
          </Button>
        </div>
      </Form>
    </FormProvider>
  )
}
