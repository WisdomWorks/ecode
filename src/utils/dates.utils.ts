import { format, isValid, parseISO } from 'date-fns'

export const ddMMyyyyHHmm = 'dd-MM-yyyy HH:mm'

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

export const parseTimeToMilliseconds = (timeString: string) => {
  // Prepend the date part to the time string to create a valid ISO date string
  const isoDateString = `1970-01-01T${timeString}Z`

  // Parse the ISO date string into a Date object
  const parsedDate = parseISO(isoDateString)

  // Check if the parsed date is valid
  if (isValid(parsedDate)) {
    // Convert the Date object to milliseconds
    return parsedDate.getTime()
  }

  // Return NaN if the input is invalid
  return NaN
}
