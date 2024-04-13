import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateTopic, useUpdateTopic } from '@/apis'
import { Dialog } from '@/components/common'
import { Form, FormButtonGroup } from '@/components/form'
import { FormInput } from '@/components/form/FormInput'
import { useToastMessage } from '@/hooks'
import { Schema } from '@/types'
import { TopicSchema } from '@/types/exercise.types'

import { useCourseContext } from '../context/course.context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from '@tanstack/react-router'
import { z } from 'zod'
interface Props {
  isOpen: boolean
  isUpdate?: boolean
  toggleModal: () => void
  topic?: TopicSchema | null
}

export const DetailTopicModal = ({
  isOpen,
  isUpdate = false,
  toggleModal,
  topic,
}: Props) => {
  const { courseId } = useParams({ from: '/course/$courseId/' })

  const { refetchTopics } = useCourseContext()
  const { setSuccessMessage } = useToastMessage()

  const { isPending, mutate } = useCreateTopic()
  const { mutate: updateTopic } = useUpdateTopic()

  const defaultValue = useMemo(
    () => ({
      topicName: topic?.topicName || '',
      description: topic?.description || '',
    }),
    [topic],
  )

  const form = useForm<Schema['CreateTopicRequest']>({
    defaultValues: defaultValue,
    resolver: zodResolver(
      z.object({
        topicName: z.string().min(1, { message: 'Topic name is required' }),
        description: z.string().nullable(),
      }),
    ),
  })

  const handleSubmit: SubmitHandler<Schema['CreateTopicRequest']> = data => {
    if (isUpdate) {
      updateTopic(
        {
          ...data,
          topicId: topic?.topicId || '',
        },
        {
          onSuccess: () => {
            setSuccessMessage('Topic updated successfully')
            toggleModal()
            refetchTopics?.()
          },
        },
      )
      return
    }
    mutate(
      {
        ...data,
        courseId,
      },
      {
        onSuccess: () => {
          setSuccessMessage('Topic created successfully')
          toggleModal()
          refetchTopics?.()
        },
      },
    )
  }

  return (
    <Dialog onClose={toggleModal} open={isOpen}>
      <Form className="flex flex-col gap-2" form={form} onSubmit={handleSubmit}>
        <FormInput label="Topic name" name="topicName" />
        <FormInput label="Description" multiline name="description" rows={4} />
        <FormButtonGroup
          buttons={[
            {
              type: 'submit',
              label: 'Cancel',
              onClick: toggleModal,
              className: 'clearBtn',
            },
            {
              type: 'submit',
              label: isUpdate ? 'Update' : 'Create',
              className: 'submitBtn',
              disabled: isPending,
            },
          ]}
          className="justify-end"
        />
      </Form>
    </Dialog>
  )
}
