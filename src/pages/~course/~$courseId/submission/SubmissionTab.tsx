import { useState } from 'react'

import { GetDetailSubmissionProps, useGetExercises } from '@/apis'
import { Loading, Table } from '@/components/common'
import { useToggle } from '@/hooks'
import { TColumn } from '@/types'
import { ExerciseSchema } from '@/types/exercise.types'
import { formatDDMMyyyyHHmm } from '@/utils'

import { ModalViewDetailSubmission } from '../../components/submission/ModalViewDetailSubmission'
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
  const [rowClicked, setRowClicked] = useState<MRT_Row<ExerciseSchema> | null>(
    null,
  )

  const [modalState, setModalState] = useState<GetDetailSubmissionProps | null>(
    null,
  )
  const [openModalDetail, toggleModalDetail] = useToggle()

  if (isLoading) return <Loading />

  const exercises = data?.data

  return (
    <>
      <Slide direction="right" in={!rowClicked} mountOnEnter unmountOnExit>
        <div>
          <Table
            columns={columns}
            data={exercises ?? []}
            muiTableBodyRowProps={({ row }) => ({
              onClick: () => setRowClicked(row),
              sx: {
                cursor: 'pointer',
              },
            })}
            renderTopToolbarCustomActions={() => <h3>Exercise List</h3>}
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
              <DetailPanelSubmission
                row={rowClicked}
                setModalState={setModalState}
                toggleModalDetail={toggleModalDetail}
              />
            </>
          )}
        </div>
      </Slide>

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
