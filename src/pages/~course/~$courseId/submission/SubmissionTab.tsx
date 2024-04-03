import { useState } from 'react'

import { useGetExercises } from '@/apis'
import { GetExerciseDetailToReviewProps } from '@/apis/useGetExerciseDetailToReview'
import { Loading, Table } from '@/components/common'
import { useToggle } from '@/hooks'
import { TColumn } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { ModalViewDetailSubmission } from '../../components/ModalViewDetailSubmission'
import { DetailPanelSubmission } from './DetailPanelSubmission'
import { Chip } from '@mui/material'
import { useParams } from '@tanstack/react-router'

export const SubmissionTab = () => {
  const { courseId } = useParams({ from: '/course/$courseId/' })
  const { data, isLoading } = useGetExercises({ courseId })

  const [modalState, setModalState] =
    useState<GetExerciseDetailToReviewProps | null>(null)
  const [openModalDetail, toggleModalDetail] = useToggle()

  if (isLoading) return <Loading />

  const exercises = data?.data

  const columns: TColumn<ExerciseSchema>[] = [
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
      accessorKey: 'exerciseName',
      header: 'Exercise Name',
    },
    {
      header: 'Start Time',
      accessorFn: row => new Date(row.startTime),
      filterVariant: 'date',
      Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
    },
    {
      id: 'endTime',
      header: 'End Time',
      accessorFn: row => new Date(row.endTime),
      Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        data={exercises ?? []}
        renderDetailPanel={({ row }) => (
          <DetailPanelSubmission
            row={row}
            setModalState={setModalState}
            toggleModalDetail={toggleModalDetail}
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
