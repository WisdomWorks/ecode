// import Logo from '@/assets/logo.png'

import { cn } from '@/utils'

import { SearchInput } from '../common'
import { FolderOutlined } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'

const menuItems = ['Home']

const courses = [
  'Course 1',
  'Course 2',
  'Course 3',
  'Course 4',
  'Course 5',
  'Course 6',
  'Course 7',
  'Course 8',
  'Course 9',
  'Course 10',
  'Course 11',
]

interface MenuListProps {
  className?: string
  isCourse?: boolean
  items: string[]
  label?: string
}

const activeClassName = '[&_>span]:text-white bg-primary-500 text-white'

const MenuList = ({ className, isCourse, items, label }: MenuListProps) => {
  return (
    <div className={cn('flex flex-col gap-4 ', className)}>
      <span className="text-lg font-bold tracking-wide text-neutral-550">
        {label}
      </span>
      {isCourse && (
        <div>
          <SearchInput
            inputProps={{
              className: 'p-0',
            }}
            label="Search course"
          />
        </div>
      )}

      <div className="flex max-h-[30rem] flex-col gap-3 overflow-auto">
        {items.map((item, index) => (
          <Link
            activeProps={{
              className: activeClassName,
            }}
            className={cn(
              'group flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-primary-600',
            )}
            key={index}
            params={{ courseId: item }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            to={isCourse ? '/course/$courseId' : `/`}
          >
            <FolderOutlined className="size-7 group-hover:text-white" />
            <span className="text-base text-neutral-600 group-hover:text-white">
              {item}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const MenuBar = () => {
  return (
    <>
      <div className="flex flex-col gap-8  overflow-y-auto px-6 py-8">
        <MenuList items={menuItems} label="Menu" />
        <MenuList className="" isCourse items={courses} label="Courses" />
      </div>
    </>
  )
}
