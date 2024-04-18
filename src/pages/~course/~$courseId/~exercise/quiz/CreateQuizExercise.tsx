import { useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import {
  useCreateQuizExercise,
  useCreateQuizExerciseByExcel,
  useUpdateQuizExercise,
} from '@/apis'
import { Form, FormRadioGroup } from '@/components/form'
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

import { FormExcelQuestion } from './FormExcelQuestion'
import { FormQuestion } from './FormQuestion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Typography } from '@mui/material'
import { getHours, getMinutes } from 'date-fns'

export type TQuestion = Schema['QuizQuestion'] & {
  isMultipleChoice?: boolean
}

enum CreateOption {
  Excel = 'excel',
  Manual = 'manual',
}

export type TCreateQuiz = Omit<
  Schema['CreateQuizExerciseRequest'],
  'questions'
> & {
  createOption: CreateOption
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
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const [files, setFiles] = useState<FileList | null>(null)

  const { isPending: isPendingCreate, mutate: createExercise } =
    useCreateQuizExercise()
  const { isPending: isPendingUpdate, mutate: updateExercise } =
    useUpdateQuizExercise({
      exerciseId: exercise?.exerciseId || '',
    })

  const { isPending: isPendingCreateByExcel, mutate: createExerciseByExcel } =
    useCreateQuizExerciseByExcel()

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
      reAttempt: exercise?.reAttempt || 1,
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
      createOption: CreateOption.Manual,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exercise, topicId],
  )

  const form = useForm<TCreateQuiz>({
    defaultValues,
    mode: 'all',
    resolver: zodResolver(CreateQuizExerciseSchema),
  })

  const onSubmit: SubmitHandler<TCreateQuiz> = data => {
    const {
      createOption,
      durationObj,
      endDate,
      questions,
      reAttempt,
      startDate,
      ...rest
    } = data

    if (createOption === CreateOption.Manual) {
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
          `Please choose the answer in question ${
            questionDoNotHaveAnswers + 1
          }`,
        )
      }
    }

    const durationTime = getHours(durationObj) * 60 + getMinutes(durationObj)
    const startTime = startDate.toISOString()
    const endTime = endDate.toISOString()

    if (isUpdate) {
      updateExercise(
        {
          ...rest,
          reAttempt: Number(reAttempt),
          durationTime,
          startTime,
          endTime,
          questions,
        },
        {
          onSuccess: () => {
            setSuccessMessage('Update exercise successfully')
            handleBack()
          },
          onError: error =>
            setErrorMessage(
              error.response?.data.message || "Can't submit. Try again!",
            ),
        },
      )
      return
    }

    const createRequest = {
      ...rest,
      durationTime,
      startTime,
      endTime,
      questions,
    }

    if (createOption === CreateOption.Manual) {
      createExercise(createRequest, {
        onSuccess: () => {
          setSuccessMessage('Create exercise successfully')
          handleBack()
        },
        onError: error =>
          setErrorMessage(
            error.response?.data.message || "Can't submit. Try again!",
          ),
      })
      return
    }

    const formData = new FormData()

    if (!files) {
      return setErrorMessage('Please upload a file')
    }

    formData.append('topicId', rest.topicId)
    formData.append('exerciseName', rest.exerciseName)
    formData.append('key', rest.key)
    formData.append('startTime', startTime)
    formData.append('endTime', endTime)
    formData.append('durationTime', String(durationTime))
    formData.append('reAttempt', String(reAttempt))
    formData.append('file', files[0])

    createExerciseByExcel(formData, {
      onSuccess: () => {
        setSuccessMessage('Create exercise successfully')
        handleBack()
      },
      onError: error =>
        setErrorMessage(
          error.response?.data.message || "Can't submit. Try again!",
        ),
    })
  }

  const {
    control,
    formState: { isValid },
    watch,
  } = form

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

        {isUpdate ? null : (
          <FormRadioGroup
            className="flex flex-col"
            containerClassName="col-span-12"
            name="createOption"
            options={[
              {
                value: CreateOption.Manual,
                label: 'Create question manually',
              },
              {
                value: CreateOption.Excel,
                label: 'Create by excel file',
              },
            ]}
          />
        )}

        {watch('createOption') === CreateOption.Excel ? (
          <FormExcelQuestion
            files={files}
            isPendingCreateByExcel={isPendingCreateByExcel}
            setFiles={setFiles}
          />
        ) : (
          <FormQuestion defaultQuestion={defaultQuestion} />
        )}

        <div className="col-span-12 flex justify-end gap-2">
          {!isValid && (
            <Alert severity="info">Complete the form before submitting</Alert>
          )}

          <Button
            className="submitBtn"
            disabled={
              isPendingCreate || isPendingUpdate || isPendingCreateByExcel
            }
            type="submit"
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </FormProvider>
  )
}
