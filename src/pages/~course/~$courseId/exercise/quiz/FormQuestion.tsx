import { ChangeEvent } from 'react'
import { useFieldArray, useFormContext, WatchObserver } from 'react-hook-form'

import { FormCheckbox, FormInput } from '@/components/form'

import { FormCreateQuizExercise, TQuestion } from './CreateQuizExercise'
import { DeleteOutline } from '@mui/icons-material'
import { Button, Checkbox, FormGroup, Radio, RadioGroup } from '@mui/material'

interface Props {
  defaultQuestion: TQuestion
}

export const FormQuestion = ({ defaultQuestion }: Props) => {
  const { control, setValue, watch } = useFormContext<FormCreateQuizExercise>()

  const { append, fields, remove } = useFieldArray({
    control: control,
    name: 'questions',
  })

  const handleAddQuestion = () => {
    append(defaultQuestion)
  }

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

  const handleChangeMultipleChoice = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value
    const checked = e.target.checked
    if (!value) return

    const choiceValue = watch(
      value as unknown as WatchObserver<FormCreateQuizExercise>,
    )

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
    <>
      <div className="col-span-12 flex flex-col gap-4">
        {fields.map((field, index) => {
          const { id } = field

          return (
            <div
              className="grid grid-cols-12 rounded-lg border-2 border-solid border-gray-500 p-4 shadow-md"
              key={id}
            >
              <div className="col-span-12 flex w-full items-center justify-between">
                <span className="col-span-12 text-base font-semibold">
                  Question {index + 1}
                </span>
                {index !== 0 && (
                  <Button onClick={() => remove(index)}>
                    <DeleteOutline className="text-danger-500" />
                  </Button>
                )}
              </div>
              <FormInput
                className="col-span-9"
                label="Title"
                multiline
                name={`questions.${index}.title`}
                required
                rows={2}
              />

              <div className="col-span-12 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="col-span-12 text-base font-semibold">Answers</p>
                  <FormCheckbox
                    control={control}
                    extraOnChange={() =>
                      setValue(`questions.${index}.answers`, [])
                    }
                    label="Multiple choice"
                    name={`questions.${index}.isMultipleChoice`}
                  />
                </div>
                {!watch(`questions.${index}.isMultipleChoice`) ? (
                  <RadioGroup
                    className="flex flex-col gap-2"
                    onChange={e => handleChangeSingleChoice(e, index)}
                    value={watch(`questions.${index}.answers`).at(0)?.content}
                  >
                    {Array.from({ length: watch('noOfQuestions') }).map(
                      (_, i) => {
                        return (
                          <div className="flex w-1/2 items-center" key={i}>
                            <Radio
                              disabled={
                                !watch(
                                  `questions.${index}.choices.${i}.content`,
                                )
                              }
                              value={`questions.${index}.choices.${i}.content`}
                            />
                            <FormInput
                              control={control}
                              name={`questions.${index}.choices.${i}.content`}
                            />
                          </div>
                        )
                      },
                    )}
                  </RadioGroup>
                ) : (
                  <FormGroup className="flex flex-col gap-2">
                    {Array.from({ length: watch('noOfQuestions') }).map(
                      (_, i) => {
                        return (
                          <div className="flex w-1/2 items-center" key={i}>
                            <Checkbox
                              disabled={
                                !watch(
                                  `questions.${index}.choices.${i}.content`,
                                )
                              }
                              onChange={e =>
                                handleChangeMultipleChoice(e, index)
                              }
                              value={`questions.${index}.choices.${i}.content`}
                            />
                            <FormInput
                              control={control}
                              name={`questions.${index}.choices.${i}.content`}
                            />
                          </div>
                        )
                      },
                    )}
                  </FormGroup>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="col-span-12">
        <Button
          className="bg-success-600"
          onClick={handleAddQuestion}
          variant="contained"
        >
          Add a question
        </Button>
      </div>
    </>
  )
}
