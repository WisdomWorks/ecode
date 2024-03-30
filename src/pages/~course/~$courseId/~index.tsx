import { useEffect, useState } from 'react'

import { TabsClient, TTabProps } from '@/components/common'
import { Role } from '@/constants'
import { withPermissionOnCourse } from '@/HoCs/WithPermissionOnCourse'
import { useCheckRole, useRoute, useToggle } from '@/hooks'
import { beforeLoadProtected } from '@/utils'

import { DetailTopicModal } from '../components/DetailTopicModal'
import { CourseProvider } from '../context/course.context'
import { Exercise } from './~exercise/Exercise'
import { Material } from './material/Material'
import { Settings } from './settings/Settings'
import { TopicTabs } from './TopicTabs'
import {
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
    label: 'Settings',
    icon: <SettingsOutlined />,
    value: 2,
    component: Settings,
    permission: [Role.TEACHER],
  },
]

export const Course = () => {
  const { courseId } = useParams({ from: '/course/$courseId/' })
  const {
    location: { state },
  } = useRoute()

  const [tab, setTab] = useState(0)

  const [openTopicModal, toggleTopicModal] = useToggle()
  const { isTeacher } = useCheckRole()

  useEffect(() => {
    if ('tab' in state) return setTab(state.tab as number)
    setTab(0)
  }, [courseId, state])

  return (
    <CourseProvider>
      <div className="grid h-full grid-rows-8 gap-4">
        <div className="row-span-1 flex flex-col">
          <div className="h-full rounded-xl py-3 shadow-l">
            <TabsClient setTab={setTab} tab={tab} tabs={tabs} />
          </div>
        </div>

        <div className="row-span-7 overflow-auto rounded-xl p-4 shadow-xl">
          <div className="flex w-full justify-end">
            {isTeacher && tab !== 2 && (
              <Button
                className=""
                onClick={toggleTopicModal}
                size="large"
                variant="contained"
              >
                Create Topic
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
      </div>
    </CourseProvider>
  )
}
export const Route = createFileRoute('/course/$courseId/')({
  component: withPermissionOnCourse(Course),
  beforeLoad: beforeLoadProtected,
})
