import { ChangeEvent } from 'react'
import { FieldArrayWithId, useFormContext } from 'react-hook-form'

import { FormInput } from '@/components/form'

import { TCreateQuiz } from './CreateQuizExercise'
import { Radio, RadioGroup } from '@mui/material'

interface Props {
  field: FieldArrayWithId<TCreateQuiz, 'questions', 'id'>
  index: number
}

export const SingleChoiceQuestion = ({ field, index }: Props) => {
  const { control, setValue, watch } = useFormContext<TCreateQuiz>()

  const handleChangeSingleChoice = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value
    if (!value) return
    return setValue(`questions.${index}.answers.${0}`, {
      content: value,
    })
  }

  const arrayRender:
    | {
        choiceId?: string | undefined
        content: string
      }[]
    | [] = field.questionId
    ? field.choices
    : Array.from({ length: watch('noOfQuestions') })

  const answers = watch(`questions.${index}.answers`).map(
    answer => answer.content,
  )

  return (
    <RadioGroup
      className="flex flex-col gap-2"
      onChange={e => handleChangeSingleChoice(e, index)}
      value={watch(`questions.${index}.answers`).at(0)?.content}
    >
      {arrayRender.map((choice, i: number) => {
        const content = watch(`questions.${index}.choices.${i}.content`)

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const checked = choice ? answers.includes(choice.content) : undefined

        return (
          <div className="flex w-1/2 items-center" key={i}>
            <Radio checked={checked} disabled={!content} value={content} />
            <FormInput
              control={control}
              name={`questions.${index}.choices.${i}.content`}
            />
          </div>
        )
      })}
    </RadioGroup>
  )
}
