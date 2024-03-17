import { useState } from 'react'

import { useGetGroupsInCourse, useGetStudentInGroup } from '@/apis'
import { TCourse } from '@/types'

import { GroupDetail } from './GroupDetail'
import { Groups } from './Groups'
import { ArrowDownward } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  courseDetail?: TCourse
  refetchCourse: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

export const GroupSetting = ({ courseDetail }: Props) => {
  const [groupDetailId, setGroupDetailId] = useState('')

  const { data: groupsData, refetch } = useGetGroupsInCourse({
    courseId: String(courseDetail?.courseId),
  })
  const { data: studentsGroupData, refetch: refetchStudentsInGroup } =
    useGetStudentInGroup({
      groupId: groupDetailId,
    })

  const groups = groupsData?.data

  if (!courseDetail || !groups) return null

  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1-content"
        expandIcon={<ArrowDownward />}
        id="panel1-header"
      >
        <Typography variant="h3">Group Management</Typography>
      </AccordionSummary>

      <AccordionDetails className="grid grid-cols-12 gap-2 divide-x-2">
        <div className="col-span-3 flex flex-col gap-2">
          <Groups
            courseDetail={courseDetail}
            groupDetailId={groupDetailId}
            groups={groups}
            refetchGroups={refetch}
            setGroupDetailId={setGroupDetailId}
          />
        </div>
        {studentsGroupData?.data && (
          <div className="col-span-9 pl-8">
            <GroupDetail
              courseDetail={courseDetail}
              groupDetailId={groupDetailId}
              refetchStudentsInGroup={refetchStudentsInGroup}
              studentsInGroup={studentsGroupData.data}
            />
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
