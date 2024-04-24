import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Panel, PanelGroup } from 'react-resizable-panels'

import {
  CodeSubmission,
  ResultTestCase,
  TGetTestCaseRunCode,
  useRunCode,
  useSubmitCodeExercise,
} from '@/apis'
import { Loading } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Form } from '@/components/form'
import { ResizeHandle } from '@/components/layout'
import { programmingLanguages } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { useToastMessage, useToggle } from '@/hooks'
import { useConfirmTabClose } from '@/hooks/useConfirmTabClose'
import { Schema } from '@/types'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { CodeConsole } from './components/CodeConsole'
import { TestCases } from './components/TestCases'
import { Topic } from './components/Topic'
import { useNavigate } from '@tanstack/react-router'

interface Props {
  exercise: CodeExerciseSchema
  isReview?: boolean
  isTimeOut?: boolean
  resultTestCases?: ResultTestCase[]
  submissions?: CodeSubmission
  themeCodeEditor?: string
}

export type TFormCodeExercise = Schema['SubmitCodeExerciseRequest'] & {
  language: (typeof programmingLanguages)[number]
  typeSubmit: 'run' | 'submit'
}

export const CodeExercise = ({
  exercise,
  isReview,
  isTimeOut = true,
  resultTestCases,
  submissions,
  themeCodeEditor,
}: Props) => {
  useConfirmTabClose()
  const user = useAppStore(state => state.user)
  const navigate = useNavigate()
  const { setErrorMessage, setSuccessMessage } = useToastMessage()

  const [openModal, toggleOpenModal] = useToggle()

  const {
    description,
    exerciseId,
    languageTemplate,
    testCases,
    usingAiGrading,
  } = exercise

  const [testResult, setTestResult] = useState<TGetTestCaseRunCode | null>(null)
  const [currentTab, setCurrentTab] = useState(0)
  const [isRefetchingGetTestCase, setIsRefetchingGetTestCase] = useState(false)

  const { isPending: isPendingRunCode, mutate: runCode } = useRunCode()
  const { isPending: isPendingSubmit, mutate: submitExercise } =
    useSubmitCodeExercise()

  const [submissionId, setSubmissionId] = useState('')

  const languages = isReview
    ? []
    : Object.keys(languageTemplate as object).map(id =>
        programmingLanguages.find(pr => pr.key === id),
      )

  const form = useForm<TFormCodeExercise>({
    defaultValues: {
      studentId: user?.userId || '',
      exerciseId,
      source: isReview
        ? submissions?.source
        : languageTemplate?.[String(languages[0]?.key)] || '',
      language: isReview
        ? programmingLanguages.find(pr => pr.key === submissions?.languageId)
        : languages[0],
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
        setSuccessMessage('Submit exercise successfully')
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

            <ResizeHandle
              className="dark:bg-darkMode-800"
              direction="vertical"
            />

            <Panel defaultSize={55}>
              <TestCases
                currentTab={currentTab}
                isReview={isReview}
                loading={isRefetchingGetTestCase}
                resultTestCases={resultTestCases}
                setCurrentTab={setCurrentTab}
                testCases={testCases}
                testResult={testResult}
                usingAiGrading={usingAiGrading}
              />
            </Panel>
          </PanelGroup>
        </Panel>
        <ResizeHandle className="dark:bg-darkMode-800" />

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
                    isReview={isReview}
                    loading={loading}
                    setCurrentTab={setCurrentTab}
                    setIsRefetchingGetTestCase={setIsRefetchingGetTestCase}
                    setTestResult={setTestResult}
                    submissionId={submissionId}
                    themeCodeEditor={themeCodeEditor}
                    toggleOpenModal={toggleOpenModal}
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
