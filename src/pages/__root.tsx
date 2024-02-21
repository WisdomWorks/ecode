import { Container } from '@/components/layout'
import { SideBar } from '@/components/layout/SideBar'

import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <SideBar />
      <div className="ml-[18rem] h-screen">
        <div className="flex h-16 w-full items-center justify-center shadow-l">
          <span className="text-2xl font-bold text-neutral-900">Code-E</span>
        </div>
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  )
}
