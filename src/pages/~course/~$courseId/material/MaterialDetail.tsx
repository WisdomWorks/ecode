import { useMemo } from 'react'

import { useDeleteMaterial } from '@/apis'
import { ButtonTooltip } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { useCheckRole, useToggle } from '@/hooks'
import { MaterialSchema } from '@/types/exercise.types'
import { getFileExtension, getFileIconByExtension } from '@/utils'
import { MaterialType } from '@/utils/course.utils'

import { PermissionModal } from '../../components/PermissionModal'
import { useCourseContext } from '../../context/course.context'
import { Delete, LinkOutlined, RemoveRedEyeOutlined } from '@mui/icons-material'

interface Props {
  material: MaterialSchema
}

export const MaterialDetail = ({ material }: Props) => {
  const { isTeacher } = useCheckRole()
  const { refetchTopics } = useCourseContext()
  const {
    description,
    groups,
    materialId,
    materialName,
    materialType,
    storageUrl,
  } = material

  const { mutate: deleteMaterial } = useDeleteMaterial()

  const [openModalDelete, toggleModalDelete] = useToggle()
  const [onOpenSettingPermissionModal, toggleSettingPermissionModal] =
    useToggle()

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

      {isTeacher && (
        <div className="flex">
          <ButtonTooltip
            iconButtonProps={{
              children: (
                <RemoveRedEyeOutlined className="cursor-pointer text-warning-500" />
              ),
              onClick: toggleSettingPermissionModal,
            }}
            isIconButton
            tooltipProps={{
              title: 'View permission',
            }}
          />
          <ButtonTooltip
            iconButtonProps={{
              children: <Delete className="cursor-pointer text-red-500" />,
              onClick: toggleModalDelete,
            }}
            isIconButton
            tooltipProps={{
              title: 'Delete material',
            }}
          />
        </div>
      )}

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

      {onOpenSettingPermissionModal && (
        <PermissionModal
          currentGroupPermission={groups}
          isOpen={onOpenSettingPermissionModal}
          isShowAll={material.showAll}
          material={material}
          toggleModal={toggleSettingPermissionModal}
          variant="material"
        />
      )}
    </div>
  )
}
