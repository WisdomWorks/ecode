import { describe, expect, it } from 'vitest'

const add = (a: number, b: number) => a + b

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
