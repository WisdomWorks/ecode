import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { TQuizSubmission, useSubmitQuizExercise } from '@/apis'
import { Loading } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Form } from '@/components/form'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage, useToggle } from '@/hooks'
import { TQuestion } from '@/pages/~course/~$courseId/~exercise/quiz/CreateQuizExercise'
import { QuizExerciseSchema } from '@/types/exercise.types'
import { cn } from '@/utils'

import { MultipleChoiceAnswer } from './MultipleChoiceAnswer'
import { SingleChoiceAnswer } from './SingleChoiceAnswer'
import { Button, ButtonGroup, TextField } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'

interface Props {
  exercise: QuizExerciseSchema
  isTimeOut: boolean
}

export const Quiz = ({ exercise, isTimeOut }: Props) => {
  const user = useAppStore(state => state.user)
  const navigate = useNavigate()
  const { setErrorMessage } = useToastMessage()
  const { exerciseId } = useParams({ from: '/enroll-exercise/$exerciseId' })

  const [openModal, toggleOpenModal] = useToggle()

  const { isPending, mutate } = useSubmitQuizExercise()

  const form = useForm<
    TQuizSubmission & {
      questions: TQuestion[]
    }
  >({
    defaultValues: {
      exerciseId,
      studentId: user?.userId || '',
      submission: exercise.questions.map(question => ({
        questionId: question.questionId,
        answers: [],
      })),
      questions: exercise.questions,
    },
  })

  useEffect(() => {
    if (isTimeOut) {
      form.handleSubmit(handleSubmit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeOut])

  const handleSubmit: SubmitHandler<TQuizSubmission> = data => {
    const { exerciseId, studentId, submission } = data
    mutate(
      {
        exerciseId,
        studentId,
        submission,
      },
      {
        onSuccess: () => {
          navigate({ to: '/' })
        },
        onError: error => {
          setErrorMessage(
            error.response?.data.message || 'Submit failed. Try again',
          )
        },
      },
    )
  }

  const { watch } = form

  if (isTimeOut || isPending) return <Loading />

  const { questions } = exercise

  return (
    <FormProvider {...form}>
      <Form
        className="flex h-full flex-col gap-4 overflow-hidden [&_.Mui-disabled]:disabled-text-neutral-900  [&_.MuiInputBase-root]:text-neutral-900"
        form={form}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <span className="text-lg font-semibold">
            {questions.length} Questions
          </span>
          <ButtonGroup className="flex flex-wrap">
            {questions.map((question, index) => {
              const isAnswered = watch(`submission.${index}.answers`).length > 0
              return (
                <Button
                  className={cn({
                    'bg-primary-500 text-white': isAnswered,
                  })}
                  key={question.questionId}
                  onClick={() => console.log(index)}
                >
                  {index + 1}
                </Button>
              )
            })}
          </ButtonGroup>
        </div>
        <div className="col-span-12 grid h-full grid-cols-12 gap-4 overflow-auto">
          {questions.map((question, index) => {
            const { choices, isMultipleChoice, questionId, title } = question

            return (
              <div
                className="col-span-12 grid grid-cols-12 gap-2 rounded-lg border-2 border-solid border-gray-500 p-4 shadow-md lg:col-span-6"
                key={questionId}
              >
                <div className="col-span-12 flex w-full items-center justify-between">
                  <span className="col-span-12 text-base font-semibold">
                    Question {index + 1}
                  </span>
                </div>
                <TextField
                  className="col-span-12"
                  disabled
                  fullWidth
                  value={title}
                />
                <div className="col-span-12 flex flex-col gap-2">
                  {!isMultipleChoice && (
                    <SingleChoiceAnswer choices={choices} index={index} />
                  )}
                  {isMultipleChoice && (
                    <MultipleChoiceAnswer choices={choices} index={index} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-end">
          <Button className="submitBtn" onClick={toggleOpenModal}>
            Submit
          </Button>
        </div>
      </Form>
      <ConfirmModal
        disableButton={isPending}
        isOpen={openModal}
        onClose={toggleOpenModal}
        onConfirm={form.handleSubmit(handleSubmit)}
        title="Please check your assignment carefully before submitting. Do you want to submit an assignment?"
        variant="confirm"
      />
    </FormProvider>
  )
}