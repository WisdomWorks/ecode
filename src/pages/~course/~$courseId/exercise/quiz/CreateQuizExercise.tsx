import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormInput } from '@/components/form'
import { Schema } from '@/types'

import { FormInformation } from './FormInformation'
import { FormQuestion } from './FormQuestion'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { z } from 'zod'

export type TQuestion = Schema['QuizQuestion'] & {
  isMultipleChoice?: boolean
}

export type FormCreateQuizExercise = Omit<
  Schema['QuizExercise'],
  'endTime' | 'questions' | 'startTime'
> & {
  endTime: Date
  noOfQuestions: number
  questions: TQuestion[]
  startTime: Date
}

const defaultQuestion: TQuestion = {
  title: '',
  isMultipleChoice: false,
  choices: [],
  answers: [],
  description: '',
}

export const CreateQuizExercise = () => {
  const form = useForm<FormCreateQuizExercise>({
    defaultValues: {
      exerciseName: '',
      startTime: new Date(),
      endTime: new Date(),
      publicGroupIds: [],
      questions: [defaultQuestion],
      noOfQuestions: 4,
    },
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        exerciseName: z.string().min(1, { message: 'Title is required' }),
        startTime: z.date(),
        endTime: z.date(),
        publicGroupIds: z.array(z.string()),
        questions: z.array(
          z.object({
            title: z.string(),
            isMultipleChoice: z.boolean(),
            choices: z.array(z.string()),
            answers: z.array(z.string()),
            description: z.string(),
          }),
        ),
      }),
    ),
  })

  console.log(form.formState.errors)

  const onSubmit: SubmitHandler<FormCreateQuizExercise> = data => {
    console.log(data)
  }

  return (
    <FormProvider {...form}>
      <Form
        className="mt-4 grid grid-cols-12 gap-4"
        form={form}
        onSubmit={onSubmit}
      >
        <h2 className="col-span-12 text-2xl font-bold">
          Create Essay Exercise
        </h2>
        <FormInput
          className="col-span-6"
          label="Title"
          name="exerciseName"
          required
        />

        <FormInformation />

        <FormQuestion defaultQuestion={defaultQuestion} />

        <div className="col-span-12 flex justify-end">
          <Button className="submitBtn" type="submit">
            Create
          </Button>
        </div>
      </Form>
    </FormProvider>
  )
}
