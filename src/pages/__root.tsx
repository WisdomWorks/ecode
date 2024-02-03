import { Link, Outlet, RootRoute } from '@tanstack/react-router'

export const Route = new RootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="flex gap-2 p-2 text-lg">
        <Link
          activeOptions={{ exact: true }}
          activeProps={{
            className: 'font-bold',
          }}
          to="/"
        >
          Home
        </Link>{' '}
        <Link
          activeProps={{
            className: 'font-bold',
          }}
          to="/text-editor"
        >
          Create
        </Link>
        <Link
          activeProps={{
            className: 'font-bold',
          }}
          params={{
            codeId: '1',
          }}
          to="/code-exercise/$codeId"
        >
          Code
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}
