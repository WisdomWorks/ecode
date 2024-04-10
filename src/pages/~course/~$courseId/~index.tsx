import { useEffect, useState } from 'react'

import { useUnenrollCourse } from '@/apis/useUnenrollCourse'
import { TabsClient, TTabProps } from '@/components/common'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Role } from '@/constants'
import { useAppStore } from '@/context/useAppStore'
import { withPermissionOnCourse } from '@/HoCs/WithPermissionOnCourse'
import { useCheckRole, useRoute, useToastMessage, useToggle } from '@/hooks'
import { beforeLoadProtected } from '@/utils'

import { DetailTopicModal } from '../components/DetailTopicModal'
import { CourseProvider } from '../context/course.context'
import { Exercise } from './~exercise/Exercise'
import { GradeTab } from './grade/GradeTab'
import { Material } from './material/Material'
import { Settings } from './settings/Settings'
import { SubmissionTab } from './submission/SubmissionTab'
import { TopicTabs } from './TopicTabs'
import {
  AddOutlined,
  CloseOutlined,
  GradingOutlined,
  MenuBookOutlined,
  QuizOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import { createFileRoute, useParams } from '@tanstack/react-router'

const tabs: TTabProps[] = [
  {
    label: 'Material',
    icon: <MenuBookOutlined />,
    value: 0,
    component: Material,
  },
  {
    label: 'Exercise',
    icon: <QuizOutlined />,
    value: 1,
    component: Exercise,
  },
  {
    label: 'Submission',
    icon: <GradingOutlined />,
    value: 2,
    component: SubmissionTab,
    permission: [Role.TEACHER],
  },
  {
    label: 'Settings',
    icon: <SettingsOutlined />,
    value: 3,
    component: Settings,
    permission: [Role.TEACHER],
  },
  {
    label: 'Grades',
    icon: <GradingOutlined />,
    value: 4,
    component: GradeTab,
    permission: [Role.STUDENT],
  },
]

export const Course = () => {
  const { courseId } = useParams({ from: '/course/$courseId/' })
  const user = useAppStore(state => state.user)
  const { setErrorMessage, setSuccessMessage } = useToastMessage()
  const {
    location: { state },
  } = useRoute()

  const { mutate } = useUnenrollCourse()

  const [tab, setTab] = useState(0)

  const [openTopicModal, toggleTopicModal] = useToggle()
  const [openUnenrollModal, toggleUnenrollModal] = useToggle()

  const { isStudent, isTeacher } = useCheckRole()

  useEffect(() => {
    if ('tab' in state) return setTab(state.tab as number)
    setTab(0)
  }, [courseId, state])

  const unenrollCourse = () => {
    mutate(
      {
        courseId,
        userId: user?.userId || '',
      },
      {
        onError: error =>
          setErrorMessage(
            error.response?.data.message || 'Unenroll course failed',
          ),
        onSuccess: () => {
          setSuccessMessage('Unenroll course successfully')
          window.location.replace('/')
        },
      },
    )
  }

  return (
    <CourseProvider>
      <div className="grid h-full grid-rows-8 gap-4">
        <div className="row-span-1 flex flex-col">
          <div className="h-full rounded-xl px-5 py-3 shadow-l">
            <TabsClient setTab={setTab} tab={tab} tabs={tabs} />
          </div>
        </div>

        <div className="row-span-7 overflow-auto rounded-xl p-4 shadow-xl">
          <div className="flex w-full justify-end">
            {isTeacher && [0, 1].includes(tab) && (
              <Button onClick={toggleTopicModal} size="large" variant="text">
                <AddOutlined className="mr-3" />
                Create Topic
              </Button>
            )}

            {isStudent && tab !== 4 && (
              <Button
                className="text-danger-500"
                onClick={toggleUnenrollModal}
                size="large"
                variant="text"
              >
                <CloseOutlined className="mr-3" />
                Unenroll course
              </Button>
            )}
          </div>
          <TopicTabs tab={tab} tabs={tabs} />
        </div>

        {openTopicModal && isTeacher && (
          <DetailTopicModal
            isOpen={openTopicModal}
            toggleModal={toggleTopicModal}
          />
        )}

        {openUnenrollModal && (
          <ConfirmModal
            isOpen={openUnenrollModal}
            onClose={toggleUnenrollModal}
            onConfirm={unenrollCourse}
            title="Do you want to unenroll this course?"
            variant="confirm"
          />
        )}
      </div>
    </CourseProvider>
  )
}
export const Route = createFileRoute('/course/$courseId/')({
  component: withPermissionOnCourse(Course),
  beforeLoad: beforeLoadProtected,
})
