import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { TQuizSubmission } from '@/apis'

import { Radio, RadioGroup, TextField } from '@mui/material'

interface Props {
  choices: {
    choiceId?: string | undefined
    content: string
  }[]
  index: number
}

export const SingleChoiceAnswer = ({ choices, index }: Props) => {
  const { setValue, watch } = useFormContext<TQuizSubmission>()

  const handleChangeSingleChoice = (e: ChangeEvent<HTMLInputElement>) => {
    const choiceId = e.target.value
    if (!choiceId) return

    const content = choices.find(choice => choice.choiceId === choiceId)
      ?.content

    setValue(`submission.${index}.answers`, [
      {
        choiceId,
        content: content || '',
      },
    ])
  }

  const answers = watch(`submission.${index}.answers`).map(
    answer => answer.choiceId,
  )

  return (
    <RadioGroup
      className="flex flex-col gap-2"
      onChange={e => handleChangeSingleChoice(e)}
      value={watch(`submission.${index}.answers`).at(0)?.content}
    >
      {choices.map((choice, i: number) => {
        const checked = answers.includes(String(choice.choiceId))

        return (
          <div className="flex w-full items-center" key={i}>
            <Radio checked={checked} value={choice.choiceId} />
            <TextField defaultValue={choice.content} disabled fullWidth />
          </div>
        )
      })}
    </RadioGroup>
  )
}
