import { useState } from 'react'

import { useExportCourseScore, useGetExercises } from '@/apis'
import { Loading, Table } from '@/components/common'
import { ExcelIcon } from '@/components/common/icons'
import { useToastMessage } from '@/hooks'
import { TColumn } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { DetailPanelSubmission } from './DetailPanelSubmission'
import { ArrowBackIos } from '@mui/icons-material'
import { Button, Chip, CircularProgress, Slide } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { MRT_Row } from 'material-react-table'

const columns: TColumn<ExerciseSchema>[] = [
  {
    accessorKey: 'type',
    header: 'Exercise Type',
    filterVariant: 'select',
    filterSelectOptions: ['Quiz', 'Essay', 'Code', 'File'],
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
    size: 200,
    muiFilterTextFieldProps: {
      placeholder: 'Type',
    },
  },
  {
    accessorKey: 'exerciseName',
    header: 'Exercise Name',
    minSize: 300,
  },
  {
    header: 'Created Date',
    accessorFn: row =>
      row.createdDate ? new Date(row.createdDate) : new Date(),
    filterVariant: 'date',
    Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
    enableColumnFilter: false,
  },
  {
    header: 'Start Time',
    accessorFn: row => new Date(row.startTime),
    filterVariant: 'date',
    Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
    enableColumnFilter: false,
  },
  {
    id: 'endTime',
    header: 'End Time',
    accessorFn: row => new Date(row.endTime),
    Cell: ({ cell }) => formatDDMMyyyyHHmm(new Date(cell.getValue<Date>())),
    enableColumnFilter: false,
  },
]

export const SubmissionTab = () => {
  const { courseId } = useParams({ from: '/course/$courseId/' })
  const { setErrorMessage } = useToastMessage()

  const { data, isLoading } = useGetExercises({ courseId })
  const { isPending: exportPending, mutate: exportExcel } =
    useExportCourseScore()

  const [rowClicked, setRowClicked] = useState<MRT_Row<ExerciseSchema> | null>(
    null,
  )

  if (isLoading) return <Loading />

  const exercises = data?.data

  const handleExportExcel = () => {
    exportExcel(
      { courseId },
      {
        onSuccess: data => {
          const fileBlob = new Blob([data.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          })
          const fileUrl = window.URL.createObjectURL(fileBlob)
          const a = document.createElement('a')
          a.href = fileUrl
          a.download = 'export-scores.xlsx'
          a.click()
          window.URL.revokeObjectURL(fileUrl)
        },
        onError: error =>
          setErrorMessage(
            error.response?.data.message || "Can't export excel. Try again!",
          ),
      },
    )
  }

  return (
    <>
      <Slide direction="right" in={!rowClicked} mountOnEnter unmountOnExit>
        <div>
          <Table
            columns={columns}
            containerClassName="max-h-[500px]"
            data={exercises ?? []}
            enableColumnResizing
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => setRowClicked(row),
              sx: {
                cursor: 'pointer',
              },
            })}
            renderTopToolbarCustomActions={() => (
              <Button
                className="py-3"
                color="success"
                disabled={exportPending}
                onClick={handleExportExcel}
                startIcon={<ExcelIcon className="size-7" />}
                variant="outlined"
              >
                Export Excel
                {exportPending && (
                  <CircularProgress className="ml-2 size-4 text-success-300" />
                )}
              </Button>
            )}
          />
        </div>
      </Slide>

      <Slide direction="left" in={!!rowClicked} mountOnEnter unmountOnExit>
        <div>
          {rowClicked && (
            <>
              <Button onClick={() => setRowClicked(null)}>
                <ArrowBackIos className="size-4" />
                Back to Exercise List
              </Button>
              <DetailPanelSubmission row={rowClicked} />
            </>
          )}
        </div>
      </Slide>
    </>
  )
}
