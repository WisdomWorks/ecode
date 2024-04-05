import { Dispatch, SetStateAction, useState } from 'react'

import { useDeleteTopic } from '@/apis'
import { EmptyContent } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { ExerciseType } from '@/constants'
import { useToggle } from '@/hooks'
import { TopicSchema } from '@/types/exercise.types'

import { DetailTopicModal, Topic } from '../components'
import { PermissionModal } from '../components/PermissionModal'
import { useCourseContext } from '../context/course.context'
import { CreateExerciseOptionModal } from './~exercise/CreateExerciseOptionalModal'
import { ExerciseDetail } from './~exercise/ExerciseDetail'
import { CreateMaterialModal } from './material/CreateMaterialModal'
import { MaterialDetail } from './material/MaterialDetail'

interface Props {
  setExerciseType?: Dispatch<SetStateAction<ExerciseType | null>>
  setTopicIdForExercise?: Dispatch<SetStateAction<string>>
  variant: 'exercise' | 'material'
}

export const TopicContainer = ({
  setExerciseType,
  setTopicIdForExercise,
  variant,
}: Props) => {
  const isMaterial = variant === 'material'
  const isExercise = variant === 'exercise'

  const { loading, refetchTopics, topics } = useCourseContext()

  const { mutate: deleteTopic } = useDeleteTopic()

  const [openDeleteTopicModal, toggleDeleteTopicModal] = useToggle()
  const [openUpdateTopicModal, toggleUpdateTopicModal] = useToggle()
  const [openCreateTopicModal, toggleCreateMaterialModal] = useToggle()
  const [onOpenSettingPermissionModal, toggleSettingPermissionModal] =
    useToggle()

  const [openModalCreateExercise, toggleModalCreateExercise] = useToggle()

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
        const { description, exercises, materials, topicId, topicName } = topic

        return (
          <div className="[&:not(:first-child)]:pt-4" key={topicId}>
            <Topic
              description={description}
              isMaterial={isMaterial}
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
                setTopicIdForExercise?.(topicId)
                isMaterial && toggleCreateMaterialModal()
                isExercise && toggleModalCreateExercise()
              }}
              toggleModalSettingPermission={() => {
                toggleSettingPermissionModal()
                setTopicUpdate(topic)
              }}
              topicName={topicName}
            >
              <>
                {isMaterial && (
                  <>
                    {!materials.length ? (
                      <div>No materials in this topic.</div>
                    ) : (
                      <div className="flex w-full flex-col gap-4">
                        {materials.map(material => {
                          const { materialId } = material

                          return (
                            <MaterialDetail
                              key={materialId}
                              material={material}
                            />
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </>

              <>
                {isExercise && (
                  <>
                    {!exercises.length ? (
                      <div>No exercises in this topic.</div>
                    ) : (
                      <div className="flex w-full flex-col gap-2">
                        {exercises.map((exercise, index) => {
                          const { exerciseId } = exercise

                          return (
                            <ExerciseDetail
                              exercise={exercise}
                              index={index}
                              key={exerciseId}
                            />
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </>
            </Topic>
          </div>
        )
      })}

      {openDeleteTopicModal && (
        <ConfirmModal
          isOpen={openDeleteTopicModal}
          onClose={toggleDeleteTopicModal}
          onConfirm={handleDeleteTopic}
          title="Do you want to delete this topic?"
        />
      )}
      {topicUpdate && openUpdateTopicModal && (
        <DetailTopicModal
          isOpen={openUpdateTopicModal}
          isUpdate
          toggleModal={toggleUpdateTopicModal}
          topic={topicUpdate}
        />
      )}

      {openCreateTopicModal && topicId && (
        <CreateMaterialModal
          isOpen={openCreateTopicModal}
          toggleModal={toggleCreateMaterialModal}
          topicId={topicId}
        />
      )}

      {onOpenSettingPermissionModal && topicUpdate && (
        <PermissionModal
          currentGroupPermission={topicUpdate.groups}
          isOpen={onOpenSettingPermissionModal}
          isShowAll={topicUpdate.showAll}
          toggleModal={toggleSettingPermissionModal}
          topic={topicUpdate}
          variant="topic"
        />
      )}

      {openModalCreateExercise && (
        <CreateExerciseOptionModal
          isOpen={openModalCreateExercise}
          setExerciseType={setExerciseType}
          toggleModal={toggleModalCreateExercise}
        />
      )}
    </div>
  )
}
