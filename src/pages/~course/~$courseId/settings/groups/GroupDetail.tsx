import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAddStudentsToGroups } from '@/apis'
import { useDeleteStudentInGroup } from '@/apis/useDeleteStudentInGroup'
import { Form, FormSelector } from '@/components/form'
import { TCourse, TUser } from '@/types'
import { cn } from '@/utils'

import { Cancel, Delete, Face } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface Props {
  courseDetail?: TCourse
  groupDetailId: string
  refetchStudentsInGroup: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
  studentsInGroup: TUser[]
}

type TForm = {
  groupId: string
  students: TUser[]
}

export const GroupDetail = ({
  courseDetail,
  groupDetailId,
  refetchStudentsInGroup,
  studentsInGroup,
}: Props) => {
  const { isPending, mutate: addStudents } = useAddStudentsToGroups()
  const { mutate: deleteStudents } = useDeleteStudentInGroup({
    groupId: groupDetailId,
  })

  const [studentIdsDeleted, setStudentIdsDeleted] = useState<string[]>([])

  const form = useForm<TForm>({
    defaultValues: {
      groupId: groupDetailId,
      students: [],
    },
  })

  const filteredStudents = useMemo(() => {
    if (!courseDetail) return []

    return (
      courseDetail.students?.filter(
        student => !studentsInGroup.find(s => s.userId === student.userId),
      ) ?? []
    )
  }, [courseDetail, studentsInGroup])

  const handleSubmitForm: SubmitHandler<TForm> = data => {
    addStudents(
      {
        studentIds: data.students.map(s => s.userId),
        groupId: groupDetailId,
      },
      {
        onSuccess: () => {
          refetchStudentsInGroup()
          form.reset()
        },
      },
    )
  }

  const handleDeleteStudents = () => {
    deleteStudents(studentIdsDeleted, {
      onSuccess: () => {
        refetchStudentsInGroup()
        setStudentIdsDeleted([])
      },
    })
  }

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-6">
        <h3 className="mb-4">Students List</h3>

        <div className="flex flex-col gap-2">
          {studentsInGroup.length ? (
            <>
              <div>
                {studentsInGroup.map(student => {
                  const { name, userId, userName } = student
                  const isDeleted = studentIdsDeleted.includes(userId)

                  return (
                    <div className="flex items-center gap-8" key={userId}>
                      <div className="flex items-center gap-2">
                        <Face />
                        <span
                          className={cn('text-base capitalize', {
                            'line-through': isDeleted,
                          })}
                        >
                          {userName} - {name}
                        </span>
                      </div>

                      {!isDeleted ? (
                        <IconButton
                          onClick={() => {
                            setStudentIdsDeleted(prev => [...prev, userId])
                          }}
                        >
                          <Delete className="text-red-500" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() =>
                            setStudentIdsDeleted(prev =>
                              prev.filter(item => item !== userId),
                            )
                          }
                        >
                          <Cancel className="text-gray-500-500" />
                        </IconButton>
                      )}
                    </div>
                  )
                })}
              </div>
              {!!studentIdsDeleted.length && (
                <div className="flex justify-end">
                  <Button
                    className="bg-red-400 text-white"
                    disabled={isPending}
                    onClick={handleDeleteStudents}
                  >
                    Remove students
                  </Button>
                </div>
              )}
            </>
          ) : (
            <span className="mt-2">No students in this group</span>
          )}
        </div>
      </div>

      <Form className="col-span-6" form={form} onSubmit={handleSubmitForm}>
        <FormSelector
          className="col-span-8 my-2"
          control={form.control}
          filterSelectedOptions
          getOptionLabel={option =>
            typeof option === 'string' ? option : option.name
          }
          isOptionEqualToValue={(option, value) =>
            option.userId === value.userId
          }
          label={''}
          multiple
          name="students"
          options={filteredStudents}
          placeholder="Add students to group"
        />

        <div className="flex justify-end">
          <Button
            className="submitBtn"
            disabled={!form.watch('students').length || isPending}
            type="submit"
          >
            Add students
          </Button>
        </div>
      </Form>
    </div>
  )
}
