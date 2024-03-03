import { Navbar } from '@/components/layout'
import { MenuBar } from '@/components/layout/MenuBar'

import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="grid h-screen grid-cols-12 grid-rows-12">
      {/* <Navbar /> */}

      <div className="col-span-12 bg-neutral-800">
        <Navbar />
      </div>

      <div className="col-span-12 row-span-11 grid grid-cols-12 grid-rows-12 gap-8 px-16 py-8">
        <div className="col-span-2 row-span-9 rounded-xl shadow-xl">
          <MenuBar />
        </div>

        <div className="col-span-10 row-span-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
