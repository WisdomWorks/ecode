import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAddStudentsToCourse, useGetUsersByRole } from '@/apis'
import { Dialog } from '@/components/common'
import { Form, FormButtonGroup, FormSelector } from '@/components/form'
import { Role } from '@/constants'
import { useToastMessage } from '@/hooks'
import { TCourse, TUser } from '@/types'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  courseDetail?: TCourse
  isOpen: boolean
  onClose: () => void
  refetchCourse: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

interface TForm {
  students: TUser[]
}

export const AddStudentModal = ({
  courseDetail,
  isOpen,
  onClose,
  refetchCourse,
}: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { data } = useGetUsersByRole({ role: Role.STUDENT })
  const [filteredStudents, setFilteredStudents] = useState<TUser[]>([])
  const { isPending, mutate } = useAddStudentsToCourse()

  const form = useForm({
    defaultValues: {
      students: [],
    },
  })

  useEffect(() => {
    if (data) {
      setFilteredStudents(
        data.filter(
          user =>
            !courseDetail?.students?.find(
              student => student.userId === user.userId,
            ),
        ),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onUpdate: SubmitHandler<TForm> = data => {
    mutate(
      {
        courseId: String(courseDetail?.courseId),
        studentIds: data.students.map(item => item.userId),
      },
      {
        onSuccess: () => {
          setSuccessMessage('Add students successfully')
          refetchCourse()
          onClose()
        },
        onError: error => {
          setErrorMessage(
            error.response?.data.message || 'Add student unsuccessfully',
          )
        },
      },
    )
  }

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <div className="">
        <h1 className="text-xl font-bold">Add students</h1>
        <Form form={form} onSubmit={onUpdate}>
          <FormSelector
            className="col-span-8 my-2"
            control={form.control}
            filterSelectedOptions
            getOptionLabel={option =>
              typeof option === 'string' ? option : option.name
            }
            isOptionEqualToValue={(option, value) =>
              option.userId === value.userId
            }
            label={''}
            multiple
            name="students"
            options={filteredStudents}
            placeholder="Select student"
          />

          <FormButtonGroup
            buttons={[
              {
                label: 'Cancel',
                onClick: onClose,
                className: 'clearBtn',
              },
              {
                type: 'submit',
                label: 'Add Student',
                className: 'submitBtn',
                disabled: isPending || !form.watch('students').length,
              },
            ]}
            className="col-span-12 justify-end"
          />
        </Form>
      </div>
    </Dialog>
  )
}
