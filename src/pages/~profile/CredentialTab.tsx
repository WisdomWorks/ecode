import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormInputPassword } from '@/components/form'

import { ChangePasswordSchema } from './schema/changePassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'

type TForm = {
  confirmPassword: string
  newPassword: string
  oldPassword: string
}

export const CredentialTab = () => {
  const form = useForm<TForm>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(ChangePasswordSchema),
  })

  const handleSubmit: SubmitHandler<TForm> = data => {
    console.log(data)
  }

  return (
    <Form
      className="flex flex-col gap-4 lg:w-1/2"
      form={form}
      onSubmit={handleSubmit}
    >
      <h3>Change password</h3>
      <FormInputPassword
        label="Current Password"
        name="oldPassword"
        placeholder="Enter your old password"
        required
        type="password"
      />
      <FormInputPassword
        label="New Password"
        name="newPassword"
        placeholder="Enter your new password"
        required
        type="password"
      />
      <FormInputPassword
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Enter your new password"
        required
        type="password"
      />
      <div className="flex justify-end">
        <Button className="submitBtn" type="submit" variant="contained">
          Change Password
        </Button>
      </div>
    </Form>
  )
}
