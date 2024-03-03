// import Logo from '@/assets/logo.png'

import { cn } from '@/utils'

import { FolderOutlined } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'

const menuItems = ['Home']

const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5']

interface MenuListProps {
  isCourse?: boolean
  items: string[]
  label?: string
}

const activeClassName = '[&_>span]:text-white bg-primary-500 text-white'

const MenuList = ({ isCourse, items, label }: MenuListProps) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg font-bold tracking-wide text-neutral-550">
        {label}
      </span>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <Link
            activeProps={{
              className: activeClassName,
            }}
            className={cn(
              'flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-primary-600 hover:text-white hover:[&_>span]:text-white',
            )}
            key={index}
            params={{ courseId: item }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            to={isCourse ? '/course/$courseId' : `/`}
          >
            <FolderOutlined className="size-7" />
            <span className="text-base text-neutral-600">{item}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const MenuBar = () => {
  return (
    <>
      <div className="flex flex-col gap-8 overflow-y-auto px-6 py-8">
        <MenuList items={menuItems} label="Menu" />
        <MenuList isCourse items={courses} label="Courses" />
      </div>
    </>
  )
}
