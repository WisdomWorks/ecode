import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  DragEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ExcelIcon, PdfIcon, WordIcon } from './icons'
import {
  AudiotrackOutlined,
  CloudUploadOutlined,
  InsertDriveFileRounded,
} from '@mui/icons-material'
import { Button } from '@mui/material'

enum AcceptTypeFile {
  Audio = 'audio/*',
  Excel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Image = 'image/*',
  Pdf = 'application/pdf',
  Video = 'video/*',
  Word = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const getFileIcon = (type: AcceptTypeFile) => {
  switch (type) {
    case AcceptTypeFile.Audio:
      return AudiotrackOutlined
    case AcceptTypeFile.Excel:
      return ExcelIcon
    case AcceptTypeFile.Pdf:
      return PdfIcon
    case AcceptTypeFile.Word:
      return WordIcon
    default:
      return InsertDriveFileRounded
  }
}

type TAcceptTypeFileKeys = keyof typeof AcceptTypeFile

type Props = ComponentPropsWithoutRef<'input'> & {
  typeFiles?: TAcceptTypeFileKeys[]
}

export const FileUpload = ({ multiple, typeFiles }: Props) => {
  const [isDragActive, setIsDragActive] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { acceptTypeKey, acceptTypeValue } = useMemo(() => {
    const acceptTypeValue = typeFiles
      ?.map(type => AcceptTypeFile[type])
      .join(',')
    const acceptTypeKey = typeFiles?.join(', ')

    return { acceptTypeKey, acceptTypeValue }
  }, [typeFiles])

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleDragEnter: DragEventHandler<
    HTMLDivElement | HTMLFormElement
  > = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      return setIsDragActive(true)
    }
    setIsDragActive(false)
  }

  const handleDrop: DragEventHandler<HTMLDivElement | HTMLFormElement> = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const files = e.target.files
    if (files) {
      handleFileUpload(files)
    }
  }

  const handleFileUpload = (files: FileList) => {
    setFiles(files)
  }

  return (
    <div>
      <form
        className="relative flex flex-col items-center justify-center rounded-l border-2 border-dashed border-neutral-400 bg-neutral-100 py-8"
        id="form-file-upload"
        onDragEnter={handleDragEnter}
        onSubmit={e => e.preventDefault()}
      >
        <input
          accept={acceptTypeValue}
          className="hidden"
          id="input-file-upload"
          multiple={multiple}
          onChange={handleChange}
          ref={inputRef}
          type="file"
        />
        <label htmlFor="input-file-upload" id="label-file-upload">
          <div className="flex flex-col items-center gap-1">
            <CloudUploadOutlined className="size-20 text-neutral-500" />
            <p className="text-2xl font-normal text-neutral-900">
              Drag or click to upload a file
            </p>
            {acceptTypeKey && (
              <span className="text-lg font-light text-neutral-500">
                Supported format: {acceptTypeKey}
              </span>
            )}
            <span className="text-sm font-bold text-neutral-500">OR</span>
            <Button className="capitalize" onClick={handleClick}>
              Browser file
            </Button>
          </div>
          {isDragActive && (
            <div
              className="absolute inset-0 z-10 rounded-l bg-neutral-100 opacity-50"
              id="drag-file-element"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragEnter}
              onDragOver={handleDragEnter}
              onDrop={handleDrop}
            />
          )}
        </label>
      </form>

      {files && (
        <div className="mt-2 flex max-h-36 flex-col overflow-x-hidden">
          <span className="text-base font-medium italic">Preview files:</span>
          {Array.from(files).map(file => {
            const { name, type } = file
            const Icon = getFileIcon(type as AcceptTypeFile)
            return (
              <div className="flex items-center gap-1" key={name}>
                <div>
                  <Icon className="size-6" />
                </div>
                <span className="truncate text-sm">{name}</span>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-2 flex justify-end gap-1">
        <Button className="text-neutral-500" onClick={() => setFiles(null)}>
          Cancel
        </Button>
        <Button
          className="submitBtn"
          disabled={!files}
          onClick={() => setFiles(null)}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}
