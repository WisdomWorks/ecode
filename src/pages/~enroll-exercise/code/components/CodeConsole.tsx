import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { TGetTestCaseRunCode, useGetTestCaseRunCode } from '@/apis'
import { FormCodeIDE, FormSelector } from '@/components/form'
import { programmingLanguages } from '@/constants'
import { useCheckRole, useInterval } from '@/hooks'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { TFormCodeExercise } from '../CodeExercise'
import {
  BackupOutlined,
  PlayArrow,
  TerminalOutlined,
} from '@mui/icons-material'
import { Button, Divider } from '@mui/material'

interface Props {
  exercise: CodeExerciseSchema
  isRefetchingGetTestCase: boolean
  isUpdate?: boolean
  loading: boolean
  setCurrentTab: (index: number) => void
  setIsRefetchingGetTestCase: Dispatch<SetStateAction<boolean>>
  setTestResult: Dispatch<SetStateAction<TGetTestCaseRunCode | null>>
  submissionId: string
  toggleOpenModal: () => void
}

export const CodeConsole = ({
  exercise,
  isRefetchingGetTestCase,
  isUpdate,
  loading,
  setCurrentTab,
  setIsRefetchingGetTestCase,
  setTestResult,
  submissionId,
  toggleOpenModal,
}: Props) => {
  const { control, setValue, watch } = useFormContext<TFormCodeExercise>()
  const { isStudent } = useCheckRole()

  const { data: testCaseRunCodeData, refetch: getTestCase } =
    useGetTestCaseRunCode({
      submissionId,
    })

  const { languageTemplate, testCases } = exercise

  const preTestCaseLength = testCases.filter(tc => tc.points === 0).length

  useEffect(() => {
    if (
      testCaseRunCodeData?.data.testCases.length === preTestCaseLength ||
      ['IE', 'CE'].includes(String(testCaseRunCodeData?.data.status))
    ) {
      setIsRefetchingGetTestCase(false)
      setTestResult(testCaseRunCodeData?.data || null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseRunCodeData])

  useInterval(
    () => {
      getTestCase()
    },
    isRefetchingGetTestCase &&
      preTestCaseLength !== testCaseRunCodeData?.data.testCases.length
      ? 500
      : null,
  )

  const languages = isUpdate
    ? []
    : Object.keys(languageTemplate as object).map(id =>
        programmingLanguages.find(pr => pr.key === id),
      )

  return (
    <div className="flex h-full flex-col rounded-md border border-gray-300 bg-white">
      <div className="flex h-8 rounded-md bg-gray-100 px-3 pt-1">
        <TerminalOutlined className=" mr-2 mt-1 text-lg text-green-500" />
        <p className="mb-3 text-base font-bold capitalize">Code</p>
      </div>

      <div className=" flex justify-between">
        <div className="">
          <FormSelector
            className="my-1 ml-3 w-36"
            classes={{
              root: 'bg-white rounded-lg',
            }}
            control={control}
            disableClearable
            disabled={isUpdate}
            extraOnChange={() =>
              setValue(
                'source',
                languageTemplate?.[String(watch('language').key)] || '',
              )
            }
            filterSelectedOptions
            getOptionKey={option =>
              typeof option === 'object' ? option.ID : (option as string)
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
            size="small"
          />
        </div>

        <div className="flex h-16 justify-end gap-2 p-2">
          {isUpdate && isStudent ? null : (
            <Button
              color="success"
              disabled={loading}
              onClick={() => {
                setValue('typeSubmit', 'run')
                setCurrentTab(1)
              }}
              startIcon={<PlayArrow />}
              type="submit"
              variant="text"
            >
              Run code
            </Button>
          )}
          <Divider className="bg-gray-100" orientation="vertical" />
          {!isUpdate && (
            <Button
              color="primary"
              disabled={loading}
              onClick={toggleOpenModal}
              startIcon={<BackupOutlined />}
              variant="text"
            >
              Submit
            </Button>
          )}
        </div>
      </div>

      <Divider className="bg-gray-100" />
      <FormCodeIDE
        control={control}
        editable={isUpdate ? false : true}
        name="source"
      />
    </div>
  )
}
