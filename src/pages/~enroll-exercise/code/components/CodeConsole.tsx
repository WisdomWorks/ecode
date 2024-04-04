import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useGetTestCaseRunCode,
  useRunCode,
  useSubmitCodeExercise,
} from '@/apis'
import { Form, FormCodeIDE, FormSelector } from '@/components/form'
import { programmingLanguages } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { useInterval, useToastMessage } from '@/hooks'
import { Schema } from '@/types'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Button, Divider } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
interface Props {
  exercise: CodeExerciseSchema
}

type TForm = Schema['SubmitCodeExerciseRequest'] & {
  language: (typeof programmingLanguages)[number]
  typeSubmit: 'run' | 'submit'
}

export const CodeConsole = ({ exercise }: Props) => {
  const user = useAppStore(state => state.user)

  const navigate = useNavigate()
  const { setErrorMessage } = useToastMessage()

  const { isPending: isPendingRunCode, mutate: runCode } = useRunCode()
  const { isPending: isPendingSubmit, mutate: submitExercise } =
    useSubmitCodeExercise()

  const [submissionId, setSubmissionId] = useState('')
  const {
    data: testCaseRunCode,
    isRefetching,
    refetch: getTestCase,
  } = useGetTestCaseRunCode({
    submissionId,
  })

  // useInterval(() => {

  // },
  //   preTestCaseLength !== testCaseRunCode
  // )

  const { allowedLanguageIds, exerciseId, testCases } = exercise

  const preTestCaseLength = testCases.length

  const languages =
    allowedLanguageIds.map(id =>
      programmingLanguages.find(pr => pr.key === id),
    ) || []

  const form = useForm<TForm>({
    defaultValues: {
      studentId: user?.userId || '',
      exerciseId,
      source: '#include <stdio.h>\r\n\r\nint main() {\r\n    return 0;\r\n}',
      language: languages[0],
      languageId: '',
    },
  })

  const { setValue } = form

  const handleSubmitForm: SubmitHandler<TForm> = data => {
    const { language, typeSubmit, ...rest } = data

    const input = {
      ...rest,
      languageId: 'C',
    }

    if (typeSubmit === 'run') {
      return runCode(input, {
        onSuccess: data => {
          setSubmissionId(data.data.submissionId)
          setTimeout(() => {
            getTestCase()
          }, 3000)
        },
      })
    }

    submitExercise(input, {
      onSuccess: () => {
        navigate({ to: '/' })
      },
      onError: error => {
        setErrorMessage(
          error.response?.data.message || 'Submit failed. Try again',
        )
      },
    })
  }

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
          filterSelectedOptions
          getOptionKey={option =>
            typeof option === 'object' ? option?.ID : (option as string)
          }
          getOptionLabel={option =>
            typeof option === 'object' && 'name' in option
              ? option.name
              : (option as string)
          }
          isOptionEqualToValue={(option, value) => option?.ID === value?.ID}
          label="Language"
          name="language"
          options={languages}
          renderOption={(props, option) => <li {...props}>{option?.name}</li>}
          required
        />
      </div>
      <Divider className="bg-gray-400" />

      <FormCodeIDE name="source" />

      <div className="flex justify-end gap-2 p-2">
        <Button
          color="success"
          disabled={isPendingRunCode || isPendingSubmit || isRefetching}
          onClick={() => setValue('typeSubmit', 'run')}
          type="submit"
          variant="contained"
        >
          Run code
        </Button>
        <Button
          color="primary"
          disabled={isPendingRunCode || isPendingSubmit || isRefetching}
          onClick={() => setValue('typeSubmit', 'submit')}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </Form>
  )
}
