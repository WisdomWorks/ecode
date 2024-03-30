import { useEffect, useState } from 'react'

import {
  useGetCourseDetail,
  useGetTopicsByUserId,
  useGetTopicsForTeacher,
} from '@/apis'
import { Loading, TabPanel, TabsClient, TTabProps } from '@/components/common'
import { Role } from '@/constants'
import { withPermissionOnCourse } from '@/HoCs/WithPermissionOnCourse'
import { useCheckRole, useRoute, useToggle } from '@/hooks'
import { TCourse } from '@/types'
import { TTopic } from '@/types/exercise.types'
import { beforeLoadProtected } from '@/utils'

import { DetailTopicModal } from '../components/DetailTopicModal'
import { CourseContext } from '../context/course.context'
import { Exercise } from './~exercise/Exercise'
import { Material } from './material/Material'
import { Settings } from './settings/Settings'
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

  const [topics, setTopics] = useState<TTopic[]>([])
  const [course, setCourse] = useState<TCourse | null>(null)
  const [tab, setTab] = useState(0)

  const { isStudent, isTeacher, user } = useCheckRole()
  const [openTopicModal, toggleTopicModal] = useToggle()
  const {
    data: topicOfStudent,
    isLoading: getTopicsOfStudentLoading,
    isRefetching: isRefetchingTopicsOfStudent,
    refetch: refetchTopicsOfStudent,
  } = useGetTopicsByUserId({
    isStudent,
    courseId,
    userId: user?.userId || '',
  })

  const {
    data: topicsOfTeacher,
    isLoading: getTopicOfTeacherLoading,
    isRefetching: isRefetchingTopicsOfTeacher,
    refetch: refetchTopicsOfTeacher,
  } = useGetTopicsForTeacher({
    courseId,
    isTeacher,
  })

  const { data: courseData, isLoading: isLoadingCourse } = useGetCourseDetail({
    courseId,
  })

  useEffect(() => {
    if (isStudent) {
      setTopics(topicOfStudent || [])
    }
    if (isTeacher) {
      setTopics(topicsOfTeacher || [])
    }

    if (course) {
      setCourse(courseData?.data || null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicOfStudent, topicsOfTeacher, course])

  useEffect(() => {
    if ('tab' in state) return setTab(state.tab as number)
    setTab(0)
  }, [courseId, state])

  const loading =
    getTopicsOfStudentLoading ||
    getTopicOfTeacherLoading ||
    isRefetchingTopicsOfStudent ||
    isRefetchingTopicsOfTeacher ||
    isLoadingCourse

  return (
    <CourseContext.Provider
      value={{
        topics,
        setTopics,
        refetchTopics: isTeacher
          ? refetchTopicsOfTeacher
          : refetchTopicsOfStudent,
        loading,
        courseId,
        setCourse,
        course,
      }}
    >
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
          {loading ? (
            <Loading />
          ) : (
            <>
              {tabs.map(({ component: Component, value }) => (
                <TabPanel index={value} key={value} value={tab}>
                  {Component ? <Component /> : null}
                </TabPanel>
              ))}
            </>
          )}
        </div>

        {openTopicModal && isTeacher && (
          <DetailTopicModal
            isOpen={openTopicModal}
            toggleModal={toggleTopicModal}
          />
        )}
      </div>
    </CourseContext.Provider>
  )
}
export const Route = createFileRoute('/course/$courseId/')({
  component: withPermissionOnCourse(Course),
  beforeLoad: beforeLoadProtected,
})
