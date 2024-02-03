import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormCodeIDE, FormSelector } from '@/components'
import { languages, TLanguage } from '@/utils'

import { Button, Divider, TextField } from '@mui/material'

type TForm = {
  code: string
  language: TLanguage
  topic: string
}

export const CodeConsole = () => {
  const form = useForm<TForm>({
    defaultValues: {
      language: {
        ID: '',
        label: '',
      },
      topic: '',
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
      <div className="grid grid-cols-3 p-2">
        <FormSelector
          control={control}
          name="language"
          options={languages}
          renderInput={params => (
            <TextField {...params} placeholder="Select language" />
          )}
        />
      </div>
      <Divider className="bg-gray-400" />

      <FormCodeIDE control={control} name="code" />

      <div className="flex justify-end p-2">
        <Button color="success" type="submit" variant="contained">
          Run code
        </Button>
      </div>
    </Form>
  )
}
