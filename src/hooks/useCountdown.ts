import { useEffect, useState } from 'react'

interface CountdownOptions {
  interval?: number
  onEnd?: () => void
  onTick?: (timeLeft: number) => void
  timeEnd?: number
}

const parseMsToMinutesAndSeconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return {
    seconds: seconds.length === 1 ? `0${seconds}` : seconds,
    minutes: minutes === 0 ? '00' : minutes,
  }
}

export const useCountdown = (
  milliseconds: number,
  { interval = 1000, onEnd, onTick, timeEnd = 0 }: CountdownOptions,
) => {
  const [timeLeft, setTimeLeft] = useState(milliseconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        const newTimeLeft = prevTimeLeft - interval
        if (newTimeLeft <= timeEnd) {
          clearInterval(intervalId)
          onEnd?.()
          return timeEnd
        }
        onTick?.(newTimeLeft)
        return newTimeLeft
      })
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  })

  return {
    timeLeft,
    counter: parseMsToMinutesAndSeconds(timeLeft),
    isWarningTimeOut: timeLeft <= 20000,
  }
}
