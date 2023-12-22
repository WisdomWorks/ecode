import { v4 as uuidv4 } from 'uuid'

export type TLanguage = {
  ID: string
  label: string
}

export const languages: TLanguage[] = [
  {
    ID: uuidv4(),
    label: 'Java',
  },
  {
    ID: uuidv4(),
    label: 'Javascript',
  },
  {
    ID: uuidv4(),
    label: 'Python',
  },
]
