import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormDateTimePicker, FormInput } from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { CreateEssayExerciseSchema } from '@/pages/~course/shema/createEssayExercise.schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider } from '@mui/material'

type TCreateEssay = {
  endDate?: Date
  files?: File | null
  startDate?: Date
  title: string
  topic: string
}

export const CreateEssayExercise = () => {
  const form = useForm<TCreateEssay>({
    defaultValues: {
      files: null,
      title: '',
      topic: '',
      startDate: new Date(),
      endDate: new Date(),
    },
    resolver: zodResolver(CreateEssayExerciseSchema),
  })

  const onSubmit: SubmitHandler<TCreateEssay> = data => {
    console.log(data)
  }

  return (
    <Form
      className="mt-4 grid grid-cols-12 gap-4"
      form={form}
      onSubmit={onSubmit}
    >
      <h2 className="col-span-12 text-2xl font-bold">Create Essay Exercise</h2>
      <FormInput className="col-span-6" label="Title" name="title" required />
      <div className="col-span-6"></div>
      <div className="col-span-12 flex w-3/5 justify-center gap-2">
        <FormDateTimePicker label="Start date" name="startDate" required />
        <div className="flex h-full items-center justify-center">
          <Divider
            className="h-[0.75px] w-3 bg-neutral-900"
            orientation="vertical"
          />
        </div>
        <FormDateTimePicker label="End Date" name="endDate" required />
      </div>
      <FormTipTap
        className="col-span-9"
        classNameEditor="min-h-[12rem]"
        label="Topic"
        name="topic"
        required
      />
      <div className="col-span-3"></div>

      <div className="col-span-12 flex justify-end">
        <Button className="submitBtn" type="submit" variant="contained">
          Create
        </Button>
      </div>
    </Form>
  )
}
