import { ReactNode } from 'react'

export interface IFormCardRadioOption {
  description?: string
  label: string
  value: string
}

export interface IFormRadioOption {
  label: ReactNode
  value: string
}
