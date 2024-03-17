import { ChangeEvent } from 'react'
import { useFormContext, WatchObserver } from 'react-hook-form'

import { FormInput } from '@/components/form'

import { FormCreateQuizExercise } from './CreateQuizExercise'
import { Radio, RadioGroup } from '@mui/material'

interface Props {
  index: number
}

export const SingleChoiceQuestion = ({ index }: Props) => {
  const { control, setValue, watch } = useFormContext<FormCreateQuizExercise>()

  const handleChangeSingleChoice = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value
    if (!value) return
    const choiceValue = watch(
      value as unknown as WatchObserver<FormCreateQuizExercise>,
    )
    return setValue(
      `questions.${index}.answers.${0}.content`,
      String(choiceValue),
    )
  }

  return (
    <RadioGroup
      className="flex flex-col gap-2"
      onChange={e => handleChangeSingleChoice(e, index)}
      value={watch(`questions.${index}.answers`).at(0)?.content}
    >
      {Array.from({ length: watch('noOfQuestions') }).map((_, i) => {
        return (
          <div className="flex w-1/2 items-center" key={i}>
            <Radio
              disabled={!watch(`questions.${index}.choices.${i}.content`)}
              value={`questions.${index}.choices.${i}.content`}
            />
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
