import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { SearchInput } from '@/components/common'
import { useAppStore } from '@/context/useAppStore'
import { getCourseLabel } from '@/utils/label.utils'

import { activeClassName, TMenu } from './MenuBar'
import { AutoStoriesOutlined } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { debounce } from 'lodash'

export const CourseMenuBar = () => {
  const [search, setSearch] = useState('')
  const courses = useAppStore(state => state.courses)
  const [menus, setMenus] = useState<TMenu[] | []>(() => {
    return (
      courses?.map(course => ({
        ID: course.courseId,
        label: getCourseLabel(course),
      })) || []
    )
  })

  const filterCourse = useCallback((value: string) => {
    if (!courses) return
    setMenus(
      courses
        .filter(course =>
          getCourseLabel(course).toLowerCase().includes(value.toLowerCase()),
        )
        .map(course => ({
          ID: course.courseId,
          label: getCourseLabel(course),
        })),
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

  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg font-bold tracking-wide text-neutral-550">
        Courses
      </span>
      <div>
        <SearchInput label="" onChange={onChangeSearch} value={search} />
      </div>

      <div className="flex max-h-[30rem] flex-col gap-3 overflow-auto">
        {menus.length ? (
          menus.map((item, index) => (
            <Tooltip arrow key={index} placement="right" title={item.label}>
              <Link
                activeProps={{
                  className: activeClassName,
                }}
                className="group flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-primary-600"
                params={{ courseId: String(item.ID) }}
                to="/course/$courseId"
              >
                <AutoStoriesOutlined className="size-6 group-hover:text-white" />
                <span className="truncate whitespace-nowrap text-base text-neutral-600 group-hover:text-white">
                  {item.label}
                </span>
              </Link>
            </Tooltip>
          ))
        ) : (
          <span className="text-neutral-600">No course found</span>
        )}
      </div>
    </div>
  )
}
