import {
  CodeSubmission,
  GetDetailSubmissionProps,
  useGetDetailSubmission,
} from '@/apis'
import { Dialog, Loading } from '@/components/common'
import { ExerciseType } from '@/constants'
import { cn, formatDDMMyyyyHHmm } from '@/utils'

import { DetailCode } from '../../~$courseId/submission/code/DetailCode'
import { DetailEssay } from '../../~$courseId/submission/DetailEssay'
import { DetailFile } from '../../~$courseId/submission/DetailFile'
import { DetailQuiz } from '../../~$courseId/submission/quiz/DetailQuiz'
import { Chip, Divider } from '@mui/material'

interface Props {
  open: boolean
  state: GetDetailSubmissionProps
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

  const { type } = state
  const { durationTime, endTime, exerciseName, startTime } =
    submissionData.exercise
  const {
    exercise: { question },
    submissions: { fileUrl, score, submission, submissionId },
  } = submissionData

  if (isLoading || isRefetching) return <Loading />

  return (
    <Dialog
      className="size-4/5 overflow-auto"
      isShowCloseButton
      onClose={toggleModal}
      open={open}
    >
      <div
        className={cn('flex h-full flex-col', {
          'gap-4': type !== ExerciseType.CODE,
        })}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-12 flex flex-col gap-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Chip
                  className="capitalize"
                  color="primary"
                  label={type}
                  size="small"
                  variant="outlined"
                />
                <Divider orientation="vertical" />
                <h3 className="text-2xl text-neutral-900">{exerciseName}</h3>
              </div>

              <div className="flex items-end gap-4  pr-12">
                <>
                  {score === -1 ? (
                    <span className="text-3xl font-bold text-danger-500">
                      Not graded
                    </span>
                  ) : (
                    <span
                      className={cn(
                        'border border-solid py-2 px-6 rounded-full text-4xl',
                        {
                          'text-success-500 border-success-500': score >= 8,
                          'text-warning-500 border-warning-500':
                            score >= 4 && score < 8,
                          'text-danger-500 border-danger-500': score < 4,
                        },
                      )}
                    >
                      {score}
                    </span>
                  )}
                </>
              </div>
            </div>

            <Divider />

            <>
              {type !== ExerciseType.CODE && (
                <>
                  <div className="flex items-end gap-4">
                    <span className="w-[6rem] text-base font-bold">
                      Start time
                    </span>
                    <span className=" text-sm text-neutral-800">
                      {formatDDMMyyyyHHmm(new Date(startTime))}
                    </span>
                  </div>

                  <div className="flex items-end gap-4">
                    <span className="w-[6rem] text-base font-bold">
                      End time
                    </span>
                    <span className=" text-sm text-neutral-800">
                      {formatDDMMyyyyHHmm(new Date(endTime))}
                    </span>
                  </div>

                  <div className="flex items-end gap-4">
                    <span className="w-[6rem] text-base font-bold">
                      Duration
                    </span>
                    <span className=" text-sm text-neutral-800">
                      {durationTime} minutes
                    </span>
                  </div>
                </>
              )}
            </>
          </div>
        </div>

        <Divider />

        <>
          {type === ExerciseType.ESSAY && (
            <DetailEssay
              comment={submissionData.submissions.teacherComment}
              essaySubmissionId={submissionId}
              question={question}
              score={score}
              submission={submission as string}
            />
          )}

          {type === ExerciseType.FILE && (
            <DetailFile
              comment={submissionData.submissions.teacherComment}
              question={question}
              score={score}
              submission={fileUrl}
              submissionId={submissionId}
            />
          )}

          {type === ExerciseType.QUIZ && (
            <DetailQuiz
              exercise={data.data.exercise}
              submissions={data.data.submissions}
            />
          )}

          {type === ExerciseType.CODE && (
            <DetailCode
              exercise={data.data.exercise}
              submissions={data.data.submissions as CodeSubmission}
            />
          )}
        </>
      </div>
    </Dialog>
  )
}
