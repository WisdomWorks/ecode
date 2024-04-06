import { useState } from 'react'

import {
  GetDetailSubmissionProps,
  GradeStudent,
  useGetGradeStudent,
} from '@/apis'
import { ButtonTooltip, Loading, Table } from '@/components/common'
import { useAppStore } from '@/context/useAppStore'
import { useToggle } from '@/hooks'
import { TColumn } from '@/types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { ModalViewDetailSubmission } from '../../components/submission/ModalViewDetailSubmission'
import { RemoveRedEyeOutlined } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { useParams } from '@tanstack/react-router'

const columns: TColumn<GradeStudent>[] = [
  {
    accessorKey: 'type',
    header: 'Exercise Type',
    filterVariant: 'select',
    filterSelectOptions: ['Quiz', 'Essay'],
    // eslint-disable-next-line react/prop-types
    Cell: ({ cell }) => (
      <Chip
        className="capitalize"
        color="primary"
        // eslint-disable-next-line react/prop-types
        label={cell.getValue<string>()}
        variant="outlined"
      />
    ),
  },
  {
    accessorKey: 'exerciseTitle',
    header: 'Exercise Name',
  },
  {
    accessorFn: row => new Date(row.dateSubmission),
    header: 'Date Submit',
    Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
    filterVariant: 'date',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'score',
    header: 'Score',
    enableColumnFilter: false,
    Cell: ({ cell, row }) =>
      row.original.score === -1 ? 'Not graded' : cell.getValue<number>(),
  },
]

export const GradeTab = () => {
  const user = useAppStore(state => state.user)
  const { courseId } = useParams({ from: '/course/$courseId/' })

  const [openModalDetail, toggleModalDetail] = useToggle()

  const [modalState, setModalState] = useState<GetDetailSubmissionProps | null>(
    null,
  )

  const { data, isLoading } = useGetGradeStudent({
    courseId,
    userId: user?.userId || '',
  })

  if (isLoading) return <Loading />

  return (
    <>
      <Table
        columns={columns}
        data={data?.data ?? []}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row: { original } }) => (
          <ButtonTooltip
            iconButtonProps={{
              children: <RemoveRedEyeOutlined className="text-warning-500" />,
              onClick: () => {
                setModalState({
                  submissionId: original.submissionId,
                  type: original.type,
                })
                toggleModalDetail()
              },
            }}
            isIconButton
            tooltipProps={{
              title: 'View submission',
            }}
          />
        )}
        renderTopToolbarCustomActions={() => <h3>Exercise List</h3>}
      />

      {openModalDetail && modalState && (
        <ModalViewDetailSubmission
          open={openModalDetail}
          state={modalState}
          toggleModal={toggleModalDetail}
        />
      )}
    </>
  )
}
