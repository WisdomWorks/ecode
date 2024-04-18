import { SubmitHandler, useForm } from 'react-hook-form'

import { useLogin } from '@/apis'
import { configAuthorization } from '@/apis/axios'
import { Form } from '@/components/form'
import { FormInput } from '@/components/form/FormInput'
import { FormInputPassword } from '@/components/form/FormInputPassword'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage } from '@/hooks'
import { Schema } from '@/types'

import { LoginRequestSchema } from './login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

type TLogin = Schema['LoginRequest']

export const Login = () => {
  const navigate = useNavigate()
  const setUser = useAppStore(state => state.setUser)
  const user = useAppStore(state => state.user)
  const setCourses = useAppStore(state => state.setCourses)
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
      onSuccess: data => {
        const { courses, token, user } = data.data
        setSuccessMessage('Login successfully!')
        configAuthorization(token)
        setUser(user)
        setCourses(courses)
        navigate({ to: '/' })
      },

      onError: error =>
        setErrorMessage(error.response?.data.message || 'Login failed!'),
    })
  }

  if (user) return window.location.replace('/')

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

      <div className="z-50 flex size-full items-center justify-center gap-x-24">
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

          <p className="break-words text-center text-[2rem] font-semibold text-white">
            <span className="whitespace-nowrap">
              Empowering Minds, Igniting Code
            </span>
            <br />
            Welcome to Your Learning Hub! test ne
          </p>
        </div>

        <div className="z-50 flex h-full w-[31rem] items-center">
          <div className="h-fit w-[31rem] rounded-xl bg-white p-16 shadow-l">
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
              <FormInputPassword
                className="mt-1"
                control={control}
                name="password"
              />
              <Button
                className="mt-12 rounded-xl py-2 text-lg"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
              <a
                className="mt-2 text-center text-xs text-primary-450 hover:text-primary-550"
                href="/forget-password"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export const Route = createFileRoute('/login/')({
  component: Login,
})
