import { useCountdown } from '@/hooks'
import { cn } from '@/utils'

interface Props {
  milliseconds: number
}

export const CountDownTimer = ({ milliseconds }: Props) => {
  const {
    counter: { minutes, seconds },
    isWarningTimeOut,
  } = useCountdown(milliseconds, {
    onEnd: () => {
      console.log("Time's up!")
    },
  })

  return (
    <div>
      <span
        className={cn('text-6xl font-bold', {
          'text-danger-500': isWarningTimeOut,
        })}
      >
        {minutes} : {seconds}
      </span>
    </div>
  )
}
