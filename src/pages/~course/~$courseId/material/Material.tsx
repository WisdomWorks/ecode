import { useState } from 'react'

import { useDeleteTopic } from '@/apis'
import { EmptyContent } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { useToggle } from '@/hooks'

import { DetailTopicModal, Topic } from '../../components'
import { TopicSchema, useCourseContext } from '../../context/course.context'
import { CreateMaterialModal } from './CreateMaterialModal'
import { MaterialDetail } from './MaterialDetail'

export const Material = () => {
  const { loading, refetchTopics, topics } = useCourseContext()

  const { mutate: deleteTopic } = useDeleteTopic()

  const [openDeleteTopicModal, toggleDeleteTopicModal] = useToggle()
  const [openUpdateTopicModal, toggleUpdateTopicModal] = useToggle()
  const [onCreateMaterialModal, toggleCreateMaterialModal] = useToggle()

  const [topicId, setTopicId] = useState('')
  const [topicUpdate, setTopicUpdate] = useState<TopicSchema | null>(null)

  if (!topics.length && !loading) return <EmptyContent />

  const handleDeleteTopic = () => {
    deleteTopic(topicId, {
      onSuccess: () => refetchTopics?.(),
    })
    toggleDeleteTopicModal()
  }

  return (
    <div className="flex flex-col gap-8 divide-y-2">
      {topics.map(topic => {
        const { description, materials, topicId, topicName } = topic

        return (
          <div className="[&:not(:first-child)]:pt-4" key={topicId}>
            <Topic
              description={description}
              isMaterial
              onDeleteTopic={() => {
                setTopicId(topicId)
                toggleDeleteTopicModal()
              }}
              onUpdateTopic={() => {
                setTopicUpdate(topic)
                toggleUpdateTopicModal()
              }}
              toggleModalCreate={() => {
                setTopicId(topicId)
                toggleCreateMaterialModal()
              }}
              topicName={topicName}
            >
              <>
                {!materials.length ? (
                  <div>No materials in this topic.</div>
                ) : (
                  <div className="flex w-full flex-col gap-2">
                    {materials.map(material => {
                      const { materialId } = material

                      return (
                        <MaterialDetail key={materialId} material={material} />
                      )
                    })}
                  </div>
                )}
              </>
            </Topic>
          </div>
        )
      })}

      <ConfirmModal
        isOpen={openDeleteTopicModal}
        onClose={toggleDeleteTopicModal}
        onConfirm={handleDeleteTopic}
        title="Do you want to delete this topic?"
      />
      {topicUpdate && openUpdateTopicModal && (
        <DetailTopicModal
          isOpen={openUpdateTopicModal}
          isUpdate
          toggleModal={toggleUpdateTopicModal}
          topic={topicUpdate}
        />
      )}

      {onCreateMaterialModal && topicId && (
        <CreateMaterialModal
          isOpen={onCreateMaterialModal}
          toggleModal={toggleCreateMaterialModal}
          topicId={topicId}
        />
      )}
    </div>
  )
}
