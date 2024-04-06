import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Panel, PanelGroup } from 'react-resizable-panels'

import { TGetTestCaseRunCode, useRunCode, useSubmitCodeExercise } from '@/apis'
import { Loading } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Form } from '@/components/form'
import { ResizeHandle } from '@/components/layout'
import { programmingLanguages } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage, useToggle } from '@/hooks'
import { Schema } from '@/types'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { CodeConsole } from './components/CodeConsole'
import { TestCases } from './components/TestCases'
import { Topic } from './components/Topic'
import { useNavigate } from '@tanstack/react-router'

interface Props {
  exercise: CodeExerciseSchema
  isTimeOut: boolean
}

export type TFormCodeExercise = Schema['SubmitCodeExerciseRequest'] & {
  language: (typeof programmingLanguages)[number]
  typeSubmit: 'run' | 'submit'
}

export const CodeExercise = ({ exercise, isTimeOut }: Props) => {
  const user = useAppStore(state => state.user)
  const navigate = useNavigate()
  const { setErrorMessage } = useToastMessage()

  const [openModal, toggleOpenModal] = useToggle()

  const { description, testCases } = exercise

  const [testResult, setTestResult] = useState<TGetTestCaseRunCode | null>(null)
  const [currentTab, setCurrentTab] = useState(0)
  const [isRefetchingGetTestCase, setIsRefetchingGetTestCase] = useState(false)

  const { exerciseId, languageTemplate } = exercise

  const { isPending: isPendingRunCode, mutate: runCode } = useRunCode()
  const { isPending: isPendingSubmit, mutate: submitExercise } =
    useSubmitCodeExercise()

  const [submissionId, setSubmissionId] = useState('')

  const languages = Object.keys(languageTemplate as object).map(id =>
    programmingLanguages.find(pr => pr.key === id),
  )

  const form = useForm<TFormCodeExercise>({
    defaultValues: {
      studentId: user?.userId || '',
      exerciseId,
      source: languageTemplate?.[String(languages[0]?.key)] || '',
      language: languages[0],
      languageId: '',
    },
  })

  const handleSubmitForm: SubmitHandler<TFormCodeExercise> = data => {
    const { language, typeSubmit, ...rest } = data

    const input = {
      ...rest,
      languageId: language.key,
    }

    if (typeSubmit === 'run') {
      return runCode(input, {
        onSuccess: data => {
          setSubmissionId(data.data.submissionId)
          setIsRefetchingGetTestCase(true)
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

  const onSubmit = () => {
    form.setValue('typeSubmit', 'submit')
    form.handleSubmit(handleSubmitForm)()
  }

  useEffect(() => {
    if (isTimeOut) {
      onSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeOut])

  if (isTimeOut) return <Loading />

  const loading = isPendingRunCode || isPendingSubmit || isRefetchingGetTestCase

  return (
    <>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={45} minSize={45}>
              <Topic topic={description} />
            </Panel>

            <ResizeHandle direction="vertical" />

            <Panel defaultSize={55}>
              <TestCases
                currentTab={currentTab}
                loading={isRefetchingGetTestCase}
                setCurrentTab={setCurrentTab}
                testCases={testCases}
                testResult={testResult}
              />
            </Panel>
          </PanelGroup>
        </Panel>
        <ResizeHandle />

        <Panel defaultSize={60} minSize={40}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={80} minSize={80}>
              <FormProvider {...form}>
                <Form
                  className="h-full"
                  form={form}
                  onSubmit={handleSubmitForm}
                >
                  <CodeConsole
                    exercise={exercise}
                    isRefetchingGetTestCase={isRefetchingGetTestCase}
                    loading={loading}
                    setCurrentTab={setCurrentTab}
                    setIsRefetchingGetTestCase={setIsRefetchingGetTestCase}
                    setTestResult={setTestResult}
                    submissionId={submissionId}
                  />
                </Form>
              </FormProvider>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
      <ConfirmModal
        isOpen={openModal}
        onClose={toggleOpenModal}
        onConfirm={onSubmit}
        title="Please check your assignment carefully before submitting. Do you want to submit an assignment?"
        variant="confirm"
      />
    </>
  )
}
