import { Navbar } from '@/components/layout'
import { MenuBar } from '@/components/layout/menu-bar/MenuBar'
import { useRoute } from '@/hooks'
import { TUser } from '@/types'

import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient
  user?: TUser
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

const fullScreenPath = [
  '/login',
  '/forget-password',
  '/sandpack',
  '/enroll-exercise',
]

function RootComponent() {
  const { location } = useRoute()

  if (fullScreenPath.some(path => location.pathname.includes(path))) {
    return (
      <div className="h-screen">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      <div className="col-span-12 bg-neutral-800">
        <Navbar />
      </div>

      <div className="col-span-12 row-span-11 grid grid-cols-5 grid-rows-12 gap-4 px-16 py-8">
        <div className="col-span-1 row-span-10 overflow-hidden rounded-xl shadow-xl">
          <MenuBar />
        </div>

        <div className="col-span-4 row-span-12">
          {location.pathname.match(/^\/course\/[^-]+-[^/]+$/) ? (
            <Outlet />
          ) : (
            <div className="h-full overflow-auto rounded-xl p-16 shadow-xl">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
