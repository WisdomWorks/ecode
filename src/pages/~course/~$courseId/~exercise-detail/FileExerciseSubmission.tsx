import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useSubmitFileExercise } from '@/apis'
import { FileUpload } from '@/components/common'
import { Form } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage } from '@/hooks'

import { Button } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'

type TForm = {
  exerciseId: string
  question: string
  studentId: string
}

interface Props {
  available: boolean
  exerciseId: string
  question: string
}

export const FileExerciseSubmission = ({
  available,
  exerciseId,
  question,
}: Props) => {
  const user = useAppStore(state => state.user)
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const navigate = useNavigate()
  const { courseId } = useParams({ from: '/course/$courseId/' })

  const [files, setFiles] = useState<FileList | null>(null)

  const { isPending, mutate } = useSubmitFileExercise()

  const form = useForm<TForm>({
    defaultValues: {
      studentId: user?.userId || '',
      exerciseId,
      question,
    },
  })

  const handleSubmit: SubmitHandler<TForm> = data => {
    if (!files) {
      return setErrorMessage('Please upload a file')
    }
    const { exerciseId, studentId } = data
    const formData = new FormData()

    formData.append('exerciseId', exerciseId)
    formData.append('studentId', studentId)
    formData.append('file', files[0])

    mutate(formData, {
      onSuccess: () => {
        setSuccessMessage('Submit exercise successfully')
        navigate({
          to: '/course/$courseId',
          params: {
            courseId,
          },
          replace: true,
        })
      },
      onError: error =>
        setErrorMessage(
          error.response?.data.message || "Can't submit. Try again!",
        ),
    })
  }

  const { control } = form

  return (
    <Form className="flex flex-col gap-4" form={form} onSubmit={handleSubmit}>
      <FormTipTap
        classNameEditor="min-h-[4rem]"
        control={control}
        editable={false}
        label="Question"
        name="question"
      />

      <div className="col-span-9">
        <FileUpload
          files={files}
          loading={isPending}
          name="file"
          setFiles={setFiles}
        />
      </div>

      <div className="flex justify-end">
        <Button
          className="submitBtn"
          disabled={!available || isPending}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  )
}
