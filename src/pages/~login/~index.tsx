import { SubmitHandler, useForm } from 'react-hook-form'

import { useLogin } from '@/apis/useLogin'
import { Form } from '@/components/form'
import { FormInput } from '@/components/form/FormInput'
import { FormInputPassword } from '@/components/form/FormInputPassword'
import { useToastMessage } from '@/hooks'
import { Schema } from '@/types'

import { LoginRequestSchema } from './login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { createFileRoute, Link } from '@tanstack/react-router'

type TLogin = Schema['LoginRequest']

export const Login = () => {
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const { mutate } = useLogin()
  const form = useForm<TLogin>({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: zodResolver(LoginRequestSchema),
  })

  const { control } = form

  const onLogin: SubmitHandler<TLogin> = data => {
    mutate(data, {
      onSuccess: () => setSuccessMessage('Login successfully!'),
      onError: error =>
        setErrorMessage(error.response?.data.message || 'Login failed!'),
    })
  }

  return (
    <Form
      className="relative size-full overflow-hidden bg-primary-400"
      form={form}
      onSubmit={onLogin}
    >
      <div
        className="absolute left-[-10rem] top-[40rem] size-[41rem] rounded-full bg-primary-500"
        id="circle"
      ></div>
      <div
        className="absolute bottom-[-3rem] right-[-4rem] h-[20rem] w-[60rem] rounded-xl bg-primary-500"
        id="rectangle"
      ></div>
      <div
        className="absolute right-[-15rem] top-[-20rem] size-[50rem] rounded-full bg-primary-500"
        id="oval"
      ></div>

      <div className="z-50 flex size-full justify-between px-[20rem] py-[15rem]">
        <div className="z-50 flex flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-8">
            <div className="flex size-[7.25rem] items-center justify-center  rounded-[3.625rem] bg-danger-400 ">
              <span className="text-[3.75rem]">✍️</span>
            </div>
            <div className="flex size-[7.25rem] items-center justify-center  rounded-[3.625rem] bg-warning-400 ">
              <span className="text-[3.75rem]">📇</span>
            </div>
            <div className="flex size-[7.25rem] items-center justify-center  rounded-[3.625rem] bg-success-400 ">
              <span className="text-[3.75rem]">🥰</span>
            </div>
          </div>

          <p className=" break-words text-center text-[2.5rem] font-semibold text-white">
            Empowering Minds, Igniting Code <br />
            Welcome to Your Learning Hub!
          </p>
        </div>

        <div className="z-50 w-[31rem] rounded-xl bg-white p-16 shadow-l">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-3xl font-semibold text-neutral-900">
              Welcome!
            </h3>
            <span className="text-xs text-neutral-600">
              Enter your credentials to access your account
            </span>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <FormInput
              label="Username"
              name="userName"
              placeholder="Enter your username"
              required
            />
            <FormInputPassword control={control} name="password" />
            <Button
              className="mt-2 rounded-xl py-2 text-lg"
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
            <Link
              className="mt-2 text-center text-xs text-primary-450 hover:text-primary-550"
              to="/forget-password"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </Form>
  )
}

export const Route = createFileRoute('/login/')({
  component: Login,
})
