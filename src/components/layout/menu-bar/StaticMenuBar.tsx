import { activeClassName, TMenu } from './MenuBar'
import { AccountBoxOutlined, HomeOutlined, Html } from '@mui/icons-material'
import { Chip } from '@mui/material'
import { Link } from '@tanstack/react-router'

const staticMenus: TMenu[] = [
  {
    label: 'Home',
    to: '/',
    Icon: HomeOutlined,
  },
  {
    label: 'Profile',
    to: '/profile/',
    Icon: AccountBoxOutlined,
  },
  {
    label: 'Web Application',
    to: '/web-app/',
    Icon: Html,
  },
]

export const StaticMenuBar = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg font-bold tracking-wide text-neutral-550">
        Menu
      </span>

      <div className="flex max-h-[30rem] flex-col gap-3 overflow-auto">
        {staticMenus.map((item, index) => {
          const { Icon, to } = item

          if (to === '/web-app/') {
            return (
              <a
                className="group flex items-center justify-between rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-primary-600"
                href="/web-app/"
                key={index}
              >
                <div className="flex gap-2">
                  {Icon && <Icon className="size-6 group-hover:text-white" />}
                  <span className="text-base text-neutral-600 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <Chip
                  className="group-hover:text-white"
                  color="primary"
                  label="Beta"
                  size="small"
                  variant="outlined"
                />
              </a>
            )
          }

          return (
            <Link
              activeProps={{
                className: activeClassName,
              }}
              className="group flex items-center gap-2 rounded-md p-2 transition-colors duration-300 ease-in-out hover:bg-primary-600"
              key={index}
              params={{ courseId: item }}
              to={to as string}
            >
              {Icon && <Icon className="size-6 group-hover:text-white" />}
              <span className="text-base text-neutral-600 group-hover:text-white">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
