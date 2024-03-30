import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormCodeIDE, FormSelector } from '@/components/form'
import { languages } from '@/constants'

import { Button, Divider, TextField } from '@mui/material'

export const CodeConsole = () => {
  const form = useForm({
    defaultValues: {
      containerId: '',
      contentFile: '',
      fileName: 'test',
      inputs: [],
    },
  })

  const handleSubmitForm: SubmitHandler<object> = data => console.log(data)

  return (
    <Form
      className="flex h-full flex-col bg-editor-dark"
      form={form}
      onSubmit={handleSubmitForm}
    >
      <div className="grid grid-cols-3 p-2">
        <FormSelector
          className="text-white"
          classes={{
            root: 'bg-white rounded-lg',
          }}
          label="Select language"
          name="language"
          options={languages}
          renderInput={params => (
            <TextField
              {...params}
              className=" bg-white"
              placeholder="Select language"
            />
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
