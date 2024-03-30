import { format } from 'date-fns'

export const ddMMyyyyHHmm = 'dd/MM/yyyy HH:mm'

export const HHmmss = 'HH:mm:ss'

export const now = new Date()

export const defaultDurationObj = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  1, // Hour (1 for 1 AM)
  0, // Minutes
  0, // Seconds
)

export const defaultTimeWithoutSecond = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  now.getHours(),
  0,
  0,
)

export const getDateByMinutes = (minutes: number) => {
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    Math.floor(minutes / 60),
    minutes % 60,
  )
  return date
}

export const formatDDMMyyyyHHmm = (date: Date) => format(date, ddMMyyyyHHmm)
