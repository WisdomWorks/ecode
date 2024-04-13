import {
  formatDDMMyyyyHHmm,
  getDateByMinutes,
  parseTimeToMilliseconds,
} from '@/utils'

import { describe, expect, it } from 'vitest'

describe('getDateByMinutes', () => {
  it('should return a Date object with the correct time', () => {
    const date = getDateByMinutes(90)
    expect(date.getHours()).toBe(1)
    expect(date.getMinutes()).toBe(30)
  })

  it('should return a Date object with the correct time when the minutes are greater than 60', () => {
    const date = getDateByMinutes(150)
    expect(date.getHours()).toBe(2)
    expect(date.getMinutes()).toBe(30)
  })

  it('should return a Date object with the correct time when the minutes are less than 60', () => {
    const date = getDateByMinutes(45)
    expect(date.getHours()).toBe(0)
    expect(date.getMinutes()).toBe(45)
  })
})

describe('formatDDMMyyyyHHmm', () => {
  it('should return a formatted date string', () => {
    const date = new Date(2021, 0, 1, 12, 0)
    const formattedDate = formatDDMMyyyyHHmm(date)
    expect(formattedDate).toBe('01-01-2021 12:00')
  })

  it('should return a formatted date string with a single-digit day', () => {
    const date = new Date(2021, 0, 9, 12, 0)
    const formattedDate = formatDDMMyyyyHHmm(date)
    expect(formattedDate).toBe('09-01-2021 12:00')
  })

  it('should return a formatted date string with a single-digit month', () => {
    const date = new Date(2021, 9, 1, 12, 0)
    const formattedDate = formatDDMMyyyyHHmm(date)
    expect(formattedDate).toBe('01-10-2021 12:00')
  })
})

describe('parseTimeToMilliseconds', () => {
  it('should return the number of milliseconds since the Unix epoch', () => {
    const milliseconds = parseTimeToMilliseconds('12:00:00')
    expect(milliseconds).toBe(43200000)
  })

  it('should return NaN if the input is invalid', () => {
    const milliseconds = parseTimeToMilliseconds('invalid')
    expect(isNaN(milliseconds)).toBe(true)
  })

  it('should return NaN if the input is an empty string', () => {
    const milliseconds = parseTimeToMilliseconds('123')
    expect(isNaN(milliseconds)).toBe(true)
  })
})
