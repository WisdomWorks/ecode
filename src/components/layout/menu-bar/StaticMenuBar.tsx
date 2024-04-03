import { activeClassName, TMenu } from './MenuBar'
import { HomeOutlined } from '@mui/icons-material'
import { Link } from '@tanstack/react-router'

const staticMenus: TMenu[] = [
  {
    label: 'Home',
    to: '/',
  },
]

export const StaticMenuBar = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg font-bold tracking-wide text-neutral-550">
        Menu
      </span>

      <div className="flex max-h-[30rem] flex-col gap-3 overflow-auto">
        {staticMenus.map((item, index) => (
          <Link
            activeProps={{
              className: activeClassName,
            }}
            className="group flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-primary-600"
            key={index}
            params={{ courseId: item }}
            to={item.to as string}
          >
            <HomeOutlined className="size-6 group-hover:text-white" />
            <span className="text-base text-neutral-600 group-hover:text-white">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
