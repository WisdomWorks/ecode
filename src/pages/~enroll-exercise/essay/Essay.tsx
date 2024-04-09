import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { EssaySubmission, useSubmitEssayExercise } from '@/apis'
import { Loading } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Form } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage, useToggle } from '@/hooks'
import { useConfirmTabClose } from '@/hooks/useConfirmTabClose'
import { EssayExerciseSchema } from '@/types/exercise.types'

import { Button } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'

interface Props {
  exercise: EssayExerciseSchema
  isTimeOut: boolean
}

export const Essay = ({ exercise, isTimeOut }: Props) => {
  useConfirmTabClose()
  const user = useAppStore(state => state.user)
  const navigate = useNavigate()
  const { setErrorMessage } = useToastMessage()
  const { exerciseId } = useParams({ from: '/enroll-exercise/$exerciseId' })

  const [openModal, toggleOpenModal] = useToggle()

  const { isPending, mutate } = useSubmitEssayExercise()

  const form = useForm<
    EssaySubmission & {
      topic: string
    }
  >({
    defaultValues: {
      studentId: user?.userId,
      exerciseId,
      submission: '',
      topic: exercise.question,
    },
  })

  useEffect(() => {
    if (isTimeOut) {
      form.handleSubmit(handleSubmit)()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeOut])

  const handleSubmit: SubmitHandler<EssaySubmission> = data => {
    const { exerciseId, studentId, submission } = data

    mutate(
      {
        exerciseId,
        studentId,
        submission,
      },
      {
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Submission failed. Try again',
          ),
        onSuccess: () => navigate({ to: '/', replace: true }),
      },
    )
  }

  if (isTimeOut || isPending) return <Loading />

  return (
    <>
      <Form
        className="flex h-full flex-col gap-6 overflow-hidden"
        form={form}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 overflow-auto px-16 py-8">
          <FormTipTap
            classNameEditor="max-h-[15rem] overflow-auto"
            disabled
            editable={false}
            label="Topic"
            name="topic"
          />
          <FormTipTap
            classNameEditor="min-h-[22rem] max-h-[25rem] overflow-auto"
            label="Your answer"
            name="submission"
            required
          />
        </div>

        <div className="flex justify-end border border-solid border-gray-200 py-2 pb-3 pr-5">
          <Button className="submitBtn" onClick={toggleOpenModal}>
            SUBMIT
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
    </>
  )
}
