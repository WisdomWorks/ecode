import { useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useCreateCodeExercise, useUpdateCodeExercise } from '@/apis'
import {
  Form,
  FormButtonGroup,
  FormCheckbox,
  FormInput,
  FormSelector,
} from '@/components/form'
import { FormTipTap } from '@/components/form/FormTipTap'
import { programmingLanguages } from '@/constants'
import { useToastMessage } from '@/hooks'
import { CreateExerciseInformation } from '@/pages/~course/components'
import { CreateCodeExerciseSchema } from '@/pages/~course/shema/createCodeExercise.schema'
import { Schema } from '@/types'
import { CodeExerciseSchema } from '@/types/exercise.types'
import {
  cn,
  defaultDurationObj,
  defaultTimeWithoutSecond,
  getDateByMinutes,
} from '@/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { AddCircleOutline, Delete, HelpOutline } from '@mui/icons-material'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'
import { getHours, getMinutes } from 'date-fns'

interface Props {
  exercise?: CodeExerciseSchema
  handleBack: () => void
  isUpdate?: boolean
  topicId: string
}

type TCreateCodeExercise = Omit<
  Schema['CreateCodeExerciseRequest'],
  'allowedLanguageIds' | 'testCases'
> & {
  allowedLanguageIds: { key: string }[]
  durationObj: Date
  endDate: Date
  exerciseId: string
  startDate: Date
  testCases: (Schema['TestCase'] & {
    defaultTestCase?: boolean
    isPretest?: boolean
  })[]
}

