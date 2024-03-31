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

import { MultipleChoiceAnswer } from './MultipleChoiceAnswer'
import { SingleChoiceAnswer } from './SingleChoiceAnswer'
import { Button, TextField } from '@mui/material'
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

  console.log(exercise)

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
    // mutate(data, {
    //   onSuccess: () => {
    //     navigate({ to: '/' })
    //   },
    //   onError: error => {
    //     setErrorMessage(error.message)
    //   },
    // })

    console.log(data)
  }

  const { watch } = form

  if (isTimeOut || isPending) return <Loading />

  return (
    <FormProvider {...form}>
      <Form className="flex flex-col gap-4" form={form} onSubmit={handleSubmit}>
        <div className="col-span-12 grid h-full grid-cols-12 gap-4">
          {exercise.questions.map((question, index) => {
            const isMultipleChoice = false
            const { choices, questionId, title } = question

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
