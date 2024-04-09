import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { GradeEssayParams, useGradeFileExercise } from '@/apis'
import { Form, FormInput } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { useCheckRole, useToastMessage } from '@/hooks'

import { Button } from '@mui/material'

interface Props {
  comment: string
  question: string
  score?: number
  submission: string
  submissionId: string
}

type TForm = GradeEssayParams & {
  question: string
  submission: string
}

export const DetailFile = ({
  comment,
  question,
  score,
  submission,
  submissionId,
}: Props) => {
  const { isTeacher } = useCheckRole()
  const { setErrorMessage, setSuccessMessage } = useToastMessage()

  const { isPending, mutate } = useGradeFileExercise()

  const defaultValues = useMemo(
    () => ({
      submissionId,
      score: score === -1 ? undefined : score,
      submission,
      topic: question,
      comment,
    }),
    [comment, submissionId, question, score, submission],
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
        submissionId: data.submissionId,
        comment: data.comment,
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
        className="flex h-full flex-col gap-4"
        form={form}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <FormTipTap
              classNameEditor="min-h-[8rem] max-h-[8rem] overflow-y-auto"
              disabled
              editable={false}
              label="Topic"
              name="topic"
            />

            {isTeacher && (
              <FormInput
                className="w-fit"
                label="Score"
                name="score"
                placeholder="Grade"
                type="number"
              />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Student submission</span>
            <a
              className=" truncate text-blue-500"
              href={submission}
              rel="noreferrer"
              target="_blank"
            >
              Download file
            </a>
          </div>

          <FormInput
            className="col-span-12"
            disabled={!isTeacher}
            label="Teacher comment"
            multiline
            name="comment"
            placeholder="Comment of teacher"
            rows={3}
          />
        </div>

        {isTeacher && (
          <div className="flex justify-end">
            <Button className="submitBtn" disabled={isPending} type="submit">
              Grade
            </Button>
          </div>
        )}
      </Form>
    </>
  )
}
