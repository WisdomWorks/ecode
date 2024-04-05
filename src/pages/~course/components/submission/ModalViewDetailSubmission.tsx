import { GetDetailSubmissionProps, useGetDetailSubmission } from '@/apis'
import { Dialog, Loading } from '@/components/common'
import { ExerciseType } from '@/constants'
import { ExerciseSchema } from '@/types/exercise.types'
import { cn, formatDDMMyyyyHHmm } from '@/utils'

import { DetailEssay } from '../../~$courseId/submission/DetailEssay'
import { Button, Chip } from '@mui/material'

interface Props {
  open: boolean
  state: GetDetailSubmissionProps & {
    exercise: ExerciseSchema
  }
  toggleModal: () => void
}

export const ModalViewDetailSubmission = ({
  open,
  state,
  toggleModal,
}: Props) => {
  const { data, isLoading, isRefetching } = useGetDetailSubmission(state)

  const submissionData = data?.data

  if (!submissionData) return null

  const { exercise, type } = state
  const { durationTime, endTime, exerciseName, startTime } = exercise
  const {
    exercise: { question },
    submissions: { score, submission, submissionId },
  } = submissionData

  if (isLoading || isRefetching) return <Loading />

  return (
    <Dialog
      className="size-4/5 overflow-auto"
      onClose={toggleModal}
      open={open}
    >
      <div className="flex h-full flex-col gap-8">
        <div className="grid grid-cols-12">
          <div className="col-span-12 flex flex-col gap-2">
            <div className="mb-2 flex items-center gap-4">
              <Chip
                className="capitalize"
                color="primary"
                label={type}
                variant="outlined"
              />
              <h3 className="text-2xl text-neutral-900">{exerciseName}</h3>
            </div>

            <div className="">
              <div className="flex items-end gap-4">
                <span className="w-[6rem] text-lg font-bold">Start time:</span>
                <span className="font-medium text-neutral-800">
                  {formatDDMMyyyyHHmm(new Date(startTime))}
                </span>
              </div>

              <div className="flex items-end gap-4">
                <span className="w-[6rem] text-lg font-bold">End time:</span>
                <span className="font-medium text-neutral-800">
                  {formatDDMMyyyyHHmm(new Date(endTime))}
                </span>
              </div>

              <div className="flex items-end gap-4">
                <span className="w-[6rem] text-lg font-bold">Duration:</span>
                <span className="font-medium text-neutral-800">
                  {durationTime} minutes
                </span>
              </div>

              <div className="flex items-end gap-4">
                <span className="w-[6rem] text-lg font-bold">Score:</span>
                <span className="font-medium text-neutral-800">
                  {score === -1 ? (
                    <span className="font-bold text-danger-500">
                      Not graded
                    </span>
                  ) : (
                    <span
                      className={cn({
                        'text-success-500': score >= 8,
                        'text-warning-500': score >= 4 && score < 8,
                        'text-danger-500': score < 4,
                      })}
                    >
                      {score}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {type === ExerciseType.ESSAY && (
            <DetailEssay
              essaySubmissionId={submissionId}
              question={question}
              score={score}
              submission={submission}
            />
          )}
        </div>

        {type !== ExerciseType.ESSAY && (
          <div className="flex h-fit justify-end">
            <Button className="clearBtn" onClick={toggleModal}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  )
}
