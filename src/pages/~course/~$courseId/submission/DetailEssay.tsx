import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { GradeEssayParams, useGradeEssay } from '@/apis'
import { Form, FormInput } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { useToastMessage } from '@/hooks'

import { Button } from '@mui/material'

interface Props {
  essaySubmissionId: string
  score?: number
  submission: string
}

type TForm = GradeEssayParams & {
  submission: string
}

export const DetailEssay = ({
  essaySubmissionId,
  score,
  submission,
}: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()

  const { isPending, mutate } = useGradeEssay()

  const defaultValues = useMemo(
    () => ({
      essaySubmissionId,
      score: score === -1 ? undefined : score,
      submission,
    }),
    [essaySubmissionId, score, submission],
  )

  const form = useForm<TForm>({
    defaultValues,
  })

  const handleSubmit: SubmitHandler<TForm> = data => {
    if (data.score > 10 || data.score < 0 || !data.score) {
      setErrorMessage('Score must be between 0 and 10')
      return
    }

    mutate(
      {
        score: data.score,
        essaySubmissionId: data.essaySubmissionId,
      },
      {
        onSuccess: () => {
          setSuccessMessage('Graded successfully')
        },
        onError: error =>
          setErrorMessage(error.response?.data.message || 'Grade failed'),
      },
    )
  }

  return (
    <>
      <Form
        className="flex h-full flex-col gap-4 overflow-auto"
        form={form}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 overflow-auto">
          <div className="flex gap-4">
            <FormTipTap
              classNameEditor="min-h-[8rem] max-h-[8rem] overflow-auto"
              disabled
              editable={false}
              label="Topic"
              name="topic"
            />

            <FormInput
              className="w-fit"
              label="Score"
              name="score"
              placeholder="Grade"
              type="number"
            />
          </div>
          <FormTipTap
            classNameEditor="min-h-[22rem]"
            editable={false}
            label="Student answer"
            name="submission"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button className="submitBtn" disabled={isPending} type="submit">
            Grade
          </Button>
        </div>
      </Form>
    </>
  )
}
