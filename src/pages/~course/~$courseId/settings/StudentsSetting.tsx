import { useState } from 'react'

import { useDeleteStudentInCourse } from '@/apis'
import { Table } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { useToastMessage, useToggle } from '@/hooks'
import { TColumn, TCourse, TUser } from '@/types'

import { AddStudentModal } from './AddStudentModal'
import { ArrowDownward, Delete } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Typography,
} from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  courseDetail?: TCourse
  refetchCourse: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

const columns: TColumn<TUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'username',
    header: 'Student Code',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

export const StudentsSetting = ({ courseDetail, refetchCourse }: Props) => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const [userIdDeleted, setUserIdDeleted] = useState<string | null>(null)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useToggle()
  const [openAddStudentModal, toggleAddStudentModal] = useToggle()

  const { mutate: removeStudent } = useDeleteStudentInCourse()

  if (!courseDetail) return null

  const handleDelete = (user: TUser) => {
    setUserIdDeleted(user.userId)
    setIsOpenDeleteModal()
  }

  const onConfirm = () => {
    removeStudent(
      {
        courseId: String(courseDetail.courseId),
        studentId: String(userIdDeleted),
      },
      {
        onSuccess: () => {
          refetchCourse()
          setIsOpenDeleteModal()
          setSuccessMessage('Student is removed successfully')
        },
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Something went wrong',
          ),
      },
    )
  }

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1-content"
        expandIcon={<ArrowDownward />}
        id="panel1-header"
      >
        <Typography variant="h3">Students Management</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Table
          columns={columns}
          containerClassName="max-h-[25rem] min-h-[25rem]"
          data={courseDetail.students || []}
          enableRowActions
          positionActionsColumn="last"
          renderRowActions={({ row: { original } }) => (
            <div className="flex">
              <IconButton onClick={() => handleDelete(original)}>
                <Delete className="text-red-500" />
              </IconButton>
            </div>
          )}
          renderTopToolbarCustomActions={() => (
            <Button onClick={toggleAddStudentModal} variant="contained">
              Add more students
            </Button>
          )}
        />

        {isOpenDeleteModal && (
          <ConfirmModal
            description="Are you sure you want to remove this student?"
            isOpen={isOpenDeleteModal}
            onClose={setIsOpenDeleteModal}
            onConfirm={onConfirm}
            title="Remove Student"
          />
        )}

        {openAddStudentModal && (
          <AddStudentModal
            courseDetail={courseDetail}
            isOpen={openAddStudentModal}
            onClose={toggleAddStudentModal}
            refetchCourse={refetchCourse}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}
