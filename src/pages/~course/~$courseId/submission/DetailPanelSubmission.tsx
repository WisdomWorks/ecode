import { Dispatch, SetStateAction } from 'react'

import {
  GetDetailSubmissionProps,
  TStudentSubmissionResponse,
  useGetSubmissionByExerciseId,
} from '@/apis'
import { ButtonTooltip, Table } from '@/components/common'
import DoughnutChart from '@/components/common/GradeChart'
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
  const { exerciseId, exerciseName, type } = row.original

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
      <div className=" px-30 flex justify-between">
        <div className=" flex items-center pl-5">
          <div className=" mt-4">
            <div className="flex items-end gap-4">
              <span className="w-[14rem] text-base font-bold">
                Exercise Name
              </span>
              <span className=" text-base text-neutral-800">
                {exerciseName}
              </span>
            </div>

            <div className="my-2 flex items-end gap-4">
              <span className="w-[14rem] text-base font-bold">
                Exercise submission quantity:
              </span>
              <span className=" text-base text-neutral-800">10/20</span>
            </div>
          </div>
        </div>
        <div className="size-1/2 flex-col">
          <h3 className=" text-center">Grade distribution</h3>
          <div className="size-3/4 ">
            <DoughnutChart between5And8={5} greaterThan8={6} lessThan5={2} />
          </div>
        </div>
      </div>
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
