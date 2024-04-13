import { useGetCourseDetail } from '@/apis'
import { withTeacherRole } from '@/HoCs/WithTeacherRole'

import { GroupSetting } from './groups/GroupSetting'
import { InformationSetting } from './InformationSetting'
import { StudentsSetting } from './StudentsSetting'
import { CircularProgress } from '@mui/material'
import { useParams } from '@tanstack/react-router'

export const Settings = withTeacherRole(() => {
  const { courseId } = useParams({ from: '/course/$courseId/' })
  const {
    data,
    isFetching,
    isLoading,
    refetch: refetchCourse,
  } = useGetCourseDetail({ courseId })

  const courseDetail = data?.data

  if (isLoading || isFetching) {
    return (
      <div className="flex h-[30rem] items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <InformationSetting
        courseDetail={courseDetail}
        refetchCourse={refetchCourse}
      />

      <StudentsSetting
        courseDetail={courseDetail}
        refetchCourse={refetchCourse}
      />

      <GroupSetting courseDetail={courseDetail} refetchCourse={refetchCourse} />
    </div>
  )
})
