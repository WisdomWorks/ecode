import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormCodeIDE, FormSelector } from '@/components/form'
import { languages } from '@/constants'
import { TLanguage } from '@/types'

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

  const handleSubmitForm: SubmitHandler<TForm> = data => console.log(data)

  return (
    <Form
      className="flex h-full flex-col bg-editor-dark"
      form={form}
      onSubmit={handleSubmitForm}
    >
      <div className="grid grid-cols-3 p-2">
        <FormSelector
          label="Select language"
          name="language"
          options={languages}
          renderInput={params => (
            <TextField {...params} placeholder="Select language" />
          )}
        />
      </div>
      <Divider className="bg-gray-400" />

      <FormCodeIDE name="code" />

      <div className="flex justify-end p-2">
        <Button color="success" type="submit" variant="contained">
          Run code
        </Button>
      </div>
    </Form>
  )
}
