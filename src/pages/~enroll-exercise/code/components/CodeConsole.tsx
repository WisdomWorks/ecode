import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  useGetTestCaseRunCode,
  useRunCode,
  useSubmitCodeExercise,
} from '@/apis'
import { Form, FormCodeIDE } from '@/components/form'
import { programmingLanguages } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
// import { useInterval } from '@/hooks'
import { Schema } from '@/types'
import { CodeExerciseSchema } from '@/types/exercise.types'

import { Button, Divider, MenuItem } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import { styled, alpha } from '@mui/material/styles'
import {
  KeyboardArrowDownOutlined,
  TerminalOutlined,
  PlayArrow,
  BackupOutlined,
} from '@mui/icons-material'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { isPending: isPendingRunCode, mutate: runCode } = useRunCode()
  const {
    isPending: isPendingSubmit,
    // mutate: submitExercise
  } = useSubmitCodeExercise()

  const [submissionId, setSubmissionId] = useState('')
  const {
    // data: testCaseRunCode,
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

  // const preTestCaseLength = testCases.length

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
  }

  return (
    <Form
      className="flex h-full flex-col bg-white rounded-md border border-gray-300"
      form={form}
      onSubmit={handleSubmitForm}
    >
      <div className="rounded-md bg-gray-100 px-3 pt-1 h-8 flex">
        <TerminalOutlined className=" text-lg mr-2 mt-1 text-green-500" />
        <p className="mb-3 text-base font-bold capitalize">Code</p>
      </div>
      {/* <div className="grid grid-cols-3 p-2">
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
        </div> */}
      <div className=" flex justify-between">
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="text"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownOutlined />}
          className="m-1"
          color="success"
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {languages.map((option, index) => (
            <MenuItem key={index} onClick={handleClose} disableRipple>
              {option?.name}
            </MenuItem>
          ))}
        </StyledMenu>

        <div className="flex justify-end gap-2 p-2">
          <Button
            color="success"
            disabled={isPendingRunCode || isPendingSubmit || isRefetching}
            onClick={() => setValue('typeSubmit', 'run')}
            type="submit"
            variant="text"
            startIcon={<PlayArrow />}
          >
            Run code
          </Button>
          <Divider orientation="vertical" className="bg-gray-100" />
          <Button
            color="primary"
            disabled={isPendingRunCode || isPendingSubmit || isRefetching}
            onClick={() => setValue('typeSubmit', 'submit')}
            type="submit"
            variant="text"
            startIcon={<BackupOutlined />}
          >
            Submit
          </Button>
        </div>
      </div>
      <Divider className="bg-gray-100" />
      <FormCodeIDE name="source" />
    </Form>
  )
}
