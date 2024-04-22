import { useState } from 'react'

import {
  GetDetailSubmissionProps,
  TStudentSubmissionResponse,
  useGetSubmissionByExerciseId,
} from '@/apis'
import { ButtonTooltip, Loading, Table } from '@/components/common'
import { ExerciseType } from '@/constants'
import { useToggle } from '@/hooks'
import { TColumn } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { ModalViewDetailSubmission } from '../../components/submission/ModalViewDetailSubmission'
import { StatisticSubmission } from '../../components/submission/StatisticSubmission'
import { GradingOutlined, RemoveRedEyeOutlined } from '@mui/icons-material'
import { MRT_Row } from 'material-react-table'

interface Props {
  row: MRT_Row<ExerciseSchema>
}

export const DetailPanelSubmission = ({ row }: Props) => {
  const { exerciseId, exerciseName, type } = row.original

  const [modalState, setModalState] = useState<GetDetailSubmissionProps | null>(
    null,
  )
  const [openModalDetail, toggleModalDetail] = useToggle()

  const {
    data,
    isLoading,
    isRefetching,
    refetch: refetchSubmissions,
  } = useGetSubmissionByExerciseId({
    exerciseId,
    type,
    groupFilter: [],
  })

  const submissions = data?.data.submissions
  const report = data?.data.report

  const column: TColumn<TStudentSubmissionResponse['submissions'][number]>[] = [
    {
      accessorKey: 'name',
      header: 'Student Name',
    },
    {
      accessorKey: 'userName',
      header: 'Student ID',
    },
    {
      header: 'Group',
      filterVariant: 'select',
      filterFn: (row, _, filterValue) => {
        return !!row.original.groups.find(
          group => group.groupName === filterValue,
        )
      },
      filterSelectOptions:
        data?.data.groups?.map(group => group.groupName) ?? [],
      accessorFn: row =>
        row.groups.map(group => (
          <div key={group.groupId}>{group.groupName}</div>
        )),
    },
    {
      accessorFn: row => new Date(row.submission.dateSubmit),
      header: 'Date Submit',
      Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
      filterVariant: 'date',
      enableColumnFilter: false,
    },

    {
      accessorKey: 'submission.score',
      header: 'Score',
      enableColumnFilter: false,
      Cell: ({ cell, row }) =>
        row.original.submission.score === -1
          ? 'Not graded'
          : cell.getValue<number>(),
    },
  ]

  if (isRefetching || isLoading) return <Loading />

  return (
    <>
      <StatisticSubmission exerciseName={exerciseName} report={report} />
      <Table
        columns={column}
        data={submissions ?? []}
        enableRowActions
        enableRowNumbers
        enableTopToolbar={false}
        positionActionsColumn="last"
        renderRowActions={({ row: { original } }) => (
          <div className="flex">
            {![
              ExerciseType.ESSAY,
              ExerciseType.FILE,
              ExerciseType.CODE,
            ].includes(type) ? (
              <ButtonTooltip
                iconButtonProps={{
                  children: (
                    <RemoveRedEyeOutlined className="text-warning-500" />
                  ),
                  onClick: () => {
                    setModalState({
                      submissionId: original.submission.submissionId,
                      type,
                    })
                    toggleModalDetail()
                  },
                }}
                isIconButton
                tooltipProps={{
                  title: 'View submission',
                }}
              />
            ) : (
              <ButtonTooltip
                iconButtonProps={{
                  children: <GradingOutlined className="text-success-500" />,
                  onClick: () => {
                    setModalState({
                      submissionId: original.submission.submissionId,
                      type,
                    })
                    toggleModalDetail()
                  },
                }}
                isIconButton
                tooltipProps={{
                  title: 'Grading submission',
                }}
              />
            )}
          </div>
        )}
      />

      {openModalDetail && modalState && (
        <ModalViewDetailSubmission
          open={openModalDetail}
          refetchSubmissions={refetchSubmissions}
          state={modalState}
          toggleModal={toggleModalDetail}
        />
      )}
    </>
  )
}
