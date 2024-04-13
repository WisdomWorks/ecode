import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { useGetCourses } from '@/apis'
import { Loading, SearchInput } from '@/components/common'
import { TCourse } from '@/types'
import { beforeLoadProtected } from '@/utils'
import { getCourseLabel } from '@/utils/label.utils'

import { SchoolOutlined } from '@mui/icons-material'
import { createFileRoute, Link } from '@tanstack/react-router'
import { debounce } from 'lodash'

export const Home = () => {
  const { data, isLoading } = useGetCourses()
  const [course, setCourse] = useState<TCourse[] | []>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setCourse(data ?? [])
  }, [data])

  const filterCourse = useCallback((value: string) => {
    if (!data) return
    setCourse(
      data.filter(course =>
        getCourseLabel(course).toLowerCase().includes(value.toLowerCase()),
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterCourseDebounce = useMemo(
    () => debounce(filterCourse, 300),
    [filterCourse],
  )

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    filterCourseDebounce(e.target.value)
  }

  if (isLoading) return <Loading />

  return (
    <>
      <SearchInput
        className="w-full"
        label=""
        onChange={onChangeSearch}
        value={search}
      />
      <div className="mt-8 flex flex-col gap-4">
        {course.length ? (
          course.map((course, index) => (
            <Link
              className={`group cursor-pointer rounded-lg p-2 transition-all hover:bg-primary-350 lg:w-full ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } p-3`}
              key={index}
              params={{
                courseId: String(course.courseId),
              }}
              to="/course/$courseId"
            >
              <div className="flex h-14 items-center gap-4">
                <SchoolOutlined className="mr-3 text-4xl text-primary-700" />

                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-neutral-800 group-hover:text-white">
                    {getCourseLabel(course)}
                  </span>
                  <span className="font-light italic">
                    {course.description}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <span className="text-lg font-bold text-neutral-800">
            No course found
          </span>
        )}
      </div>
    </>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: beforeLoadProtected,
})
