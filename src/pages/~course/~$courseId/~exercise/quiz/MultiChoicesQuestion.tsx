import { ChangeEvent } from 'react'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'

import { FormInput } from '@/components/form'

import { TCreateQuiz } from './CreateQuizExercise'
import { Checkbox, FormGroup } from '@mui/material'

interface Props {
  field: FieldArrayWithId<TCreateQuiz, 'questions', 'id'>
  index: number
}

export const MultiChoicesQuestion = ({ field, index }: Props) => {
  const { control, setValue, watch } = useFormContext<TCreateQuiz>()

  const handleChangeMultipleChoice = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value
    const checked = e.target.checked
    if (!value) return

    if (checked) {
      return setValue(`questions.${index}.answers`, [
        ...watch(`questions.${index}.answers`),
        {
          content: String(value),
        },
      ])
    }

    return setValue(
      `questions.${index}.answers`,
      watch(`questions.${index}.answers`).filter(
        answer => answer.content !== String(value),
      ),
    )
  }

  const arrayRender:
    | {
        choiceId?: string | undefined
        content: string
      }[]
    | [] = field.questionId
    ? watch(`questions.${index}`).choices
    : Array.from({ length: watch('noOfQuestions') })

  const answers = watch(`questions.${index}.answers`).map(
    answer => answer.content,
  )

  return (
    <FormGroup className="flex flex-col gap-2">
      {arrayRender.map((choice, i) => {
        const content = watch(`questions.${index}.choices.${i}.content`)

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const checked = choice ? answers.includes(choice.content) : undefined

        return (
          <div className="flex w-1/2 items-center" key={i}>
            <Checkbox
              checked={checked}
              disabled={!content}
              onChange={e => handleChangeMultipleChoice(e, index)}
              value={content}
            />
            <FormInput
              control={control}
              extraOnchange={() => setValue(`questions.${index}.answers`, [])}
              name={`questions.${index}.choices.${i}.content`}
            />
          </div>
        )
      })}
    </FormGroup>
  )
}
