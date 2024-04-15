import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  CodeSubmission,
  GetDetailSubmissionResponse,
  ResultTestCase,
  TStudentSubmissionResponse,
} from '@/apis'
import {
  GradeCodeParams,
  useGradeCodeExercise,
} from '@/apis/useGradeCodeExercise'
import { Form, FormInput } from '@/components/form'
import { useCheckRole, useToastMessage } from '@/hooks'
import { CodeExercise } from '@/pages/~enroll-exercise/code/CodeExercise'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Button } from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface Props {
  exercise: GetDetailSubmissionResponse['exercise']
  refetchSubmissions?: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<AxiosResponse<TStudentSubmissionResponse>>>
  resultTestCases?: ResultTestCase[]
  submissions: CodeSubmission
  toggleModal: () => void
}

export const DetailCode = ({
  exercise,
  refetchSubmissions,
  resultTestCases,
  submissions,
  toggleModal,
}: Props) => {
  const { score, submissionId, teacherComment } = submissions

  const { isTeacher } = useCheckRole()
  const { setErrorMessage, setSuccessMessage } = useToastMessage()

  const { isPending, mutate } = useGradeCodeExercise()

  const defaultValues = useMemo(
    () => ({
      submissionId,
      score: score === -1 ? undefined : score,
      comment: teacherComment,
    }),
    [teacherComment, submissionId, score],
  )

  const form = useForm<GradeCodeParams>({
    defaultValues,
  })

  const handleSubmit: SubmitHandler<GradeCodeParams> = async data => {
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
          refetchSubmissions?.()
          toggleModal()
          setSuccessMessage('Graded successfully')
        },
        onError: error =>
          setErrorMessage(error.response?.data.message || 'Grade failed'),
      },
    )
  }

  return (
    <div className="h-full">
      <Form form={form} onSubmit={handleSubmit}>
        <div className="col-span-12 mb-2">
          <div className="flex gap-2">
            <FormInput
              className="disabled-text-neutral-900 col-span-12"
              disabled={!isTeacher}
              label="Teacher comment"
              multiline
              name="comment"
              placeholder="Comment of teacher"
              rows={3}
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
          {isTeacher && (
            <div className="flex justify-end">
              <Button className="submitBtn" disabled={isPending} type="submit">
                Grade
              </Button>
            </div>
          )}
        </div>
      </Form>
      <CodeExercise
        exercise={exercise as CodeExerciseSchema}
        isReview
        isTimeOut={false}
        resultTestCases={resultTestCases}
        submissions={submissions}
      />
    </div>
  )
}
