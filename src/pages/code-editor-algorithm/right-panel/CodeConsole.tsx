import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormCodeIDE, FormSelector } from '@/components'
import { languages, TLanguage } from '@/utils'

import { Button } from '@mui/material'

type TForm = {
  code: string
  language: TLanguage
}

export const CodeConsole = () => {
  const form = useForm<TForm>({
    defaultValues: {
      language: {
        ID: '',
        label: '',
      },
      code: '',
    },
  })
  const { control } = form

  const handleSubmitForm: SubmitHandler<TForm> = data => console.log(data)

  return (
    <Form
      className="flex h-full flex-col bg-editor-dark"
      form={form}
      onSubmit={handleSubmitForm}
    >
      <div>
        <FormSelector
          control={control}
          label="Select language"
          name="language"
          options={languages}
        />
      </div>
      <FormCodeIDE control={control} name="code" />

      <div className="flex justify-end p-2">
        <Button color="success" type="submit" variant="contained">
          Run code
        </Button>
      </div>
    </Form>
  )
}
