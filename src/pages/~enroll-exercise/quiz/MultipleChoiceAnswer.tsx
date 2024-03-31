import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { TQuizSubmission } from '@/apis'

import { Checkbox, FormGroup, TextField } from '@mui/material'

interface Props {
  choices: {
    choiceId?: string | undefined
    content: string
  }[]
  index: number
}

export const MultipleChoiceAnswer = ({ choices, index }: Props) => {
  const { setValue, watch } = useFormContext<TQuizSubmission>()

  const handleChangeMultipleChoice = (e: ChangeEvent<HTMLInputElement>) => {
    const choiceId = e.target.value
    const checked = e.target.checked
    if (!choiceId) return

    const content = choices.find(choice => choice.choiceId === choiceId)
      ?.content

    const answer = {
      choiceId,
      content: content || '',
    }

    if (checked) {
      return setValue(`submission.${index}.answers`, [
        ...watch(`submission.${index}.answers`),
        answer,
      ])
    }

    return setValue(
      `submission.${index}.answers`,
      watch(`submission.${index}.answers`).filter(
        answer => answer.choiceId !== choiceId,
      ),
    )
  }

  const answers = watch(`submission.${index}.answers`).map(
    answer => answer.choiceId,
  )

  return (
    <FormGroup className="flex flex-col gap-2">
      {choices.map((choice, i) => {
        const checked = answers.includes(String(choice.choiceId))

        return (
          <div className="flex w-full items-center" key={i}>
            <Checkbox
              checked={checked}
              onChange={e => handleChangeMultipleChoice(e)}
              value={choice.choiceId}
            />
            <TextField defaultValue={choice.content} disabled fullWidth />
          </div>
        )
      })}
    </FormGroup>
  )
}
