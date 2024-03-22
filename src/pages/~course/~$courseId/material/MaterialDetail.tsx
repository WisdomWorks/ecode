import { useMemo } from 'react'

import { useDeleteMaterial } from '@/apis'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { useToggle } from '@/hooks'
import { getFileExtension, getFileIconByExtension } from '@/utils'
import { MaterialType } from '@/utils/course.utils'

import { MaterialSchema, useCourseContext } from '../../context/course.context'
import { Delete, LinkOutlined, RemoveRedEyeOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

interface Props {
  material: MaterialSchema
}

export const MaterialDetail = ({ material }: Props) => {
  const { refetchTopics } = useCourseContext()
  const { description, materialId, materialName, materialType, storageUrl } =
    material

  const { mutate: deleteMaterial } = useDeleteMaterial()

  const [openModalDelete, toggleModalDelete] = useToggle()

  const Icon = useMemo(
    () =>
      materialType === MaterialType.Url
        ? LinkOutlined
        : getFileIconByExtension(getFileExtension(storageUrl)),
    [materialType, storageUrl],
  )

  const handleDeleteMaterial = () => {
    deleteMaterial(materialId, {
      onSuccess: () => refetchTopics?.(),
    })
    toggleModalDelete()
  }

  return (
    <div className="flex w-full items-center gap-4 ">
      <div className="flex w-2/3 items-center gap-4">
        <Icon className="size-6" />
        <a
          className=" truncate text-blue-500"
          href={storageUrl}
          rel="noreferrer"
          target="_blank"
        >
          {materialName} {description && `(${description})`}
        </a>
      </div>

      <div className="flex">
        <IconButton>
          <RemoveRedEyeOutlined className="text-warning-500" />
        </IconButton>

        <IconButton onClick={toggleModalDelete}>
          <Delete className="text-red-500" />
        </IconButton>
      </div>

      {openModalDelete && (
        <ConfirmModal
          description={`Do you want to delete the ${
            materialType === MaterialType.File ? 'file' : 'url'
          } on this topic?`}
          isOpen={openModalDelete}
          onClose={toggleModalDelete}
          onConfirm={handleDeleteMaterial}
          title="Delete material"
        />
      )}
    </div>
  )
}
