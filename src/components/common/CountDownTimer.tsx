import { ExerciseType } from '@/constants'
import { useCountdown } from '@/hooks'
import { cn } from '@/utils'

interface Props {
  milliseconds: number
  onEnd?: () => void
  typeExercise?: ExerciseType
}

export const CountDownTimer = ({
  milliseconds,
  onEnd,
  typeExercise,
}: Props) => {
  const {
    counter: { minutes, seconds },
    isWarningTimeOut,
  } = useCountdown(milliseconds, {
    onEnd,
  })

  return (
    <div>
      <span
        className={cn('text-5xl ', {
          'text-danger-500': isWarningTimeOut,
          'dark:text-white': typeExercise === ExerciseType.CODE,
        })}
      >
        {minutes} : {seconds}
      </span>
    </div>
  )
}
