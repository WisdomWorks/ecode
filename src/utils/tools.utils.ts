import { ExcelIcon, PdfIcon, WordIcon } from '@/components/common/icons'

import {
  AudiotrackOutlined,
  ImageOutlined,
  InsertDriveFileRounded,
} from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

export const uuid = uuidv4

export enum AcceptTypeFile {
  Audio = 'audio/*',
  Excel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Image = 'image/*',
  Pdf = 'application/pdf',
  Video = 'video/*',
  Word = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export const getFileIcon = (type: AcceptTypeFile) => {
  switch (type) {
    case AcceptTypeFile.Audio:
      return AudiotrackOutlined
    case AcceptTypeFile.Excel:
      return ExcelIcon
    case AcceptTypeFile.Pdf:
      return PdfIcon
    case AcceptTypeFile.Word:
      return WordIcon
    case AcceptTypeFile.Image:
      return ImageOutlined
    default:
      return InsertDriveFileRounded
  }
}

export enum FileExtension {
  ExcelXLS = '.xls',
  ExcelXLSX = '.xlsx',
  ImageGIF = '.gif',
  ImageJPEG = '.jpeg',
  ImageJPG = '.jpg',
  ImagePNG = '.png',
  ImageSVG = '.svg',
  ImageWEBP = '.webp',
  Pdf = '.pdf',
  Rar = '.rar',
  WordDOC = '.doc',
  WordDOCX = '.docx',
  Zip = '.zip',
}

export const getFileExtension = (fileName?: string) => {
  if (!fileName) return ''
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
}

export const getFileIconByExtension = (extension: FileExtension | string) => {
  switch (extension) {
    case FileExtension.ExcelXLS:
    case FileExtension.ExcelXLSX:
      return ExcelIcon
    case FileExtension.ImageGIF:
    case FileExtension.ImageJPEG:
    case FileExtension.ImageJPG:
    case FileExtension.ImagePNG:
    case FileExtension.ImageSVG:
    case FileExtension.ImageWEBP:
      return ImageOutlined
    case FileExtension.Pdf:
      return PdfIcon
    case FileExtension.WordDOC:
    case FileExtension.WordDOCX:
      return WordIcon
    default:
      return InsertDriveFileRounded
  }
}
