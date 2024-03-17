import { useFieldArray, useFormContext } from 'react-hook-form'

import { FormCheckbox, FormInput } from '@/components/form'

import { FormCreateQuizExercise, TQuestion } from './CreateQuizExercise'
import { MultiChoicesQuestion } from './MultiChoicesQuestion'
import { SingleChoiceQuestion } from './SingleChoiceQuestion'
import { DeleteOutline } from '@mui/icons-material'
import { Button } from '@mui/material'

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
                  <SingleChoiceQuestion index={index} />
                ) : (
                  <MultiChoicesQuestion index={index} />
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