export const CreateCodeExercise = ({
  exercise,
  handleBack,
  isUpdate,
  topicId,
}: Props) => {
  const { setErrorMessage } = useToastMessage()

  const { isPending: isPendingCreate, mutate: createExercise } =
    useCreateCodeExercise()
  const { isPending: isPendingUpdate, mutate: updateExercise } =
    useUpdateCodeExercise()

  const defaultValues = useMemo(
    () => ({
      exerciseId: exercise?.exerciseId || undefined,
      topicId,
      startTime: '',
      endTime: '',
      reAttempt: exercise?.reAttempt || 1,
      key: exercise?.key || '',
      exerciseName: exercise?.exerciseName || '',
      durationTime: exercise?.durationTime || 0,
      durationObj: exercise?.durationTime
        ? getDateByMinutes(exercise.durationTime)
        : defaultDurationObj,
      startDate: exercise?.startTime
        ? new Date(exercise.startTime)
        : defaultTimeWithoutSecond,
      endDate: exercise?.endTime
        ? new Date(exercise.endTime)
        : defaultTimeWithoutSecond,
      allowedLanguageIds:
        exercise?.allowedLanguageIds.map(item =>
          programmingLanguages.find(pr => pr.key === item),
        ) || [],
      description: exercise?.description || '',
      testCases: exercise?.testCases.map(tc => ({
        ...tc,
        isPretest: tc.points === 0,
      })) || [
        {
          input: '',
          output: '',
          points: 0,
          isPretest: true,
          defaultTestCase: true,
        },
        {
          input: '',
          output: '',
          points: 10,
          isPretest: false,
          defaultTestCase: true,
        },
      ],
      points: 10,
    }),
    [exercise, topicId],
  )

  const form = useForm<TCreateCodeExercise>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(CreateCodeExerciseSchema),
  })

  const { control, setValue, watch } = form

  const { append, fields, remove } = useFieldArray({
    control,
    name: 'testCases',
  })

  const handleSubmit: SubmitHandler<TCreateCodeExercise> = data => {
    const {
      allowedLanguageIds,
      durationObj,
      endDate,
      reAttempt,
      startDate,
      testCases,
      ...rest
    } = data

    const atLeastOnePretest = testCases.some(tc => tc.points === 0)

    if (!atLeastOnePretest) {
      setErrorMessage('At least one pretest must be set')
      return
    }

    const isAllPretest = testCases.every(tc => tc.points === 0)

    if (isAllPretest) {
      setErrorMessage('At least one test case to grade')
      return
    }

    const durationTime = getHours(durationObj) * 60 + getMinutes(durationObj)
    const startTime = startDate.toISOString()
    const endTime = endDate.toISOString()

    const testCaseListInput = testCases.map(tc => ({
      testcaseId: tc.testcaseId || undefined,
      input: tc.input,
      output: tc.output,
      points: tc.points,
    }))

    const allowedLanguageIdsInput = allowedLanguageIds.map(lang => lang.key)

    const input = {
      ...rest,
      reAttempt: Number(reAttempt),
      allowedLanguageIds: allowedLanguageIdsInput,
      testCases: testCaseListInput,
      durationTime,
      endTime,
      startTime,
    }

    if (isUpdate) {
      updateExercise(input, {
        onSuccess: () => handleBack(),
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Create exercise failed',
          ),
      })
      return
    }

    createExercise(input, {
      onSuccess: () => handleBack(),
      onError: error =>
        setErrorMessage(
          error.response?.data.message || 'Create exercise failed',
        ),
    })
  }

  const calculatePoint = () => {
    const testCases = watch('testCases')
    const noOfTcNotPreset = testCases.filter(tc => !tc.isPretest).length
    const lastIndex = testCases.length - 1

    const pointPerTc = Math.round((10 / noOfTcNotPreset) * 100) / 100

    testCases.forEach((testCase, index) => {
      if (index === lastIndex) return
      if (!testCase.isPretest) {
        setValue(`testCases.${index}.points`, pointPerTc)
      }
    })

    const pointLastTc = 10 - pointPerTc * (noOfTcNotPreset - 1)
    setValue(`testCases.${lastIndex}.points`, pointLastTc)
  }

  return (
    <Form
      className="flex h-full flex-col justify-between "
      form={form}
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="col-span-12 text-2xl font-bold">
          {isUpdate ? 'Update ' : 'Create '} Code Exercise
        </h2>
        <CreateExerciseInformation control={control} />
        <Typography className="col-span-12 mt-2" variant="h5">
          Exercise Question
        </Typography>
        <div className="mt-4 grid grid-cols-12 gap-2">
          <FormTipTap
            className="col-span-8"
            classNameEditor="min-h-[10rem] max-h-[10rem] overflow-y-auto"
            control={control}
            label="Topic"
            name="description"
            required
          />
          <FormSelector
            className="col-span-4 mt-6"
            filterSelectedOptions
            getOptionKey={option =>
              typeof option === 'object' ? option.ID : option
            }
            getOptionLabel={option =>
              typeof option === 'object' && 'name' in option
                ? option.name
                : option
            }
            isOptionEqualToValue={(option, value) => option.ID === value.ID}
            label="Language"
            multiple
            name="allowedLanguageIds"
            options={programmingLanguages}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            required
          />
        </div>

        <section className="col-span-2 mt-2 flex flex-col gap-3">
          <h2 className="text-lg text-neutral-900">{`Test case (${
            watch('testCases').length
          })`}</h2>
          <div className="flex flex-col gap-2">
            {fields.map((field, index) => {
              return (
                <div className="mt-2 flex w-full flex-col gap-1" key={field.id}>
                  <h4 className="col-span-1 text-nowrap underline">
                    {`Test case ${index + 1}`}:
                  </h4>
                  <div className="grid grid-cols-12 gap-2">
                    <FormInput
                      className="col-span-4"
                      label={`Input`}
                      maxRows={4}
                      minRows={4}
                      multiline
                      name={`testCases.${index}.input`}
                      placeholder='e.g. "1 2 3 4 5"'
                      required
                    />
                    <FormInput
                      className="col-span-4"
                      label={`Output`}
                      maxRows={4}
                      minRows={4}
                      multiline
                      name={`testCases.${index}.output`}
                      placeholder="Enter output"
                      required
                    />
                    <FormInput
                      className="col-span-1"
                      disabled
                      inputMode="numeric"
                      inputProps={{
                        min: 0,
                        max: 10,
                      }}
                      label={`Points`}
                      name={`testCases.${index}.points`}
                      required
                      type="number"
                    />
                    <div className="col-span-2 mt-3">
                      <FormCheckbox
                        disabled={watch(`testCases`).at(index)?.defaultTestCase}
                        extraOnChange={() => {
                          setValue(`testCases.${index}.points`, 0)
                          calculatePoint()
                        }}
                        label={
                          <Tooltip
                            arrow
                            placement="top-start"
                            title="Tick the checkbox to allow show this test case to student"
                          >
                            <div className="flex gap-2">
                              <span className="whitespace-nowrap">
                                Shown test case
                              </span>
                              <HelpOutline />
                            </div>
                          </Tooltip>
                        }
                        name={`testCases.${index}.isPretest`}
                      />
                    </div>
                    <IconButton
                      className={cn('col-span-1', {
                        'opacity-0 pointer-events-none':
                          index === 0 ||
                          watch(`testCases`).at(index)?.defaultTestCase,
                      })}
                      disabled={isPendingCreate || isPendingUpdate}
                      onClick={() => {
                        remove(index)
                        calculatePoint()
                      }}
                      type="button"
                    >
                      <Delete className="text-red-500" />
                    </IconButton>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
      <div className="mt-3">
        <Button
          disabled={isPendingCreate || isPendingUpdate}
          onClick={() => {
            append({
              input: '',
              output: '',
              points: 0,
              isPretest: false,
              defaultTestCase: false,
            })
            calculatePoint()
          }}
          variant="contained"
        >
          <AddCircleOutline className="mr-2 text-white" />
          Add test case
        </Button>
      </div>
      <FormButtonGroup
        buttons={[
          {
            label: 'Cancel',
            onClick: handleBack,
            className: 'clearBtn',
            disabled: isPendingCreate || isPendingUpdate,
          },
          {
            type: 'submit',
            label: isUpdate ? 'Update' : 'Create',
            className: 'submitBtn',
            disabled: isPendingCreate || isPendingUpdate,
          },
        ]}
        className="mt-2 justify-end pb-4"
      />
    </Form>
  )
}
