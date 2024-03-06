import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormInput, FormInputPassword } from '@/components/form'
import { useBoolean } from '@/hooks'

import { ForgetPasswordSchema } from './forgetPassword.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowBackIosNewRounded,
  CheckCircleRounded,
  DangerousRounded,
} from '@mui/icons-material'
import { Alert, Button, Step, StepButton, Stepper } from '@mui/material'
import { createFileRoute, Link } from '@tanstack/react-router'

type TForgetPassword = {
  activeStep: number
  confirmPassword: string
  email: string
  newPassword: string
  otp: string
}

const steps = [
  'Enter your email',
  'Enter OTP',
  'Reset Password',
  'Confirmation',
]

export const Home = () => {
  const { setValue: setVerifySuccess, value: isVerifySuccess } = useBoolean()
  console.log(setVerifySuccess)

  const form = useForm<TForgetPassword>({
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
      activeStep: 0,
    },
    resolver: zodResolver(ForgetPasswordSchema),
  })

  const { control, reset, setValue, watch } = form

  const activeStep = watch('activeStep')

  const handleStep = (step: number) => () => {
    setValue('activeStep', step)
  }

  const onTryAgain = () => {
    reset()
    setValue('activeStep', 0)
  }

  const getStepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Alert className="whitespace-nowrap p-0" severity="info">
              Enter the email address associated with your account in the field
              below.
            </Alert>
            <FormInput
              control={control}
              label="Email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </>
        )
      case 1:
        return (
          <>
            <Alert className="break-words p-0" severity="info">
              Please check your email (and spam folder, just in case!) to get
              the OTP verification code
            </Alert>
            <FormInput
              control={control}
              label="OTP"
              name="otp"
              placeholder="Enter the OTP"
              required
            />
          </>
        )
      case 2:
        return (
          <>
            <Alert className="whitespace-nowrap p-0" severity="info">
              Enter your new password and confirm it to reset your password
            </Alert>
            <FormInputPassword
              control={control}
              label="New Password"
              name="newPassword"
              placeholder="Enter your new password"
              required
              type="password"
            />
            <FormInputPassword
              control={control}
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Enter your new password"
              required
              type="password"
            />
          </>
        )
      case 3:
        return (
          <div className="flex flex-col items-center justify-center">
            {isVerifySuccess ? (
              <>
                <CheckCircleRounded className="size-36 text-success-500" />
                <span className="text-lg font-semibold text-success-500">
                  Reset password successfully
                </span>
                <div className="mt-4 flex w-full justify-end">
                  <Button variant="outlined">
                    <Link to="/login">Back to Login</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <DangerousRounded className="size-36 text-danger-500" />
                <span className="text-lg font-semibold text-danger-500">
                  Reset password unsuccessfully
                </span>
                <div className="mt-4 flex w-full justify-end">
                  <Button onClick={onTryAgain} variant="outlined">
                    Try again
                  </Button>
                </div>
              </>
            )}
          </div>
        )

      default:
        break
    }
  }

  const onSubmitForm: SubmitHandler<TForgetPassword> = data => {
    setValue('activeStep', activeStep + 1)
    console.log(data)
  }

  return (
    <Form
      className="relative size-full overflow-hidden bg-primary-400"
      form={form}
      onSubmit={onSubmitForm}
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

      <div className="z-50 flex size-full justify-center py-[15rem]">
        <div className="z-50 w-[35rem] rounded-xl bg-white px-8 py-16 shadow-l">
          {activeStep !== 4 && !isVerifySuccess && (
            <div className="mb-4 flex w-full justify-start">
              <Button variant="text">
                <ArrowBackIosNewRounded className="size-4" />
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          )}
          <div className="mb-8 flex flex-col items-center gap-2">
            <h3 className="text-3xl font-semibold text-neutral-900">
              Welcome back!
            </h3>
            <span className="text-xs text-neutral-600">
              Follow the instructions to recover your account
            </span>
          </div>
          <div className="mb-4">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton onClick={handleStep(index)}>{label}</StepButton>
                </Step>
              ))}
            </Stepper>
          </div>

          <div className="flex flex-col gap-4">
            {getStepComponent()}

            {activeStep !== 3 && (
              <Button
                className="rounded-lg py-2 text-lg"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </Form>
  )
}

export const Route = createFileRoute('/forget-password/')({
  component: Home,
})
