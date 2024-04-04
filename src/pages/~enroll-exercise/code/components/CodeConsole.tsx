import { useEffect, useState } from 'react'
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
// import { useInterval } from '@/hooks'
import { Schema } from '@/types'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Console } from './Console'
import {
  BackupOutlined,
  KeyboardArrowDownOutlined,
  PlayArrow,
  TerminalOutlined,
} from '@mui/icons-material'
import { Button, Divider, MenuItem } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import { alpha, styled } from '@mui/material/styles'
import { useNavigate } from '@tanstack/react-router'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    elevation={0}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))

interface Props {
  exercise: CodeExerciseSchema
}

type TForm = Schema['SubmitCodeExerciseRequest'] & {
  language: (typeof programmingLanguages)[number]
  typeSubmit: 'run' | 'submit'
}

export const CodeConsole = ({ exercise }: Props) => {
  const user = useAppStore(state => state.user)

  const [isRefetchingGetTestCase, setIsRefetchingGetTestCase] = useState(false)

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const navigate = useNavigate()
  const { setErrorMessage } = useToastMessage()

  const { isPending: isPendingRunCode, mutate: runCode } = useRunCode()
  const { isPending: isPendingSubmit, mutate: submitExercise } =
    useSubmitCodeExercise()

  const [submissionId, setSubmissionId] = useState('')
  const {
    data: testCaseRunCodeData,
    isRefetching,
    refetch: getTestCase,
  } = useGetTestCaseRunCode({
    submissionId,
  })

  const { exerciseId, languageTemplate, testCases } = exercise

  const preTestCaseLength = testCases.length

  useEffect(() => {
    if (
      testCaseRunCodeData?.data.testCases.length === preTestCaseLength ||
      ['IE', 'CE'].includes(String(testCaseRunCodeData?.data.status))
    ) {
      setIsRefetchingGetTestCase(false)
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

  const languages = Object.keys(languageTemplate as object).map(id =>
    programmingLanguages.find(pr => pr.key === id),
  )

  console.log()

  const form = useForm<TForm>({
    defaultValues: {
      studentId: user?.userId || '',
      exerciseId,
      source: languageTemplate?.[String(languages[0]?.key)] || '',
      language: languages[0],
      languageId: '',
    },
  })

  const { setValue, watch } = form

  const handleSubmitForm: SubmitHandler<TForm> = data => {
    const { language, typeSubmit, ...rest } = data

    const input = {
      ...rest,
      // languageId: language.key,
      languageId: 'PY3',
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

  const languageSelected = watch('language')

  useEffect(() => {
    setValue('source', languageTemplate?.[String(languageSelected?.key)] || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageSelected])

  return (
    <Form
      className="flex h-full flex-col rounded-md border border-gray-300 bg-white"
      form={form}
      onSubmit={handleSubmitForm}
    >
      <div className="flex h-8 rounded-md bg-gray-100 px-3 pt-1">
        <TerminalOutlined className=" mr-2 mt-1 text-lg text-green-500" />
        <p className="mb-3 text-base font-bold capitalize">Code</p>
      </div>

      <div className=" flex justify-between">
        <div className="">
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
        {/* <Button
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          className="m-1"
          color="success"
          disableElevation
          endIcon={<KeyboardArrowDownOutlined />}
          id="demo-customized-button"
          onClick={handleClick}
          variant="text"
        >
          Options
        </Button>
        <StyledMenu
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          id="demo-customized-menu"
          onClose={handleClose}
          open={open}
        >
          {languages.map((option, index) => (
            <MenuItem disableRipple key={index} onClick={handleClose}>
              {option?.name}
            </MenuItem>
          ))}
        </StyledMenu> */}

        <div className="flex justify-end gap-2 p-2">
          <Button
            color="success"
            disabled={isPendingRunCode || isPendingSubmit || isRefetching}
            onClick={() => setValue('typeSubmit', 'run')}
            startIcon={<PlayArrow />}
            type="submit"
            variant="text"
          >
            Run code
          </Button>
          <Divider className="bg-gray-100" orientation="vertical" />
          <Button
            color="primary"
            disabled={isPendingRunCode || isPendingSubmit || isRefetching}
            onClick={() => setValue('typeSubmit', 'submit')}
            startIcon={<BackupOutlined />}
            type="submit"
            variant="text"
          >
            Submit
          </Button>
        </div>
      </div>
      <Divider className="bg-gray-100" />

      <div className="flex h-full flex-col">
        <div className="h-full">
          <FormCodeIDE name="source" />
        </div>
        <div className="h-1/6">
          <Console />
        </div>
      </div>
    </Form>
  )
}
