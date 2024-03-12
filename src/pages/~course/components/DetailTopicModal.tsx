import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateTopic } from '@/apis'
import { Dialog } from '@/components/common'
import { Form, FormButtonGroup } from '@/components/form'
import { FormInput } from '@/components/form/FormInput'
import { Schema } from '@/types'

import { useParams } from '@tanstack/react-router'
interface Props {
  isOpen: boolean
  toggleModal: () => void
}

export const DetailTopicModal = ({ isOpen, toggleModal }: Props) => {
  const { isPending, mutate } = useCreateTopic()
  const { courseId } = useParams({ from: '/course/$courseId/' })
  console.log(courseId)

  const form = useForm<Schema['CreateTopicRequest']>({
    defaultValues: {
      topicName: '',
      description: '',
    },
  })

  const handleSubmit: SubmitHandler<Schema['CreateTopicRequest']> = data => {
    mutate({
      ...data,
      courseId: 'f4e89aa6-5c60-4981-9eef-8867312ed871',
    })
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
              label: 'Create',
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
