import { Dispatch, SetStateAction } from 'react'

import {
  GetDetailSubmissionProps,
  TStudentSubmissionResponse,
  useGetSubmissionByExerciseId,
} from '@/apis'
import { ButtonTooltip, Table } from '@/components/common'
import { ExerciseType } from '@/constants'
import { TColumn } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { GradingOutlined, RemoveRedEyeOutlined } from '@mui/icons-material'
import { MRT_Row } from 'material-react-table'

interface Props {
  row: MRT_Row<ExerciseSchema>
  setModalState: Dispatch<SetStateAction<GetDetailSubmissionProps | null>>
  toggleModalDetail: () => void
}

export const DetailPanelSubmission = ({
  row,
  setModalState,
  toggleModalDetail,
}: Props) => {
  const { exerciseId, type } = row.original

  const { data } = useGetSubmissionByExerciseId({
    exerciseId,
    type,
    groupFilter: [],
  })

  const submissions = data?.data.submissions

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

  return (
    <div>
      <h3>All submissions</h3>
      <Table
        columns={column}
        data={submissions ?? []}
        enableRowActions
        enableRowNumbers
        enableTopToolbar={false}
        positionActionsColumn="last"
        renderRowActions={({ row: { original } }) => (
          <div className="flex">
            {type !== ExerciseType.ESSAY ? (
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
    </div>
  )
}
