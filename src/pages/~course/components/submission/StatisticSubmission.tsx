import { ReportSubmissionResponse } from '@/apis'
import { DoughnutChart } from '@/components/common/GradeChart'

interface Props {
  exerciseName: string
  report?: ReportSubmissionResponse
}

export const StatisticSubmission = ({ exerciseName, report }: Props) => {
  if (!report) return null

  const { ascore, bscore, cscore, numberStudent, numberSubmission } = report

  return (
    <div className="flex justify-between">
      <div className=" flex items-center pl-5">
        <div className=" mt-4">
          <div className="flex items-end gap-4">
            <span className="w-[14rem] text-base font-bold">Exercise Name</span>
            <span className=" text-base text-neutral-800">{exerciseName}</span>
          </div>

          <div className="my-2 flex items-end gap-4">
            <span className="w-[14rem] text-base font-bold">
              Exercise submission quantity:
            </span>
            <span className=" text-base text-neutral-800">{`${numberSubmission}/${numberStudent}`}</span>
          </div>
        </div>
      </div>
      <div className="size-1/2 flex-col">
        <h3 className=" text-center">Grade distribution</h3>
        <div className="size-3/4 ">
          <DoughnutChart
            between5And8={bscore}
            greaterThan8={ascore}
            lessThan5={cscore}
          />
        </div>
      </div>
    </div>
  )
}
