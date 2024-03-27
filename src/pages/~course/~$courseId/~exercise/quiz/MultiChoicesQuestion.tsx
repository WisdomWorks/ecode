import { ChangeEvent } from 'react'
import { useFormContext, WatchObserver } from 'react-hook-form'

import { FormInput } from '@/components/form'

import { TCreateQuiz } from './CreateQuizExercise'
import { Checkbox, FormGroup } from '@mui/material'

interface Props {
  index: number
}

export const MultiChoicesQuestion = ({ index }: Props) => {
  const { control, setValue, watch } = useFormContext<TCreateQuiz>()

  const handleChangeMultipleChoice = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value
    const checked = e.target.checked
    if (!value) return

    const choiceValue = watch(value as unknown as WatchObserver<TCreateQuiz>)

    if (checked) {
      return setValue(`questions.${index}.answers`, [
        ...watch(`questions.${index}.answers`),
        {
          content: String(choiceValue),
        },
      ])
    }

    return setValue(
      `questions.${index}.answers`,
      watch(`questions.${index}.answers`).filter(
        answer => answer.content !== String(choiceValue),
      ),
    )
  }

  return (
    <FormGroup className="flex flex-col gap-2">
      {Array.from({ length: watch('noOfQuestions') }).map((_, i) => {
        return (
          <div className="flex w-1/2 items-center" key={i}>
            <Checkbox
              disabled={!watch(`questions.${index}.choices.${i}.content`)}
              onChange={e => handleChangeMultipleChoice(e, index)}
              value={`questions.${index}.choices.${i}.content`}
            />
            <FormInput
              control={control}
              name={`questions.${index}.choices.${i}.content`}
            />
          </div>
        )
      })}
    </FormGroup>
  )
}
