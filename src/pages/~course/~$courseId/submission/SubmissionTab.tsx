import { useState } from 'react'

import { useExportCourseScore, useGetExercises } from '@/apis'
import { Loading, Table } from '@/components/common'
import { TColumn } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { DetailPanelSubmission } from './DetailPanelSubmission'
import { ArrowBackIos } from '@mui/icons-material'
import { Button, Chip, Slide } from '@mui/material'
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

  const { data, isLoading } = useGetExercises({ courseId })
  const { mutate: exportExcel } = useExportCourseScore()

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
          console.log(data)
          const fileBlob = new Blob([data.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          })
          const fileUrl = window.URL.createObjectURL(fileBlob)
          const a = document.createElement('a')
          a.href = fileUrl
          a.download = 'export-scores.xlsx'
          a.click()
        },
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
              <Button onClick={handleExportExcel}>Export</Button>
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
