import { useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { FileUpload } from '@/components/common'
import {
  Form,
  FormButtonGroup,
  FormCheckbox,
  FormCodeIDE,
  FormInput,
  FormRadioGroup,
  FormSelector,
} from '@/components/form'
import { languages, primitiveType } from '@/constants'
import { CreateCodeExerciseSchema } from '@/pages/~course/shema/createExercise.schema'
import { TCreateCodeExerciseForm } from '@/types/exercise.types'
import { CreateCodeOption } from '@/utils/course.utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { AddCircleOutline, Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const defaultValues: TCreateCodeExerciseForm = {
  createCodeOption: CreateCodeOption.Manually,
  isSameInputDataType: true,
  language: null,
  mainFunctionName: '',
  noOfParameters: 1,
  template: '',
  templateFile: null,
  testCase: [
    {
      inputs: [{ dataValue: '' }],
      output: '',
    },
  ],
  title: '',
}

export const CreateCodeExercise = () => {
  const [filesTemplate, setFilesTemplate] = useState<FileList | null>(null)
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateCodeExerciseSchema),
  })
  const { control, watch } = form
  const { append, fields, remove } = useFieldArray({
    control,
    name: 'testCase',
  })

  const handleSubmit: SubmitHandler<TCreateCodeExerciseForm> = data => {
    console.log(data)
  }

  return (
    <Form
      className="grid grid-cols-2 gap-4"
      form={form}
      onSubmit={handleSubmit}
    >
      <section>
        <h2 className="text-lg text-neutral-900">Information</h2>
        <div className="mt-4 flex flex-col gap-2">
          <FormInput label="Title" name="title" required />
          <FormSelector
            label="Language"
            name="language"
            options={languages}
            required
          />

          <h2 className="mt-2 text-lg text-neutral-900">Template</h2>
          <FormRadioGroup
            name="createCodeOption"
            options={[
              {
                value: CreateCodeOption.Manually,
                label: 'Create manually',
              },
              {
                value: CreateCodeOption.Template,
                label: 'Upload template file',
              },
            ]}
          />
          <div className="grid grid-cols-12 gap-2">
            <FormInput
              className="col-span-8"
              label="Main function name"
              name="mainFunctionName"
              required
            />
            <FormInput
              className="col-span-4"
              inputProps={{
                min: 1,
                max: 5,
              }}
              label="Number of parameters"
              name="noOfParameters"
              required
              type="number"
            />
          </div>
          {watch('createCodeOption') === CreateCodeOption.Manually ? (
            <div className="max-h-[20rem] min-h-[10rem] overflow-auto bg-editor-dark">
              <FormCodeIDE name="template" />
            </div>
          ) : (
            <FileUpload
              files={filesTemplate}
              name="templateFile"
              setFiles={setFilesTemplate}
            />
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg text-neutral-900">Preview Template</h2>
        <div className="h-[31rem]">
          <FormCodeIDE editable={false} name="template" />
        </div>
      </section>

      <section className="col-span-2 flex flex-col gap-2">
        <div className="flex w-1/2 items-center justify-between">
          <h2 className="text-lg text-neutral-900">Data Type</h2>
          <FormCheckbox
            label="The same input data type"
            name="isSameInputDataType"
          />
        </div>

        <div className="grid grid-cols-6 items-center gap-2">
          <FormSelector
            label="Input Type"
            name="inputType"
            options={primitiveType}
            required
          />
          <FormSelector
            label="Output Type"
            name="inputType"
            options={primitiveType}
            required
          />
        </div>

        <div className="flex items-center gap-1">
          <h2 className="text-lg text-neutral-900">{`Test case (${
            watch('testCase').length
          })`}</h2>
          <IconButton
            onClick={() =>
              append({
                inputs: [{ dataValue: '' }],
                output: '',
              })
            }
          >
            <AddCircleOutline className="text-success-450" />
          </IconButton>
        </div>
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <div className="flex items-center  gap-2">
                  <div className="flex gap-2">
                    <FormInput
                      label={`Input ${index + 1}`}
                      name={`testCase[${index}].inputs[0].dataValue`}
                      required
                    />
                    <FormInput
                      label={`Output ${index + 1}`}
                      name={`testCase[${index}].output`}
                      required
                    />
                  </div>
                  <IconButton
                    className="mt-2"
                    onClick={() => remove(index)}
                    type="button"
                  >
                    <Delete className="text-red-500" />
                  </IconButton>
                </div>
              </div>
            )
          })}
        </div>
        <FormButtonGroup
          buttons={[
            {
              type: 'submit',
              label: 'Cancel',
              onClick: () => {},
              className: 'clearBtn',
            },
            {
              type: 'submit',
              label: 'Create',
              className: 'submitBtn',
            },
          ]}
          className="justify-end"
        />
      </section>
    </Form>
  )
}
