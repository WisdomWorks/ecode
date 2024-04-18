import { useCountdown } from '@/hooks'
import { cn } from '@/utils'

interface Props {
  milliseconds: number
  onEnd?: () => void
}

export const CountDownTimer = ({ milliseconds, onEnd }: Props) => {
  const {
    counter: { minutes, seconds },
    isWarningTimeOut,
  } = useCountdown(milliseconds, {
    onEnd,
  })

  return (
    <div>
      <span
        className={cn('text-5xl dark:text-white', {
          'text-danger-500': isWarningTimeOut,
        })}
      >
        {minutes} : {seconds}
      </span>
    </div>
  )
}
