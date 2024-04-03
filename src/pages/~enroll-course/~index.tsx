import { SubmitHandler, useForm } from 'react-hook-form'

import { useEnrollCourse, useGetCourseDetail } from '@/apis'
import { Form, FormInputPassword } from '@/components/form'
import { useAppStore } from '@/context/useAppStore'
import { useRoute, useToastMessage } from '@/hooks'
import { beforeLoadProtected } from '@/utils'
import { getCourseLabel } from '@/utils/label.utils'

import { KeyboardDoubleArrowRight } from '@mui/icons-material'
import { Alert, Button, Divider } from '@mui/material'
import { createFileRoute, Link, Navigate } from '@tanstack/react-router'

interface TForm {
  enrollmentKey: string
}

export const EnrollCourse = () => {
  const {
    location: { search },
  } = useRoute()
  const user = useAppStore(state => state.user)

  const { mutate } = useEnrollCourse()
  const { setErrorMessage } = useToastMessage()

  const form = useForm<TForm>({
    defaultValues: {
      enrollmentKey: '',
    },
  })

  if (!('courseId' in search)) {
    return <Navigate to="/" />
  }

  const courseId = String(search.courseId)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: course } = useGetCourseDetail({ courseId })

  const onSubmit: SubmitHandler<TForm> = (data: TForm) => {
    mutate(
      {
        courseId,
        studentId: user?.userId || '',
        enrollmentKey: data.enrollmentKey,
      },
      {
        onError: error => {
          setErrorMessage(error.response?.data.message || 'Error')
        },
        onSuccess: data =>
          window.location.replace(`/course/${data.data.value.courseId}`),
      },
    )
  }

  return (
    <div className="h-full items-center justify-center gap-4">
      <div className="flex h-1/3 w-full flex-col">
        <p>
          <KeyboardDoubleArrowRight className="mr-1 size-7 text-blue-500" />
          Enroll course: <h2>{getCourseLabel(course?.data)}</h2>
        </p>
        <Divider className="mb-6 mt-3" />
        <Alert severity="warning">
          Please enroll the key to access the course
        </Alert>
      </div>
      <div className="flex h-2/3 w-full justify-center pt-16">
        <div className="flex w-1/2 flex-col gap-4">
          <Form className="mt-4" form={form} onSubmit={onSubmit}>
            <FormInputPassword label="Enrollment key" name="enrollmentKey" />

            <div className="mt-4 flex justify-end gap-2">
              <Button>
                <Link to="/">Back to Home</Link>
              </Button>
              <Button
                disabled={!form.watch('enrollmentKey')}
                type="submit"
                variant="contained"
              >
                Enroll
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/enroll-course/')({
  component: EnrollCourse,
  beforeLoad: beforeLoadProtected,
})
