import { Dispatch, SetStateAction } from 'react'

import { FileUpload } from '@/components/common'

import { Download } from '@mui/icons-material'
import { Button } from '@mui/material'

interface Props {
  files: FileList | null
  isPendingCreateByExcel: boolean
  setFiles: Dispatch<SetStateAction<FileList | null>>
}

export const FormExcelQuestion = ({
  files,
  isPendingCreateByExcel,
  setFiles,
}: Props) => {
  return (
    <div className="col-span-12 mt-8  grid grid-cols-2 divide-x divide-neutral-400">
      <div className="flex flex-col gap-2 pr-8">
        <span className="text-2xl font-bold text-neutral-900">
          Upload files
        </span>
        <FileUpload
          files={files}
          loading={isPendingCreateByExcel}
          setFiles={setFiles}
          typeFiles={['Excel']}
        />
      </div>
      <div className="flex flex-col gap-2 pl-8">
        <div>
          <h3>Please fill in the excel file in the format:</h3>
          <ol>
            <li>
              <p>Corresponding columns:</p>
            </li>
          </ol>
          <ul>
            <li>
              <p>Column A is the question</p>
            </li>
            <li>
              <p>Columns B, C, D, E represent 4 options respectively</p>
            </li>
            <li>
              <p>Column F corresponds to the answer</p>
            </li>
          </ul>
          <ol start={2}>
            <li>
              <p>A row must have all columns A, B, C, D, E, F</p>
            </li>
            <li>
              <p>The options cannot overlap each other</p>
            </li>
            <li>
              <p>Example for answer column F: </p>
            </li>
          </ol>
          <ul>
            <li>
              <p>A1 for single choice questions</p>
            </li>
            <li>
              <p>A1, B1 for multiple choices questions</p>
            </li>
          </ul>
          <h5>
            The system will not import goods that do not comply with the above
            format
          </h5>
          <h5>Click the button below to get the template</h5>
        </div>
        <div>
          <a href="" rel="noreferrer" target="_self">
            <Button
              className="submitBtn"
              startIcon={<Download fontSize="large" />}
            >
              Download template
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
