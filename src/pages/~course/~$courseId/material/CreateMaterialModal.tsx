import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateMaterial } from '@/apis'
import { Dialog, FileUpload } from '@/components/common'
import {
  Form,
  FormButtonGroup,
  FormInput,
  FormRadioGroup,
} from '@/components/form'
import { useToastMessage } from '@/hooks'
import { Schema } from '@/types'
import { MaterialType } from '@/utils/course.utils'

import { useCourseContext } from '../../context/course.context'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface Props {
  isOpen: boolean
  toggleModal: () => void
  topicId: string
}

const typeEnum = z.enum([MaterialType.File, MaterialType.Url])

export const CreateMaterialModal = ({
  isOpen,
  toggleModal,
  topicId,
}: Props) => {
  const { refetchTopics } = useCourseContext()
  const [files, setFiles] = useState<FileList | null>(null)

  const { setErrorMessage } = useToastMessage()

  const { isPending, mutate } = useCreateMaterial()

  const form = useForm<Schema['CreateMaterialRequest']>({
    defaultValues: {
      materialName: '',
      description: '',
      materialType: MaterialType.Url,
      url: '',
    },
    resolver: zodResolver(
      z.discriminatedUnion('materialType', [
        z.object({
          materialName: z
            .string()
            .min(1, { message: 'Material name is required' }),
          description: z.string().nullable(),
          materialType: typeEnum.extract([MaterialType.File]),
          url: z.string().nullable(),
        }),
        z.object({
          materialName: z
            .string()
            .min(1, { message: 'Material name is required' }),
          description: z.string().nullable(),
          materialType: typeEnum.extract([MaterialType.Url]),
          url: z.string().url(),
        }),
      ]),
    ),
  })

  const handleSubmit: SubmitHandler<Schema['CreateMaterialRequest']> = data => {
    const { description, materialName, materialType, url } = data

    const formData = new FormData()
    formData.append('topicId', topicId)
    formData.append('materialName', materialName)
    formData.append('materialType', materialType)
    if (description) formData.append('description', description)
    if (materialType === MaterialType.Url && url) {
      formData.append('url', url)
    }

    if (materialType === MaterialType.File) {
      if (!files) return setErrorMessage('Please upload a file')
      formData.append('file', files[0])
    }

    mutate(formData, {
      onSuccess: () => {
        refetchTopics?.()
        toggleModal()
      },
    })
  }

  const { control, watch } = form

  const materialType = watch('materialType')

  return (
    <Dialog onClose={toggleModal} open={isOpen}>
      <Form form={form} onSubmit={handleSubmit}>
        <h2>Create Material</h2>
        <div className="mt-7 grid grid-cols-12 gap-4">
          <FormInput
            className="col-span-12"
            control={control}
            label="Material Name"
            name="materialName"
            required
            size="small"
          />

          <FormInput
            className="col-span-12"
            control={control}
            label="Description"
            maxRows={4}
            multiline
            name="description"
            rows={4}
          />

          <FormRadioGroup
            containerClassName="col-span-12"
            label="Material Type"
            name="materialType"
            options={[
              {
                value: MaterialType.Url,
                label: 'Upload load URL',
              },
              {
                value: MaterialType.File,
                label: 'Upload file',
              },
            ]}
          />

          {materialType === MaterialType.Url && (
            <FormInput
              className="col-span-12"
              control={control}
              label="URL"
              name="url"
              required
              size="small"
            />
          )}

          {materialType === MaterialType.File && (
            <div className="col-span-9">
              <FileUpload files={files} name="file" setFiles={setFiles} />
            </div>
          )}

          <FormButtonGroup
            buttons={[
              {
                type: 'button',
                label: 'Cancel',
                onClick: toggleModal,
                className: 'clearBtn',
              },
              {
                type: 'submit',
                label: 'Create',
                className: 'submitBtn',
                disabled: isPending,
              },
            ]}
            className="col-span-12 justify-end"
          />
        </div>
      </Form>
    </Dialog>
  )
}
