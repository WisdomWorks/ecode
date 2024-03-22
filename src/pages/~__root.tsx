import { Navbar } from '@/components/layout'
import { MenuBar } from '@/components/layout/menu-bar/MenuBar'
import { useAppStore } from '@/context/useAppStore'
import { useRoute } from '@/hooks'

import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

const fullScreenPath = ['/login', '/forget-password', '/sandpack']

function RootComponent() {
  const { location, navigate } = useRoute()
  const user = useAppStore(state => state.user)

  if (!user) {
    navigate({ to: '/login', replace: true })
  }

  if (fullScreenPath.includes(location.pathname)) {
    return (
      <div className="h-screen">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      {/* <Navbar /> */}

      <div className="col-span-12 bg-neutral-800">
        <Navbar />
      </div>

      <div className="col-span-12 row-span-11 grid grid-cols-5 grid-rows-12 gap-4 px-16 py-8">
        <div className="col-span-1 row-span-10 overflow-hidden rounded-xl shadow-xl">
          <MenuBar />
        </div>

        <div className="col-span-4 row-span-12">
          {location.pathname.includes('/course') ? (
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
